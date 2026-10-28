# Task 16.1: SSOT Data Architecture: Enriched Education, Personal Traits & Engineering Philosophy

**Status:** Pending  
**Objective:** Model schema interfaces in `src/types/resume.ts` and expand structured data in `src/data/cv-data.ts` to enrich education with real syllabus modules and integrate personal traits and engineering philosophy.

---

## 1. Schema Extensions (`src/types/resume.ts`)

1. **Education Interface:**
   - Keep `institution`, `degree`, `period`, `grade`, `details`, `documentUrl`.
   - Optionally add `competencies?: string[]` or preserve rich `details?: string[]` bullets.
2. **Personal Traits & Hobbies:**
   ```typescript
   export interface PersonalTrait {
     id: string;
     title: string;
     description: string;
     category?: 'virtud' | 'habito' | 'interes';
   }
   ```
3. **Engineering Philosophy:**
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
4. **ResumeData Union:**
   - Add `personalTraits?: PersonalTrait[];`
   - Add `engineeringPhilosophy?: EngineeringPhilosophy;`

---

## 2. Data Population in `src/data/cv-data.ts`

1. **CFGS DAM (Desarrollo de Aplicaciones Multiplataforma):**
   - *Rendimiento:* Nota media 1º curso: 9,2 / 10.
   - *Detalles ampliados:*
     - Programación Orientada a Objetos avanzada en Java (colecciones, streams, patrones de diseño) y persistencia relacional SQL (MariaDB, SQLite, JDBC).
     - Desarrollo de interfaces de usuario multiplataforma y entornos de trabajo reproducibles con Git.
2. **CFGM SMR (Sistemas Microinformáticos y Redes):**
   - *Rendimiento:* Nota media final: 8,7 / 10.
   - *Detalles ampliados:*
     - Administración de sistemas operativos Linux y Windows Server, virtualización y configuración de servicios de red (DNS, DHCP, SSH, VPN).
     - Seguridad perimetral, diagnóstico de hardware y despliegue automatizado de sistemas.
3. **Personal Traits (para el CV):**
   - *Organización y rigor:* Metodología estructurada, documentación clara y entornos limpios.
   - *Disciplina y constancia:* Hábitos de superación y enfoque continuado en la entrega.
   - *Deporte y resistencia mental:* Tenis de competición amateur, entrenamiento de fuerza y running.
   - *Lectura analítica:* Novela de misterio, policiaca y ensayo orientados a la deducción y la concentración.
4. **Engineering Philosophy (para la Web):**
   - Principios técnicos fundamentales y equilibrio pragmático.

---

## 3. Verification Criteria
- [ ] `npm run check` passes with 0 errors.
- [ ] Data exported cleanly without `any` types.
