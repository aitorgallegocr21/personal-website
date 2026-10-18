# Task 5.5: Dedicated Contact Section & Dual Action Triggers

## Objective
Implement a dedicated `#contacto` section in `index.astro` featuring a prominent Bento card with availability status, location badge, direct social links, and a dual-action email button (Open Mail Client + Copy to Clipboard).

## Context & Artifacts
- **Files:** `src/components/portfolio/ContactSection.astro`, `src/pages/index.astro`, `src/components/portfolio/Navbar.astro`
- **SSOT:** Centralized personal data in `cvData.personal`.

## Detailed Requirements
1. **Dedicated Section (`#contacto`):**
   - Positioned clearly before the footer, resolving navbar navigation directly to the card.
   - Clean call-to-action headline (*"¿Hablamos sobre un proyecto o vacante?"*).
2. **Dual Email Actions:**
   - Primary button: `mailto:aitorgallegocr21@gmail.com` with email icon.
   - Secondary button: Instant copy to clipboard with toast/tooltip feedback (*"¡Email copiado!"*).
3. **Location & Professional Socials:**
   - Location chip showing *"Herencia, Ciudad Real (Disponible presencial / remoto)"*.
   - Direct cards/buttons for LinkedIn and GitHub profiles.

## Acceptance Criteria
- [ ] Clicking "Contacto" in Navbar scrolls smoothly to the dedicated contact section.
- [ ] Both email triggers (direct mailto and clipboard copy) work seamlessly.
- [ ] Fully responsive on mobile, tablet, and desktop viewports.
