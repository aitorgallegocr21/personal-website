import { describe, it, expect } from 'vitest';
import {
  calculateScrollProgress,
  interpolateGeometry,
  computeGlowIntensities,
  type LinkCoords,
} from '@/lib/scroll-spy';

describe('Scroll-Spy Math Engine', () => {
  describe('calculateScrollProgress', () => {
    const sectionTops = [600, 1200, 1800, 2400, 3000];
    const headerOffset = 100;
    const fadeDistance = 160;

    it('returns zeroes when section tops array is empty', () => {
      const result = calculateScrollProgress(300, []);
      expect(result).toEqual({
        activeIndex: 0,
        targetIndex: 0,
        progress: 0,
        opacity: 0,
        isHero: true,
      });
    });

    it('identifies Hero zone when scroll is well above first section', () => {
      const result = calculateScrollProgress(100, sectionTops, {
        headerOffset,
        fadeDistance,
      });
      expect(result.isHero).toBe(true);
      expect(result.opacity).toBe(0);
    });

    it('returns opacity 0 when scroll is well above first section', () => {
      // firstTop is 600. triggerY = scrollY + 100.
      // If scrollY = 200, triggerY = 300 < 600 - 160 = 440.
      const result = calculateScrollProgress(200, sectionTops, {
        headerOffset,
        fadeDistance,
      });
      expect(result.opacity).toBe(0);
      expect(result.activeIndex).toBe(0);
    });

    it('fades in smoothly when approaching the first section', () => {
      // firstTop = 600, fade threshold start = 440.
      // If scrollY = 400, triggerY = 500.
      // fadeRatio = (500 - 440) / 160 = 60 / 160 = 0.375.
      const result = calculateScrollProgress(400, sectionTops, {
        headerOffset,
        fadeDistance,
      });
      expect(result.opacity).toBeCloseTo(0.375, 2);
      expect(result.activeIndex).toBe(0);
      expect(result.targetIndex).toBe(0);
      expect(result.progress).toBe(0);
    });

    it('marks first section fully active at its trigger point', () => {
      // scrollY = 500 => triggerY = 600 = sectionTops[0].
      const result = calculateScrollProgress(500, sectionTops, {
        headerOffset,
        fadeDistance,
      });
      expect(result.opacity).toBe(1);
      expect(result.activeIndex).toBe(0);
      expect(result.targetIndex).toBe(1);
      expect(result.progress).toBeCloseTo(0, 2);
    });

    it('interpolates linearly between section 0 and section 1', () => {
      // section 0 = 600, section 1 = 1200, span = 600.
      // If scrollY = 800 => triggerY = 900.
      // progress = (900 - 600) / 600 = 0.5.
      const result = calculateScrollProgress(800, sectionTops, {
        headerOffset,
        fadeDistance,
      });
      expect(result.opacity).toBe(1);
      expect(result.activeIndex).toBe(0);
      expect(result.targetIndex).toBe(1);
      expect(result.progress).toBeCloseTo(0.5, 2);
    });

    it('transitions to section 1 when trigger reaches section 1', () => {
      // scrollY = 1100 => triggerY = 1200 = sectionTops[1].
      const result = calculateScrollProgress(1100, sectionTops, {
        headerOffset,
        fadeDistance,
      });
      expect(result.opacity).toBe(1);
      expect(result.activeIndex).toBe(1);
      expect(result.targetIndex).toBe(2);
      expect(result.progress).toBeCloseTo(0, 2);
    });

    it('locks onto the last section when scroll exceeds last top', () => {
      // lastTop = 3000. scrollY = 3200 => triggerY = 3300.
      const result = calculateScrollProgress(3200, sectionTops, {
        headerOffset,
        fadeDistance,
      });
      expect(result.opacity).toBe(1);
      expect(result.activeIndex).toBe(4);
      expect(result.targetIndex).toBe(4);
      expect(result.progress).toBe(0);
    });

    it('activates the last section if page hits bottom regardless of trigger offset', () => {
      const maxScrollY = 2500;
      const result = calculateScrollProgress(2490, sectionTops, {
        headerOffset,
        fadeDistance,
        maxScrollY,
      });
      expect(result.opacity).toBe(1);
      expect(result.activeIndex).toBe(4);
      expect(result.targetIndex).toBe(4);
    });
  });

  describe('interpolateGeometry', () => {
    it('interpolates horizontally along X and width', () => {
      const from: LinkCoords = { x: 10, y: 5, width: 80, height: 32 };
      const to: LinkCoords = { x: 100, y: 5, width: 100, height: 32 };

      const atZero = interpolateGeometry(from, to, 0);
      expect(atZero).toEqual(from);

      const atHalf = interpolateGeometry(from, to, 0.5);
      expect(atHalf).toEqual({
        x: 55,
        y: 5,
        width: 90,
        height: 32,
      });

      const atOne = interpolateGeometry(from, to, 1);
      expect(atOne).toEqual(to);
    });

    it('interpolates vertically along Y and height', () => {
      const from: LinkCoords = { x: 8, y: 10, width: 44, height: 44 };
      const to: LinkCoords = { x: 8, y: 64, width: 44, height: 44 };

      const atHalf = interpolateGeometry(from, to, 0.5);
      expect(atHalf).toEqual({
        x: 8,
        y: 37,
        width: 44,
        height: 44,
      });
    });

    it('interpolates accurately between stacked icon and micro-label link cells', () => {
      const from: LinkCoords = { x: 10, y: 5, width: 52, height: 36 };
      const to: LinkCoords = { x: 70, y: 5, width: 62, height: 36 };

      const midpoint = interpolateGeometry(from, to, 0.5);
      expect(midpoint).toEqual({
        x: 40,
        y: 5,
        width: 57,
        height: 36,
      });
    });

    it('clamps progress to [0, 1] range safely', () => {
      const from: LinkCoords = { x: 0, y: 0, width: 50, height: 30 };
      const to: LinkCoords = { x: 100, y: 0, width: 80, height: 30 };

      const belowZero = interpolateGeometry(from, to, -0.5);
      expect(belowZero).toEqual(from);

      const aboveOne = interpolateGeometry(from, to, 1.5);
      expect(aboveOne).toEqual(to);
    });
  });

  describe('computeGlowIntensities', () => {
    it('returns all zeroes when opacity is zero', () => {
      const intensities = computeGlowIntensities(5, 0, 1, 0.5, 0);
      expect(intensities).toEqual([0, 0, 0, 0, 0]);
    });

    it('gives 100% intensity to active section when target equals active', () => {
      const intensities = computeGlowIntensities(5, 2, 2, 0, 1);
      expect(intensities).toEqual([0, 0, 1, 0, 0]);
    });

    it('distributes intensity proportionally between active and target links', () => {
      const intensities = computeGlowIntensities(4, 1, 2, 0.4, 1);
      expect(intensities[0]).toBe(0);
      expect(intensities[1]).toBeCloseTo(0.6, 2);
      expect(intensities[2]).toBeCloseTo(0.4, 2);
      expect(intensities[3]).toBe(0);
    });

    it('scales intensities by overall opacity when fading in', () => {
      const intensities = computeGlowIntensities(4, 0, 0, 0, 0.5);
      expect(intensities[0]).toBeCloseTo(0.5, 2);
      expect(intensities[1]).toBe(0);
    });
  });
});
