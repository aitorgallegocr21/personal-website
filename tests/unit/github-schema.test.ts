import { describe, it, expect } from 'vitest';
import rawGitHubData from '@/data/github-data.json';
import { getGitHubMetrics, gitHubMetrics } from '@/data/github';
import {
  GitHubMetricsSchema,
  ContributionDaySchema,
  LanguageMetricSchema,
  RepositoryHighlightSchema,
  validateGitHubMetrics,
  fallbackGitHubMetrics,
} from '@/schemas/github.schema';

describe('GitHub Data Schema & Zod Validation', () => {
  it('successfully validates the entire snapshot src/data/github-data.json', () => {
    expect(() => GitHubMetricsSchema.parse(rawGitHubData)).not.toThrow();
    const validated = GitHubMetricsSchema.parse(rawGitHubData);
    expect(validated.username).toBe('aitorgallegocr21');
    expect(validated.totalContributions).toBeGreaterThanOrEqual(0);
    expect(Array.isArray(validated.topLanguages)).toBe(true);
    expect(Array.isArray(validated.highlights)).toBe(true);
    expect(Array.isArray(validated.calendar.weeks)).toBe(true);
  });

  it('loads valid metrics using getGitHubMetrics() and exports gitHubMetrics instance', () => {
    const loaded = getGitHubMetrics();
    expect(loaded.username).toBe('aitorgallegocr21');
    expect(gitHubMetrics.username).toBe('aitorgallegocr21');
    expect(gitHubMetrics.calendar.totalContributions).toBe(
      loaded.totalContributions
    );
  });

  it('validates fallbackGitHubMetrics against GitHubMetricsSchema', () => {
    expect(() =>
      GitHubMetricsSchema.parse(fallbackGitHubMetrics)
    ).not.toThrow();
    const validated = GitHubMetricsSchema.parse(fallbackGitHubMetrics);
    expect(validated.username).toBe('aitorgallegocr21');
    expect(validated.totalContributions).toBe(0);
    expect(validated.calendar.weeks).toEqual([]);
  });

  describe('ContributionDaySchema validations', () => {
    const validDay = {
      date: '2026-11-10',
      count: 5,
      level: 2 as const,
      weekday: 2,
    };

    it('accepts a valid contribution day', () => {
      expect(() => ContributionDaySchema.parse(validDay)).not.toThrow();
    });

    it('rejects an invalid date format', () => {
      expect(() =>
        ContributionDaySchema.parse({ ...validDay, date: '10/11/2026' })
      ).toThrow();
    });

    it('rejects negative contribution counts', () => {
      expect(() =>
        ContributionDaySchema.parse({ ...validDay, count: -1 })
      ).toThrow();
    });

    it('rejects an invalid contribution level', () => {
      expect(() =>
        ContributionDaySchema.parse({ ...validDay, level: 5 })
      ).toThrow();
    });

    it('rejects an invalid weekday index', () => {
      expect(() =>
        ContributionDaySchema.parse({ ...validDay, weekday: 7 })
      ).toThrow();
    });
  });

  describe('LanguageMetricSchema validations', () => {
    it('accepts valid language metric items', () => {
      const valid = {
        name: 'TypeScript',
        color: '#3178c6',
        percentage: 42.5,
        size: 150000,
      };
      expect(() => LanguageMetricSchema.parse(valid)).not.toThrow();
    });

    it('rejects percentage greater than 100 or less than 0', () => {
      const invalidOver = {
        name: 'TypeScript',
        color: '#3178c6',
        percentage: 120,
        size: 1000,
      };
      const invalidUnder = {
        name: 'TypeScript',
        color: '#3178c6',
        percentage: -5,
        size: 1000,
      };
      expect(() => LanguageMetricSchema.parse(invalidOver)).toThrow();
      expect(() => LanguageMetricSchema.parse(invalidUnder)).toThrow();
    });
  });

  describe('RepositoryHighlightSchema validations', () => {
    it('accepts a valid repository highlight', () => {
      const valid = {
        name: 'personal-website',
        description: 'Portfolio project',
        url: 'https://github.com/aitorgallegocr21/personal-website',
        stars: 1,
        forks: 0,
        language: 'Astro',
        languageColor: '#ff5a03',
      };
      expect(() => RepositoryHighlightSchema.parse(valid)).not.toThrow();
    });

    it('rejects invalid repository URLs', () => {
      const invalid = {
        name: 'broken-repo',
        description: null,
        url: 'invalid-url',
        stars: 0,
        forks: 0,
        language: null,
        languageColor: null,
      };
      expect(() => RepositoryHighlightSchema.parse(invalid)).toThrow();
    });
  });

  describe('validateGitHubMetrics fallback mechanism', () => {
    it('returns fallbackGitHubMetrics when given corrupted or malformed input', () => {
      const fallbackResult = validateGitHubMetrics({ corrupted: true });
      expect(fallbackResult).toEqual(fallbackGitHubMetrics);
    });

    it('returns validated metrics when given valid data', () => {
      const validResult = validateGitHubMetrics(rawGitHubData);
      expect(validResult.username).toBe('aitorgallegocr21');
      expect(validResult.totalContributions).toBe(
        rawGitHubData.totalContributions
      );
    });
  });
});
