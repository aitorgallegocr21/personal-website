import { describe, it, expect } from 'vitest';
import { calculateAge } from '@/utils/date';

describe('calculateAge', () => {
  it('calculates exact age when birthday has already occurred this year', () => {
    const birthDate = '2000-01-15';
    const referenceDate = new Date(2024, 5, 20); // June 20, 2024
    expect(calculateAge(birthDate, referenceDate)).toBe(24);
  });

  it('calculates exact age when birthday has not yet occurred this year', () => {
    const birthDate = '2000-11-20';
    const referenceDate = new Date(2024, 5, 20); // June 20, 2024
    expect(calculateAge(birthDate, referenceDate)).toBe(23);
  });

  it('calculates exact age on the exact day of birthday', () => {
    const birthDate = '2000-06-20';
    const referenceDate = new Date(2024, 5, 20); // June 20, 2024 (Month index 5 is June)
    expect(calculateAge(birthDate, referenceDate)).toBe(24);
  });

  it('calculates exact age one day before birthday', () => {
    const birthDate = '2000-06-21';
    const referenceDate = new Date(2024, 5, 20); // June 20, 2024
    expect(calculateAge(birthDate, referenceDate)).toBe(23);
  });

  it('calculates exact age one day after birthday', () => {
    const birthDate = '2000-06-19';
    const referenceDate = new Date(2024, 5, 20); // June 20, 2024
    expect(calculateAge(birthDate, referenceDate)).toBe(24);
  });

  describe('leap year handling', () => {
    const leapBirthDate = '2000-02-29';

    it('calculates age in leap year before leap day', () => {
      const referenceDate = new Date(2024, 1, 28); // Feb 28, 2024
      expect(calculateAge(leapBirthDate, referenceDate)).toBe(23);
    });

    it('calculates age in leap year on leap day', () => {
      const referenceDate = new Date(2024, 1, 29); // Feb 29, 2024
      expect(calculateAge(leapBirthDate, referenceDate)).toBe(24);
    });

    it('calculates age in non-leap year on Feb 28', () => {
      const referenceDate = new Date(2025, 1, 28); // Feb 28, 2025
      expect(calculateAge(leapBirthDate, referenceDate)).toBe(24);
    });

    it('calculates age in non-leap year on March 1', () => {
      const referenceDate = new Date(2025, 2, 1); // March 1, 2025
      expect(calculateAge(leapBirthDate, referenceDate)).toBe(25);
    });
  });

  describe('default reference date', () => {
    it('uses current date as default reference when omitted', () => {
      const birthDate = '2000-01-01';
      const age = calculateAge(birthDate);
      expect(age).toBeGreaterThanOrEqual(24);
      expect(Number.isInteger(age)).toBe(true);
    });
  });

  describe('format error handling', () => {
    it('throws descriptive error on invalid format strings', () => {
      expect(() => calculateAge('invalid-date')).toThrow(/Invalid birthDate string format/);
      expect(() => calculateAge('2000/01/01')).toThrow(/Invalid birthDate string format/);
      expect(() => calculateAge('2000-1-1')).toThrow(/Invalid birthDate string format/);
      expect(() => calculateAge('')).toThrow(/Invalid birthDate string format/);
      expect(() => calculateAge('2000-13-45')).toThrow(/Invalid birthDate string format/);
      expect(() => calculateAge('2000-00-10')).toThrow(/Invalid birthDate string format/);
    });
  });
});
