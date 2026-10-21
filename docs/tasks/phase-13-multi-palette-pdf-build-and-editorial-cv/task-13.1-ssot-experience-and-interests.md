# Task 13.1: Data Schema SSOT & Experience Refactoring

**Parent Phase:** [Phase 13: Multi-Palette PDF Build Engine, Editorial CV Architecture & Print Hardening](index.md)  
**Status:** Completed  
**Completed At:** 2026-10-21  

---

## 1. Intent & Scope
1. Update `src/types/resume.ts` to model optional personal `interests` (or personal development pursuits) under strict typing.
2. In `src/data/cv-data.ts`:
   - Set `featuredInCV: true` on `clases-tenis` under `experience`.
   - Polish bullets for `clases-tenis` to emphasize pedagogy, communication, client commitment, and self-organization.
   - Fix company/location whitespace concatenations in `CVExperience.astro` (e.g. `NTT DATA (Remoto / España)` instead of `NTT DATA(Remoto / España)`).
   - Populate `interests` with authentic data: competitive amateur tennis & eclectic literature reading (crime fiction, novels, etc., excluding computer science books).

---

## 2. Implementation Steps
1. Edit `src/types/resume.ts`:
   ```ts
   export interface InterestItem {
     name: string;
     category?: string;
     description: string;
   }

   export interface ResumeData {
     // ... existing fields
     interests?: InterestItem[];
   }
   ```
2. In `src/data/cv-data.ts`:
   - Activate `clases-tenis`:
     ```ts
     {
       id: "clases-tenis",
       role: "Profesor Particular de Tenis",
       company: "Cuenta propia",
       location: "Herencia, Ciudad Real",
       locationUrl: "https://maps.google.com/?q=Herencia,+Ciudad+Real",
       startDate: "2025-09",
       description: "Enseñanza técnica personalizada y planificación deportiva.",
       bullets: [
         "Planificación técnica y seguimiento individualizado de objetivos para alumnos particulares.",
         "Desarrollo de pedagogía, comunicación asertiva, empatía y adaptabilidad a distintos perfiles.",
       ],
       technologies: ["Planificación", "Pedagogía", "Comunicación"],
       featuredInCV: true,
       category: "complementary",
     }
     ```
   - Add `interests`:
     ```ts
     interests: [
       {
         name: "Tenis de Competición",
         description: "Práctica activa y competición en torneos amateur; enfoque mental, constancia y superación.",
       },
       {
         name: "Lectura & Ficción",
         description: "Lectura asidua de narrativa, novela negra y policiaca como fuente de concentración y desconexión.",
       },
     ],
     ```
3. In `CVExperience.astro`: Ensure a clear space precedes `({exp.location})` so it doesn't fuse with the company name.

---

## 3. Verification Criteria
- `npm run check` passes with 0 TypeScript errors.
- `clases-tenis` renders in the CV view under *Otras Experiencias*.
- No fused company/location strings.
