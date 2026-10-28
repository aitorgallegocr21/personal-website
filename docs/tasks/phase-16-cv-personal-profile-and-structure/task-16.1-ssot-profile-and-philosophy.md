# Task 16.1: SSOT Data Architecture: Personal Profile, Traits & Engineering Philosophy

**Status:** Pending  
**Objective:** Model schema interfaces in `src/types/resume.ts` and populate structured data in `src/data/cv-data.ts` to power both the CV personal profile and the web engineering philosophy without hardcoding.

---

## 1. Requirements & Typing Schema (`src/types/resume.ts`)

1. **Personal Traits & Hobbies:**
   ```typescript
   export interface PersonalTrait {
     id: string;
     title: string;
     description: string;
     category?: 'virtud' | 'habito' | 'interes';
     icon?: string;
   }
   ```
2. **Engineering Philosophy & Principles:**
   ```typescript
   export interface PhilosophyPrinciple {
     id: string;
     title: string;
     description: string;
     type: 'principle' | 'balance';
   }

   export interface EngineeringPhilosophy {
     title: string;
     subtitle: string;
     principles: PhilosophyPrinciple[];
   }
   ```
3. **ResumeData Extension:**
   - Add `personalTraits?: PersonalTrait[];`
   - Add `engineeringPhilosophy?: EngineeringPhilosophy;`

---

## 2. Data Population (`src/data/cv-data.ts`)

1. **Extracto & Virtudes Personales:**
   - *Organización y rigor:* Enfoque estructurado, entornos limpios y documentación precisa.
   - *Disciplina y constancia:* Hábitos aplicados al software y al desarrollo continuo.
   - *Deporte y resistencia mental:* Tenis de competición, entrenamiento de fuerza y running.
   - *Lectura analítica:* Novela policíaca, misterio y ensayo para agudizar el pensamiento deductivo.
2. **Filosofía de Ingeniería:**
   - *Comprensión profunda:* Dominio de fundamentos y rechazo a las cajas negras.
   - *Rigor y optimización:* Especificaciones claras y reducción de desperdicio técnico.
   - *Soberanía digital:* Privacidad, seguridad y preferencia por soluciones auditables y open source.
   - *Equilibrio y pragmatismo:* Evitar la sobreingeniería, agilidad en equipo y entrega de valor.

---

## 3. Verification Criteria
- [ ] `npm run check` passes with 0 TypeScript errors.
- [ ] `cvData` exports valid typed collections.
