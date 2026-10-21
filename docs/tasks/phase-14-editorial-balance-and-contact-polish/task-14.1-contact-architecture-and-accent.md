# Task 14.1: Contact Section Architecture & Visual Accent

**Parent Phase:** [Phase 14: Editorial Balance, Contact Architecture & Symmetrical Bottom Rhythm](index.md)  
**Status:** Completed  

---

## 1. Intent & Scope
Modernize the right header contact block in `CVHeader.astro`:
1. Make `// CONTACTO` visually vibrant by styling the text directly with `text-[var(--color-accent)]`.
2. Ensure phone rendering is restored by creating a local `.env` file with `PUBLIC_PHONE` (as documented in `.env.example`).
3. Display GitHub and LinkedIn links vertically (one below the other) in separate `<li>` elements, consistent with the rest of the contact items.

---

## 2. Implementation Steps
1. In `CVHeader.astro`:
   - Update `// CONTACTO` container:
     ```astro
     <div class="flex items-center gap-1.5 text-[10px] font-mono tracking-widest uppercase font-bold text-[var(--color-accent)] mb-1">
       <span class="opacity-70">//</span>
       <span>Contacto</span>
     </div>
     ```
   - Split GitHub and LinkedIn from a combined `<li>` into two distinct `<li>` elements:
     ```astro
     {
       personal.github && (
         <li class="inline-flex items-center gap-1.5">
           <Github class="w-3 h-3 text-zinc-400 shrink-0" />
           <a href={personal.github} target="_blank" rel="noopener noreferrer" class="hover:text-zinc-900 hover:underline">
             GitHub ↗
           </a>
         </li>
       )
     }
     {
       personal.linkedin && (
         <li class="inline-flex items-center gap-1.5">
           <Linkedin class="w-3 h-3 text-zinc-400 shrink-0" />
           <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" class="hover:text-zinc-900 hover:underline">
             LinkedIn ↗
           </a>
         </li>
       )
     }
     ```
2. Create local `.env` with `PUBLIC_PHONE="+34 600 00 00 00"` (or user phone) so `import.meta.env.PUBLIC_PHONE` is hydrated during build and preview without exposing sensitive info to git.

---

## 3. Verification Criteria
- `// CONTACTO` renders in the active palette color.
- Phone number is visible in web and print views.
- GitHub and LinkedIn appear stacked vertically in line.
