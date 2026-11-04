import { describe, it, expect } from 'vitest';
import { cvData } from '@/data/cv-data';
import {
  ResumeDataSchema,
  PersonalInfoSchema,
  ProjectSchema,
  CertificateSchema,
  SkillGroupSchema,
} from '@/schemas/resume.schema';

describe('Zod SSOT Runtime Schema Validation', () => {
  it('successfully validates the entire cvData master object against ResumeDataSchema', () => {
    expect(() => ResumeDataSchema.parse(cvData)).not.toThrow();
    const validated = ResumeDataSchema.parse(cvData);
    expect(validated.personal.name).toBe(cvData.personal.name);
    expect(validated.projects.length).toBe(cvData.projects.length);
    expect(validated.certificates.length).toBe(cvData.certificates.length);
    expect(validated.experience.length).toBe(cvData.experience.length);
  });

  describe('PersonalInfoSchema validations', () => {
    it('accepts valid personal info matching SSOT', () => {
      expect(() => PersonalInfoSchema.parse(cvData.personal)).not.toThrow();
    });

    it('rejects an invalid email format', () => {
      const invalid = { ...cvData.personal, email: 'not-an-email' };
      expect(() => PersonalInfoSchema.parse(invalid)).toThrow();
    });

    it('rejects a birthDate that does not follow ISO YYYY-MM-DD', () => {
      const invalid = { ...cvData.personal, birthDate: '01/01/2000' };
      expect(() => PersonalInfoSchema.parse(invalid)).toThrow();
    });

    it('rejects an invalid website URL', () => {
      const invalid = { ...cvData.personal, website: 'invalid-url' };
      expect(() => PersonalInfoSchema.parse(invalid)).toThrow();
    });
  });

  describe('SkillGroupSchema validations', () => {
    it('rejects a skill group with an empty skills array', () => {
      const invalid = { category: 'Backend', skills: [] };
      expect(() => SkillGroupSchema.parse(invalid)).toThrow();
    });

    it('rejects a skill group with empty string as skill item', () => {
      const invalid = { category: 'Backend', skills: [''] };
      expect(() => SkillGroupSchema.parse(invalid)).toThrow();
    });
  });

  describe('ProjectSchema validations', () => {
    it('accepts valid project from cvData', () => {
      expect(() => ProjectSchema.parse(cvData.projects[0])).not.toThrow();
    });

    it('rejects a project missing technologies', () => {
      const invalid = { ...cvData.projects[0], technologies: [] };
      expect(() => ProjectSchema.parse(invalid)).toThrow();
    });

    it('rejects a project with an invalid repoUrl', () => {
      const invalid = { ...cvData.projects[0], repoUrl: 'not-a-valid-url' };
      expect(() => ProjectSchema.parse(invalid)).toThrow();
    });
  });

  describe('CertificateSchema validations', () => {
    it('accepts valid certificates from cvData', () => {
      for (const cert of cvData.certificates) {
        expect(() => CertificateSchema.parse(cert)).not.toThrow();
      }
    });

    it('rejects a certificate with an unknown category', () => {
      const invalid = {
        ...cvData.certificates[0],
        category: 'NonExistentCategory' as unknown as 'Frontend',
      };
      expect(() => CertificateSchema.parse(invalid)).toThrow();
    });
  });
});
