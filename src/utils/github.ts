import type { ContributionCalendar, ContributionDay } from '@/types/github';

export const SHORT_MONTHS_ES = [
  'ene',
  'feb',
  'mar',
  'abr',
  'may',
  'jun',
  'jul',
  'ago',
  'sep',
  'oct',
  'nov',
  'dic',
];

/**
 * Calculates current active streak scanning backward from the most recent date.
 * If today has 0 contributions, grants grace period to yesterday's streak.
 */
export function calculateCurrentStreak(days: ContributionDay[]): number {
  if (!days || days.length === 0) return 0;

  const sortedDays = [...days].sort((a, b) => a.date.localeCompare(b.date));
  const lastIndex = sortedDays.length - 1;
  const lastDay = sortedDays[lastIndex];

  let startIndex = -1;
  if (lastDay.count > 0) {
    startIndex = lastIndex;
  } else if (lastIndex > 0 && sortedDays[lastIndex - 1].count > 0) {
    // If today is 0 so far, keep streak alive based on yesterday's activity
    startIndex = lastIndex - 1;
  }

  if (startIndex < 0) return 0;

  let streak = 0;
  for (let i = startIndex; i >= 0; i -= 1) {
    if (sortedDays[i].count > 0) {
      streak += 1;
    } else {
      break;
    }
  }

  return streak;
}

/**
 * Calculates longest continuous sequence of days with at least 1 contribution.
 */
export function calculateLongestStreak(days: ContributionDay[]): number {
  if (!days || days.length === 0) return 0;

  const sortedDays = [...days].sort((a, b) => a.date.localeCompare(b.date));

  let longest = 0;
  let running = 0;

  for (const day of sortedDays) {
    if (day.count > 0) {
      running += 1;
      if (running > longest) {
        longest = running;
      }
    } else {
      running = 0;
    }
  }

  return longest;
}

/**
 * Sums all contributions across the calendar weeks matrix.
 */
export function calculateYearlyContributions(
  calendar: ContributionCalendar
): number {
  if (!calendar || !calendar.weeks) return 0;

  let total = 0;
  for (const week of calendar.weeks) {
    for (const day of week.days || []) {
      total += day.count || 0;
    }
  }

  return total;
}

/**
 * Formats ISO date 'YYYY-MM-DD' into human-readable Spanish string.
 * Example: '2026-10-12' -> '12 de oct. de 2026'
 */
export function formatContributionDate(dateStr: string): string {
  if (!dateStr || typeof dateStr !== 'string') return '';

  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;

  const year = Number(parts[0]);
  const month = Number(parts[1]) - 1;
  const day = Number(parts[2]);

  if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day)) {
    return dateStr;
  }

  const monthName = SHORT_MONTHS_ES[month];
  if (!monthName) return dateStr;

  return `${day} de ${monthName}. de ${year}`;
}
