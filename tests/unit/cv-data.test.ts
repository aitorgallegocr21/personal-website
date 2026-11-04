import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { cvData } from '@/data/cv-data';
import { VALID_PALETTES } from '@/types/resume';
import { calculateAge } from '@/utils/date';

describe('cvData SSOT integrity', () => {
  it('contains all mandatory top-level sections', () => {
    expect(cvData).toBeDefined();
    expect(cvData.personal).toBeDefined();
    expect(cvData.about).toBeDefined();
    expect(cvData.skills).toBeDefined();
    expect(cvData.projects).toBeDefined();
    expect(cvData.experience).toBeDefined();
    expect(cvData.education).toBeDefined();
    expect(cvData.certificates).toBeDefined();
  });

  describe('personal information', () => {
    it('has non-empty core identity fields', () => {
      expect(cvData.personal.name.trim().length).toBeGreaterThan(0);
      expect(cvData.personal.title.trim().length).toBeGreaterThan(0);
      expect(cvData.personal.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      expect(cvData.personal.location.trim().length).toBeGreaterThan(0);
      expect(cvData.personal.github).toMatch(/^https:\/\/github\.com\//);
      expect(cvData.personal.linkedin).toMatch(/^https:\/\/(www\.)?linkedin\.com\//);
    });

    it('has a valid ISO birthDate matching YYYY-MM-DD', () => {
      expect(cvData.personal.birthDate).toMatch(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/);
      const age = calculateAge(cvData.personal.birthDate);
      expect(age).toBeGreaterThanOrEqual(18);
    });

    it('has an existing avatar image file if defined', () => {
      if (cvData.personal.avatarUrl) {
        const filePath = resolve(import.meta.dirname, '../../public', cvData.personal.avatarUrl.replace(/^\//, ''));
        expect(existsSync(filePath), `Avatar file not found: ${filePath}`).toBe(true);
      }
    });
  });

  describe('about summary', () => {
    it('contains non-empty summaries for web and CV', () => {
      expect(cvData.about.shortSummary.trim().length).toBeGreaterThan(20);
      expect(cvData.about.fullBio.trim().length).toBeGreaterThan(50);
      if (cvData.about.cvSummary) {
        expect(cvData.about.cvSummary.trim().length).toBeGreaterThan(20);
      }
    });
  });

  describe('skills', () => {
    it('has multiple skill categories each containing non-empty skills', () => {
      expect(cvData.skills.length).toBeGreaterThanOrEqual(3);
      for (const group of cvData.skills) {
        expect(group.category.trim().length).toBeGreaterThan(0);
        expect(group.skills.length).toBeGreaterThan(0);
        for (const skill of group.skills) {
          expect(skill.trim().length).toBeGreaterThan(0);
        }
      }
    });
  });

  describe('projects and asset paths', () => {
    it('has valid projects with valid URLs and existing images', () => {
      expect(cvData.projects.length).toBeGreaterThan(0);
      for (const project of cvData.projects) {
        expect(project.id).toBeDefined();
        expect(project.title.trim().length).toBeGreaterThan(0);
        expect(project.technologies.length).toBeGreaterThan(0);

        if (project.repoUrl) {
          expect(project.repoUrl).toMatch(/^https?:\/\//);
        }
        if (project.liveUrl) {
          expect(project.liveUrl).toMatch(/^https?:\/\//);
        }
        if (project.image) {
          const filePath = resolve(import.meta.dirname, '../../public', project.image.replace(/^\//, ''));
          expect(existsSync(filePath), `Project image not found: ${filePath}`).toBe(true);
        }
      }
    });
  });

  describe('certificates and documents', () => {
    it('has valid certificates with accessible local documents or external URLs', () => {
      expect(cvData.certificates.length).toBeGreaterThan(0);
      for (const cert of cvData.certificates) {
        expect(cert.id).toBeDefined();
        expect(cert.title.trim().length).toBeGreaterThan(0);
        expect(cert.issuer.trim().length).toBeGreaterThan(0);

        if (cert.documentUrl) {
          if (cert.documentUrl.startsWith('http')) {
            expect(cert.documentUrl).toMatch(/^https?:\/\//);
          } else {
            const filePath = resolve(import.meta.dirname, '../../public', cert.documentUrl.replace(/^\//, ''));
            expect(existsSync(filePath), `Certificate document not found: ${filePath}`).toBe(true);
          }
        }

        if (cert.documents && cert.documents.length > 0) {
          for (const doc of cert.documents) {
            expect(doc.title.trim().length).toBeGreaterThan(0);
            if (doc.url.startsWith('http')) {
              expect(doc.url).toMatch(/^https?:\/\//);
            } else {
              const filePath = resolve(import.meta.dirname, '../../public', doc.url.replace(/^\//, ''));
              expect(existsSync(filePath), `Sub-document not found: ${filePath}`).toBe(true);
            }
          }
        }
      }
    });
  });

  describe('experience and education', () => {
    it('has valid experience entries', () => {
      expect(cvData.experience.length).toBeGreaterThan(0);
      for (const exp of cvData.experience) {
        expect(exp.id).toBeDefined();
        expect(exp.role.trim().length).toBeGreaterThan(0);
        expect(exp.company.trim().length).toBeGreaterThan(0);
        expect(exp.startDate).toMatch(/^\d{4}/);
        expect(exp.bullets.length).toBeGreaterThan(0);
      }
    });

    it('has valid education entries', () => {
      expect(cvData.education.length).toBeGreaterThan(0);
      for (const edu of cvData.education) {
        expect(edu.institution.trim().length).toBeGreaterThan(0);
        expect(edu.degree.trim().length).toBeGreaterThan(0);
        expect(edu.period.trim().length).toBeGreaterThan(0);
      }
    });
  });

  describe('palette system', () => {
    it('matches the 7 weekday palettes plus monochrome', () => {
      const expectedPalettes = [
        'emerald',
        'teal',
        'sky',
        'slate',
        'violet',
        'rose',
        'amber',
        'monochrome',
      ];
      expect(VALID_PALETTES).toEqual(expectedPalettes);
      expect(VALID_PALETTES.length).toBe(8);
    });
  });

  describe('typography self-hosting', () => {
    it('does not contain external Google Fonts references in layouts', () => {
      const baseLayoutPath = resolve(import.meta.dirname, '../../src/layouts/BaseLayout.astro');
      const printLayoutPath = resolve(import.meta.dirname, '../../src/layouts/PrintLayout.astro');
      const baseLayoutContent = readFileSync(baseLayoutPath, 'utf8');
      const printLayoutContent = readFileSync(printLayoutPath, 'utf8');

      expect(baseLayoutContent).not.toContain('fonts.googleapis.com');
      expect(baseLayoutContent).not.toContain('fonts.gstatic.com');
      expect(printLayoutContent).not.toContain('fonts.googleapis.com');
      expect(printLayoutContent).not.toContain('fonts.gstatic.com');
    });
  });
});
