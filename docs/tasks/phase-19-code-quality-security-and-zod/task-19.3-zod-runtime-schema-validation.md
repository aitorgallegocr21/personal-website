# Task 19.3: Esquemas Zod y Validación de Datos SSOT

**Status:** Planned  
**Scope:** `package.json`, `src/schemas/resume.schema.ts`, `tests/unit/schema-validation.test.ts`

---

## 1. Objetivo Técnico
Complementar el tipado estático de TypeScript con validación runtime estricta mediante Zod para garantizar que el archivo `cv-data.ts` nunca contenga errores tipográficos en correos, fechas que no sigan el estándar ISO `YYYY-MM-DD`, URLs rotas o campos obligatorios faltantes.

---

## 2. Especificación Detallada

1. **Instalación de Zod:**
   - Añadir `zod` a dependencias del proyecto.
2. **Definición de Esquemas (`src/schemas/resume.schema.ts`):**
   - `PersonalInfoSchema`: validación de nombre, título, email, fecha de nacimiento ISO, redes sociales.
   - `AboutSchema`: validación de resúmenes biográficos cortos y extensos.
   - `SkillCategorySchema`: categorías de competencias y niveles.
   - `ProjectSchema`: títulos, resúmenes, tecnologías empleadas y enlaces de demostración/código.
   - `ExperienceSchema` y `EducationSchema`: periodos de tiempo, instituciones y descriptores clave.
   - `ResumeDataSchema`: ensamblado maestro del esquema completo.
3. **Test Unitario de Validación Continua (`tests/unit/schema-validation.test.ts`):**
   - Ejecuta `ResumeDataSchema.parse(cvData)` dentro de la suite de Vitest.
   - Si se añade un dato erróneo al SSOT en el futuro, el test fallará inmediatamente indicando con precisión la clave y la línea afectada antes de llegar a producción.

---

## 3. Verificación
```bash
npm run test
npm run check
```
