import { describe, it, expect } from 'vitest';
import {
  calculateCurrentStreak,
  calculateLongestStreak,
  calculateYearlyContributions,
  formatContributionDate,
} from '@/utils/github';
import type { ContributionCalendar, ContributionDay } from '@/types/github';

describe('GitHub Utility Calculations', () => {
  describe('calculateCurrentStreak', () => {
    it('returns 0 for empty array', () => {
      expect(calculateCurrentStreak([])).toBe(0);
    });

    it('returns 0 when no days have contributions', () => {
      const days: ContributionDay[] = [
        { date: '2026-11-01', count: 0, level: 0, weekday: 0 },
        { date: '2026-11-02', count: 0, level: 0, weekday: 1 },
      ];
      expect(calculateCurrentStreak(days)).toBe(0);
    });

    it('returns current streak when latest day has activity', () => {
      const days: ContributionDay[] = [
        { date: '2026-11-05', count: 0, level: 0, weekday: 4 },
        { date: '2026-11-06', count: 3, level: 1, weekday: 5 },
        { date: '2026-11-07', count: 5, level: 2, weekday: 6 },
        { date: '2026-11-08', count: 2, level: 1, weekday: 0 },
      ];
      expect(calculateCurrentStreak(days)).toBe(3);
    });

    it('preserves streak if latest day (today) is 0 but yesterday was active', () => {
      const days: ContributionDay[] = [
        { date: '2026-11-05', count: 0, level: 0, weekday: 4 },
        { date: '2026-11-06', count: 2, level: 1, weekday: 5 },
        { date: '2026-11-07', count: 4, level: 2, weekday: 6 },
        { date: '2026-11-08', count: 0, level: 0, weekday: 0 }, // today inactive
      ];
      expect(calculateCurrentStreak(days)).toBe(2);
    });

    it('breaks streak if both today and yesterday have 0 contributions', () => {
      const days: ContributionDay[] = [
        { date: '2026-11-05', count: 4, level: 2, weekday: 4 },
        { date: '2026-11-06', count: 0, level: 0, weekday: 5 }, // yesterday inactive
        { date: '2026-11-07', count: 0, level: 0, weekday: 6 }, // today inactive
      ];
      expect(calculateCurrentStreak(days)).toBe(0);
    });

    it('handles unsorted input correctly', () => {
      const days: ContributionDay[] = [
        { date: '2026-11-08', count: 2, level: 1, weekday: 0 },
        { date: '2026-11-06', count: 3, level: 1, weekday: 5 },
        { date: '2026-11-07', count: 5, level: 2, weekday: 6 },
        { date: '2026-11-05', count: 0, level: 0, weekday: 4 },
      ];
      expect(calculateCurrentStreak(days)).toBe(3);
    });
  });

  describe('calculateLongestStreak', () => {
    it('returns 0 for empty array', () => {
      expect(calculateLongestStreak([])).toBe(0);
    });

    it('returns 0 when all days have 0 contributions', () => {
      const days: ContributionDay[] = [
        { date: '2026-11-01', count: 0, level: 0, weekday: 0 },
        { date: '2026-11-02', count: 0, level: 0, weekday: 1 },
      ];
      expect(calculateLongestStreak(days)).toBe(0);
    });

    it('identifies longest streak with intermittent activity', () => {
      const days: ContributionDay[] = [
        { date: '2026-11-01', count: 1, level: 1, weekday: 0 },
        { date: '2026-11-02', count: 2, level: 1, weekday: 1 },
        { date: '2026-11-03', count: 0, level: 0, weekday: 2 },
        { date: '2026-11-04', count: 1, level: 1, weekday: 3 },
        { date: '2026-11-05', count: 4, level: 2, weekday: 4 },
        { date: '2026-11-06', count: 2, level: 1, weekday: 5 },
        { date: '2026-11-07', count: 3, level: 2, weekday: 6 },
        { date: '2026-11-08', count: 0, level: 0, weekday: 0 },
      ];
      // First streak: 2 days. Second streak: 4 days.
      expect(calculateLongestStreak(days)).toBe(4);
    });

    it('handles entire array active', () => {
      const days: ContributionDay[] = [
        { date: '2026-11-01', count: 1, level: 1, weekday: 0 },
        { date: '2026-11-02', count: 1, level: 1, weekday: 1 },
        { date: '2026-11-03', count: 1, level: 1, weekday: 2 },
      ];
      expect(calculateLongestStreak(days)).toBe(3);
    });
  });

  describe('calculateYearlyContributions', () => {
    it('returns 0 for empty calendar', () => {
      const emptyCalendar: ContributionCalendar = {
        totalContributions: 0,
        weeks: [],
      };
      expect(calculateYearlyContributions(emptyCalendar)).toBe(0);
    });

    it('accurately sums contribution counts across weeks and days', () => {
      const calendar: ContributionCalendar = {
        totalContributions: 15,
        weeks: [
          {
            days: [
              { date: '2026-11-01', count: 4, level: 2, weekday: 0 },
              { date: '2026-11-02', count: 6, level: 3, weekday: 1 },
            ],
          },
          {
            days: [
              { date: '2026-11-08', count: 5, level: 2, weekday: 0 },
              { date: '2026-11-09', count: 0, level: 0, weekday: 1 },
            ],
          },
        ],
      };
      expect(calculateYearlyContributions(calendar)).toBe(15);
    });
  });

  describe('formatContributionDate', () => {
    it('formats ISO date to human-readable Spanish format with short month and dots', () => {
      expect(formatContributionDate('2026-10-12')).toBe('12 de oct. de 2026');
      expect(formatContributionDate('2026-01-01')).toBe('1 de ene. de 2026');
      expect(formatContributionDate('2026-12-31')).toBe('31 de dic. de 2026');
    });

    it('returns original string or empty for invalid or missing date', () => {
      expect(formatContributionDate('')).toBe('');
      expect(formatContributionDate('invalid-date')).toBe('invalid-date');
      expect(formatContributionDate('2026-99-99')).toBe('2026-99-99');
    });
  });
});
