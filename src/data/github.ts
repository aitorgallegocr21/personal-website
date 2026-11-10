import rawGitHubData from './github-data.json';
import { validateGitHubMetrics } from '@/schemas/github.schema';
import type { GitHubMetrics } from '@/types/github';

export function getGitHubMetrics(): GitHubMetrics {
  return validateGitHubMetrics(rawGitHubData);
}

export const gitHubMetrics: GitHubMetrics = getGitHubMetrics();
