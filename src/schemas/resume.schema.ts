import { z } from 'zod';

export const ISO_DATE_REGEX = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

export const PersonalInfoSchema = z.object({
  name: z.string().min(1, 'El nombre no puede estar vacío'),
  title: z.string().min(1, 'El título profesional es obligatorio'),
  email: z.email('Debe ser una dirección de email válida'),
  phone: z.string().optional(),
  location: z.string().min(1, 'La ubicación es obligatoria'),
  website: z.url('Debe ser una URL válida'),
  github: z.url('Debe ser una URL válida'),
  linkedin: z.url('Debe ser una URL válida'),
  birthDate: z
    .string()
    .regex(ISO_DATE_REGEX, 'birthDate debe tener formato ISO YYYY-MM-DD'),
  avatarUrl: z.string().optional(),
  status: z.string().optional(),
  driverLicense: z.string().optional(),
});

export const AboutSchema = z.object({
  shortSummary: z
    .string()
    .min(10, 'shortSummary debe tener al menos 10 caracteres'),
  cvSummary: z.string().optional(),
  fullBio: z.string().min(20, 'fullBio debe tener al menos 20 caracteres'),
});

export const SkillGroupSchema = z.object({
  category: z.string().min(1, 'La categoría no puede estar vacía'),
  skills: z
    .array(z.string().min(1, 'Una habilidad no puede ser una cadena vacía'))
    .min(1, 'Debe incluir al menos una habilidad por categoría'),
});

export const ExperienceSchema = z.object({
  id: z.string().min(1),
  role: z.string().min(1, 'El rol no puede estar vacío'),
  company: z.string().min(1, 'La empresa no puede estar vacía'),
  location: z.string().min(1),
  locationUrl: z.url().optional(),
  startDate: z.string().min(1),
  endDate: z.string().optional(),
  description: z.string(),
  bullets: z.array(z.string().min(1)),
  technologies: z.array(z.string().min(1)),
  featuredInCV: z.boolean(),
  category: z.enum(['tech', 'complementary']).optional(),
});

export const ProjectSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1, 'El título del proyecto es obligatorio'),
  summary: z.string().min(1),
  description: z.string().min(1),
  bullets: z.array(z.string().min(1)),
  technologies: z
    .array(z.string().min(1))
    .min(1, 'Debe especificar al menos una tecnología'),
  repoUrl: z.url().optional(),
  liveUrl: z.url().optional(),
  image: z.string().optional(),
  isCurrentProject: z.boolean().optional(),
  featuredInCV: z.boolean(),
});

export const EducationSchema = z.object({
  institution: z.string().min(1, 'La institución es obligatoria'),
  degree: z.string().min(1, 'El título obtenido es obligatorio'),
  period: z.string().min(1, 'El periodo formativo es obligatorio'),
  grade: z.string().optional(),
  details: z.array(z.string()).optional(),
  documentUrl: z.string().optional(),
});

export const CertificateCategorySchema = z.enum([
  'Java & Backend',
  'Frontend',
  'Bases de Datos',
  'Inteligencia Artificial',
  'Metodologías & Otros',
]);

export const CertificateDocumentSchema = z.object({
  title: z.string().min(1),
  url: z.string().min(1),
  type: z.enum(['main', 'module', 'syllabus']).optional(),
});

export const CertificateSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  issuer: z.string().min(1),
  platform: z.string().optional(),
  date: z.string().optional(),
  hours: z.string().optional(),
  category: CertificateCategorySchema,
  summary: z.string().min(1),
  skills: z.array(z.string().min(1)),
  documentUrl: z.string().optional(),
  documents: z.array(CertificateDocumentSchema).optional(),
  featuredInCV: z.boolean(),
});

export const LanguageSchema = z.object({
  language: z.string().min(1),
  level: z.string().min(1),
  detail: z.string().optional(),
});

export const InterestItemSchema = z.object({
  name: z.string().min(1),
  category: z.string().optional(),
  description: z.string().min(1),
});

export const PersonalTraitSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  category: z.enum(['virtud', 'habito', 'interes']).optional(),
  icon: z.string().optional(),
});

export const PhilosophyPrincipleSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  type: z.enum(['principle', 'balance']),
  icon: z.string().optional(),
});

export const EngineeringPhilosophySchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().min(1),
  principles: z.array(PhilosophyPrincipleSchema),
});

export const ResumeDataSchema = z.object({
  personal: PersonalInfoSchema,
  about: AboutSchema,
  skills: z.array(SkillGroupSchema).min(1),
  experience: z.array(ExperienceSchema).min(1),
  projects: z.array(ProjectSchema).min(1),
  certificates: z.array(CertificateSchema).min(1),
  education: z.array(EducationSchema).min(1),
  languages: z.array(LanguageSchema).optional(),
  interests: z.array(InterestItemSchema).optional(),
  personalTraits: z.array(PersonalTraitSchema).optional(),
  engineeringPhilosophy: EngineeringPhilosophySchema.optional(),
});

export type ValidatedResumeData = z.infer<typeof ResumeDataSchema>;
