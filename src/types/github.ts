export type ContributionLevelNumber = 0 | 1 | 2 | 3 | 4;

export interface ContributionDay {
  date: string; // ISO date 'YYYY-MM-DD'
  count: number;
  level: ContributionLevelNumber;
  weekday: number; // 0 (Sunday) to 6 (Saturday)
}

export interface ContributionWeek {
  days: ContributionDay[];
}

export interface ContributionCalendar {
  totalContributions: number;
  weeks: ContributionWeek[];
}

export interface LanguageMetric {
  name: string;
  color: string;
  percentage: number;
  size: number;
}

export interface RepositoryHighlight {
  name: string;
  description: string | null;
  url: string;
  stars: number;
  forks: number;
  language: string | null;
  languageColor: string | null;
}

export interface GitHubMetrics {
  username: string;
  updatedAt: string;
  totalContributions: number;
  currentStreak: number;
  longestStreak: number;
  totalRepositories: number;
  totalStars: number;
  totalForks: number;
  topLanguages: LanguageMetric[];
  highlights: RepositoryHighlight[];
  calendar: ContributionCalendar;
}
