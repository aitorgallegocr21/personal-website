export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone?: string;
  location: string;
  website: string;
  github: string;
  linkedin: string;
  birthDate: string;
  avatarUrl?: string;
  status?: string;
  driverLicense?: string;
}

export type ContactInfo = PersonalInfo;

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  locationUrl?: string;
  startDate: string;
  endDate?: string;
  description: string;
  bullets: string[];
  technologies: string[];
  featuredInCV: boolean;
  category?: 'tech' | 'complementary';
}

export interface Project {
  id: string;
  title: string;
  summary: string;
  description: string;
  bullets: string[];
  technologies: string[];
  repoUrl?: string;
  liveUrl?: string;
  image?: string;
  isCurrentProject?: boolean;
  featuredInCV: boolean;
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  details?: string[];
  documentUrl?: string;
}

export type CertificateCategory =
  | 'Java & Backend'
  | 'Frontend'
  | 'Bases de Datos'
  | 'Inteligencia Artificial'
  | 'Metodologías & Otros';

export interface CertificateDocument {
  title: string;
  url: string;
  type?: 'main' | 'module' | 'syllabus';
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  platform?: string;
  date?: string;
  hours?: string;
  category: CertificateCategory;
  summary: string;
  skills: string[];
  documentUrl?: string;
  documents?: CertificateDocument[];
  featuredInCV: boolean;
}

export interface Language {
  language: string;
  level: string;
  detail?: string;
}

export interface ResumeData {
  personal: PersonalInfo;
  about: {
    shortSummary: string;
    cvSummary?: string;
    fullBio: string;
  };
  skills: SkillGroup[];
  experience: Experience[];
  projects: Project[];
  certificates: Certificate[];
  education: Education[];
  languages?: Language[];
}