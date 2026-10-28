# Task 16.6: CV Education Header Polish, Grade Placement & Tight Leading

**Status:** Completed  
**Objective:** Refine the education card headers in `CVEducation.astro` to place average grades on the second line beside the institution, tighten line spacing, and maximize vertical room for technical syllabus bullets.

---

## 1. Education Header Restructure (`CVEducation.astro`)
- **Línea 1:** Nombre de la titulación a la izquierda (con deep-link si aplica) y periodo académico a la derecha en tipografía mono (`2025 - 2027 (En curso)` / `2023 - 2025`).
- **Línea 2:** Centro educativo (`IES Juan Bosco`) a la izquierda y **nota media limpia** a la derecha (e.g. `Media: 9,2` y `Media: 8,7`, omitiendo el `/ 10` redundante).
- **Interlineado:** Reducir la separación vertical entre la línea de la titulación y la segunda línea (`leading-tight`, margen superior nulo o mínimo) para evitar saltos excesivos.
- **Bullets explicativos:** Retirar la mención duplicada de la nota media del inicio del bullet point en `cv-data.ts`, destinando el 100% del texto al contenido técnico (Java, POO, SQL, Linux, redes).

---

## 2. Verification Criteria
- [x] Average grades render cleanly on the second line right without line wraps.
- [x] Line-height between line 1 and line 2 is noticeably tight and compact.
- [x] Explanation bullets dedicate all space to technical skills without repetitive grade text.
- [x] `break-inside-avoid` preserved.
