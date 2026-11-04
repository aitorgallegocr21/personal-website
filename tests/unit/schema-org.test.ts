import { describe, it, expect } from 'vitest';
import { cvData } from '@/data/cv-data';

describe('Schema.org JSON-LD Entities', () => {
  it('contains valid Person entity fields from cvData', () => {
    expect(cvData.personal.name).toBeTruthy();
    expect(cvData.personal.title).toBeTruthy();
    expect(cvData.about.shortSummary).toBeTruthy();

    const sameAs = [cvData.personal.github, cvData.personal.linkedin].filter(
      Boolean
    );
    expect(sameAs.length).toBeGreaterThanOrEqual(2);
    expect(sameAs.some((url) => url.includes('github.com'))).toBe(true);
    expect(sameAs.some((url) => url.includes('linkedin.com'))).toBe(true);
  });

  it('maps skills to knowsAbout array', () => {
    const allSkills = cvData.skills.flatMap((s) => s.skills);
    expect(allSkills.length).toBeGreaterThan(5);
    expect(allSkills).toContain('Python');
    expect(allSkills).toContain('TypeScript');
  });

  it('maps education to alumniOf educational organizations', () => {
    const alumniInstitutions = cvData.education.map((e) => ({
      '@type': 'EducationalOrganization',
      name: e.institution,
    }));
    expect(alumniInstitutions.length).toBeGreaterThanOrEqual(2);
    expect(alumniInstitutions[0].name).toContain('IES Juan Bosco');
  });
});
