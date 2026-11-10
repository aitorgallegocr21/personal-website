import { z } from 'zod';
import type { GitHubMetrics } from '@/types/github';

export const ISO_DATE_REGEX = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

export const ContributionLevelSchema = z.union([
  z.literal(0),
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
]);

export const ContributionDaySchema = z.object({
  date: z
    .string()
    .regex(ISO_DATE_REGEX, 'date debe tener formato ISO YYYY-MM-DD'),
  count: z.number().int().min(0, 'count no puede ser negativo'),
  level: ContributionLevelSchema,
  weekday: z.number().int().min(0).max(6),
});

export const ContributionWeekSchema = z.object({
  days: z.array(ContributionDaySchema),
});

export const ContributionCalendarSchema = z.object({
  totalContributions: z.number().int().min(0),
  weeks: z.array(ContributionWeekSchema),
});

export const LanguageMetricSchema = z.object({
  name: z.string().min(1, 'El nombre del lenguaje es obligatorio'),
  color: z.string().min(1, 'El color hexadecimal es obligatorio'),
  percentage: z.number().min(0).max(100),
  size: z.number().int().min(0),
});

export const RepositoryHighlightSchema = z.object({
  name: z.string().min(1, 'El nombre del repositorio es obligatorio'),
  description: z.string().nullable(),
  url: z.url('Debe ser una URL válida'),
  stars: z.number().int().min(0),
  forks: z.number().int().min(0),
  language: z.string().nullable(),
  languageColor: z.string().nullable(),
});

export const GitHubMetricsSchema = z.object({
  username: z.string().min(1, 'El nombre de usuario es obligatorio'),
  updatedAt: z.iso.datetime({
    message: 'updatedAt debe ser un ISO datetime válido',
  }),
  totalContributions: z.number().int().min(0),
  currentStreak: z.number().int().min(0),
  longestStreak: z.number().int().min(0),
  totalRepositories: z.number().int().min(0),
  totalStars: z.number().int().min(0),
  totalForks: z.number().int().min(0),
  topLanguages: z.array(LanguageMetricSchema),
  highlights: z.array(RepositoryHighlightSchema),
  calendar: ContributionCalendarSchema,
});

export const fallbackGitHubMetrics: GitHubMetrics = {
  username: 'aitorgallegocr21',
  updatedAt: '2026-01-01T00:00:00.000Z',
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

export function validateGitHubMetrics(data: unknown): GitHubMetrics {
  const result = GitHubMetricsSchema.safeParse(data);
  if (!result.success) {
    console.warn(
      '⚠️ [GitHub Schema] Invalid metrics data provided. Falling back to default metrics:',
      result.error.issues
    );
    return fallbackGitHubMetrics;
  }
  return result.data as GitHubMetrics;
}
