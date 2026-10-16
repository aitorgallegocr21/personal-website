export interface ContactInfo {
  name: string;
  title: string;
  email: string;
  phone?: string;
  location: string;
  website: string;
  github: string;
  linkedin: string;
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  description: string;
  bullets: string[];
  technologies: string[];
  featuredInCV: boolean;
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
  featuredInCV: boolean;
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  details?: string[];
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  platform?: string;
  date?: string;
  hours?: string;
  category: 'Java & Backend' | 'Frontend' | 'Bases de Datos' | 'Inteligencia Artificial';
  summary: string;
  skills: string[];
  featuredInCV: boolean; // Flag para decidir si entra en el resumen del PDF A4 o queda en la web
}

export interface ResumeData {
  personal: ContactInfo;
  about: {
    shortSummary: string;
    fullBio: string;
  };
  skills: SkillGroup[];
  experience: Experience[];
  projects: Project[];
  certificates: Certificate[];
  education: Education[];
  languages?: { language: string; level: string }[];
}