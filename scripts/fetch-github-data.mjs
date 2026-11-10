import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const outputPath = path.join(rootDir, 'src', 'data', 'github-data.json');
const targetUsername = 'aitorgallegocr21';

const GRAPHQL_QUERY = `
query ($username: String!) {
  user(login: $username) {
    name
    login
    avatarUrl
    bio
    url
    followers {
      totalCount
    }
    repositories(
      first: 100
      ownerAffiliations: OWNER
      privacy: PUBLIC
      isFork: false
      orderBy: { field: STARGAZERS, direction: DESC }
    ) {
      totalCount
      nodes {
        name
        description
        url
        stargazerCount
        forkCount
        primaryLanguage {
          name
          color
        }
        languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
          edges {
            size
            node {
              name
              color
            }
          }
        }
      }
    }
    contributionsCollection {
      totalCommitContributions
      totalIssueContributions
      totalPullRequestContributions
      totalPullRequestReviewContributions
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
            contributionLevel
            color
            weekday
          }
        }
      }
    }
  }
}
`;

function mapContributionLevel(level) {
  switch (level) {
    case 'FOURTH_QUARTILE':
      return 4;
    case 'THIRD_QUARTILE':
      return 3;
    case 'SECOND_QUARTILE':
      return 2;
    case 'FIRST_QUARTILE':
      return 1;
    case 'NONE':
    default:
      return 0;
  }
}

function calculateStreaks(weeks) {
  const allDays = [];
  for (const week of weeks || []) {
    for (const day of week.contributionDays || []) {
      allDays.push({
        date: day.date,
        count: day.contributionCount ?? 0,
      });
    }
  }

  allDays.sort((a, b) => a.date.localeCompare(b.date));

  let longestStreak = 0;
  let runningStreak = 0;

  for (const day of allDays) {
    if (day.count > 0) {
      runningStreak += 1;
      if (runningStreak > longestStreak) {
        longestStreak = runningStreak;
      }
    } else {
      runningStreak = 0;
    }
  }

  let currentStreak = 0;
  if (allDays.length > 0) {
    const lastIndex = allDays.length - 1;
    const lastDay = allDays[lastIndex];

    let startIndex = -1;
    if (lastDay.count > 0) {
      startIndex = lastIndex;
    } else if (lastIndex > 0 && allDays[lastIndex - 1].count > 0) {
      // If current day has not been active yet, evaluate from previous day
      startIndex = lastIndex - 1;
    }

    if (startIndex >= 0) {
      for (let i = startIndex; i >= 0; i -= 1) {
        if (allDays[i].count > 0) {
          currentStreak += 1;
        } else {
          break;
        }
      }
    }
  }

  return { currentStreak, longestStreak };
}

function transformGitHubData(user) {
  const weeks = user.contributionsCollection?.contributionCalendar?.weeks || [];
  const { currentStreak, longestStreak } = calculateStreaks(weeks);

  const repos = user.repositories?.nodes || [];

  let totalStars = 0;
  let totalForks = 0;
  const languageMap = new Map();
  let totalBytes = 0;

  for (const repo of repos) {
    totalStars += repo.stargazerCount ?? 0;
    totalForks += repo.forkCount ?? 0;

    for (const edge of repo.languages?.edges || []) {
      const name = edge.node?.name;
      const color = edge.node?.color || '#6e7681';
      const size = edge.size || 0;

      if (!name || size <= 0) continue;

      totalBytes += size;
      const existing = languageMap.get(name);
      if (existing) {
        existing.size += size;
      } else {
        languageMap.set(name, { name, color, size });
      }
    }
  }

  const topLanguages = Array.from(languageMap.values())
    .sort((a, b) => b.size - a.size)
    .map((lang) => ({
      name: lang.name,
      color: lang.color,
      size: lang.size,
      percentage:
        totalBytes > 0
          ? Number(((lang.size / totalBytes) * 100).toFixed(1))
          : 0,
    }));

  const highlights = repos
    .map((repo) => ({
      name: repo.name,
      description: repo.description ?? null,
      url: repo.url,
      stars: repo.stargazerCount ?? 0,
      forks: repo.forkCount ?? 0,
      language: repo.primaryLanguage?.name ?? null,
      languageColor: repo.primaryLanguage?.color ?? null,
    }))
    .sort((a, b) => b.stars - a.stars || a.name.localeCompare(b.name));

  const calendar = {
    totalContributions:
      user.contributionsCollection?.contributionCalendar?.totalContributions ??
      0,
    weeks: weeks.map((week) => ({
      days: (week.contributionDays || []).map((day) => ({
        date: day.date,
        count: day.contributionCount ?? 0,
        level: mapContributionLevel(day.contributionLevel),
        weekday: day.weekday,
      })),
    })),
  };

  return {
    username: user.login || targetUsername,
    updatedAt: new Date().toISOString(),
    totalContributions: calendar.totalContributions,
    currentStreak,
    longestStreak,
    totalRepositories: user.repositories?.totalCount ?? repos.length,
    totalStars,
    totalForks,
    topLanguages,
    highlights,
    calendar,
  };
}

function getFallbackMetrics() {
  return {
    username: targetUsername,
    updatedAt: new Date().toISOString(),
    totalContributions: 0,
    currentStreak: 0,
    longestStreak: 0,
    totalRepositories: 0,
    totalStars: 0,
    totalForks: 0,
    topLanguages: [],
    highlights: [],
    calendar: {
      totalContributions: 0,
      weeks: [],
    },
  };
}

async function resolveToken() {
  if (process.env.GITHUB_TOKEN) return process.env.GITHUB_TOKEN.trim();
  if (process.env.GH_TOKEN) return process.env.GH_TOKEN.trim();

  try {
    const { execSync } = await import('node:child_process');
    const token = execSync('gh auth token', {
      stdio: ['pipe', 'pipe', 'ignore'],
      encoding: 'utf-8',
    }).trim();
    if (token) return token;
  } catch {
    // gh CLI not available or not signed in
  }

  return null;
}

async function main() {
  console.log('🚀 [GitHub Sync] Starting GitHub metrics ingestion engine...');

  const token = await resolveToken();

  if (!token) {
    if (fs.existsSync(outputPath)) {
      console.log(
        'ℹ️ [GitHub Sync] No token provided; keeping existing snapshot.'
      );
      process.exit(0);
    }

    console.warn(
      '⚠️ [GitHub Sync] No token provided and no existing snapshot found; writing fallback snapshot.'
    );
    const fallback = getFallbackMetrics();
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(fallback, null, 2) + '\n');
    console.log(`✅ [GitHub Sync] Fallback snapshot written to ${outputPath}`);
    process.exit(0);
  }

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${token}`,
        'User-Agent': 'personal-website-metrics-sync',
      },
      body: JSON.stringify({
        query: GRAPHQL_QUERY,
        variables: { username: targetUsername },
      }),
    });

    if (!response.ok) {
      throw new Error(
        `GitHub GraphQL API returned HTTP ${response.status} ${response.statusText}`
      );
    }

    const payload = await response.json();

    if (payload.errors && payload.errors.length > 0) {
      throw new Error(
        `GraphQL error: ${payload.errors.map((e) => e.message).join('; ')}`
      );
    }

    const userData = payload.data?.user;
    if (!userData) {
      throw new Error(
        `User "${targetUsername}" not found in GitHub GraphQL response.`
      );
    }

    const metrics = transformGitHubData(userData);

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(metrics, null, 2) + '\n');

    console.log(
      `✅ [GitHub Sync] Successfully updated GitHub metrics snapshot (${metrics.totalContributions} contributions, ${metrics.totalRepositories} repos).`
    );
    console.log(`📄 [GitHub Sync] Written to: ${outputPath}`);
  } catch (error) {
    console.error(
      '❌ [GitHub Sync] Failed to fetch live GitHub metrics:',
      error
    );

    if (fs.existsSync(outputPath)) {
      console.warn(
        '⚠️ [GitHub Sync] Preserving existing snapshot despite fetch error.'
      );
      process.exit(0);
    }

    console.warn('⚠️ [GitHub Sync] Writing fallback snapshot after failure.');
    const fallback = getFallbackMetrics();
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(fallback, null, 2) + '\n');
    process.exit(0);
  }
}

main();
