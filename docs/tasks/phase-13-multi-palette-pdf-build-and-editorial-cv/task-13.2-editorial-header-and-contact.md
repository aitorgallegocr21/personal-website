# Task 13.2: Editorial Header & Contact Column Modernization

**Parent Phase:** [Phase 13: Multi-Palette PDF Build Engine, Editorial CV Architecture & Print Hardening](index.md)  
**Status:** In Progress  

---

## 1. Intent & Scope
Modernize `CVHeader.astro` to adopt a structured rectangular portrait badge, integrate a distinct `// CONTACTO` section header above contact information, align contact items with a missing `Phone` icon, and calibrate `about.cvSummary` for optimal visual balance.

---

## 2. Implementation Steps
1. **Rectangular Avatar Badge:**
   - Change container from `w-[23mm] h-[23mm] rounded-full` to a portrait aspect ratio: `w-[26mm] sm:w-[28mm] h-[33mm] sm:h-[35mm] rounded-xl overflow-hidden`.
   - Maintain `object-cover object-top` to display candidate portrait clearly.
   - Adjust accent ring and border for crisp print fidelity.
2. **Identity & Bio Calibration:**
   - Ensure the name and title remain prominent.
   - Slightly condense `about.cvSummary` in `cv-data.ts` if needed to maintain ~3 lines and prevent vertical expansion against the enlarged portrait badge.
3. **Contact Column `// CONTACTO` Label:**
   - Above the contact list (under the `Web Personal` anchor), add an architectural label:
     ```astro
     <div class="flex items-center gap-1.5 text-[9.5px] font-mono tracking-widest uppercase font-bold text-zinc-400 mb-1">
       <span class="text-[var(--color-accent)]">//</span>
       <span>Contacto</span>
     </div>
     ```
4. **Phone Icon Alignment:**
   - Add `<Phone class="w-3 h-3 text-zinc-400 shrink-0" />` to the phone contact `li` in `CVHeader.astro`, matching `MapPin` and `Mail`.

---

## 3. Verification Criteria
- Avatar displays with a crisp rectangular aspect ratio and rounded corners.
- Contact list displays an aligned `Phone` icon and clean `// Contacto` label.
- Zero visual overlapping with adjacent elements.
