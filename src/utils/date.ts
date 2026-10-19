/**
 * Date and age calculation utilities.
 * Ensures Single Source of Truth (SSOT) and deterministic time calculations.
 */

/**
 * Calculates current age in full years from a YYYY-MM-DD birthdate string.
 * Automatically updates every year on the corresponding birthday without manual edits.
 *
 * @param birthDateString - Birth date formatted as "YYYY-MM-DD"
 * @param referenceDate - Reference date to evaluate age against (defaults to current date)
 * @returns Completed age in years
 */
export function calculateAge(birthDateString: string, referenceDate: Date = new Date()): number {
  const [yearStr, monthStr, dayStr] = birthDateString.split('-');
  const birthYear = parseInt(yearStr, 10);
  const birthMonth = parseInt(monthStr, 10) - 1; // 0-indexed month
  const birthDay = parseInt(dayStr, 10);

  if (isNaN(birthYear) || isNaN(birthMonth) || isNaN(birthDay)) {
    throw new Error(`Invalid birthDate string format (expected YYYY-MM-DD): "${birthDateString}"`);
  }

  const currentYear = referenceDate.getFullYear();
  const currentMonth = referenceDate.getMonth();
  const currentDay = referenceDate.getDate();

  let age = currentYear - birthYear;
  const monthDiff = currentMonth - birthMonth;

  if (monthDiff < 0 || (monthDiff === 0 && currentDay < birthDay)) {
    age--;
  }

  return age;
}
