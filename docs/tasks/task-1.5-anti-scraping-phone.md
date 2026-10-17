# Task 1.5: Anti-Scraping Phone Protection

## Objective
Implement client-side anti-scraping obfuscation for phone numbers displayed on the interactive web view, while preserving accessible `tel:` semantic links for the printable CV.

## Context & Defense Mechanisms
- **Target Views:** Web Portfolio (`/`) vs Print View (`/cv`).
- **Scraping Vector:** Automated web crawlers harvesting email and telephone strings from raw HTML.

## Detailed Requirements
1. **Web Component Strategy:**
   - Reverse-text CSS rendering (`[direction:rtl] [unicode-bidi:bidi-override]`) or click-to-reveal button.
   - Prevents naive regex scraping over static HTML source.
2. **Print CV Strategy:**
   - In `/cv` view, render pure semantic `<a href="tel:..." class="text-zinc-700">` so PDF exporters correctly link the number.
3. **Reusable Component:**
   - Create `src/components/ui/PhoneContact.astro` (or utility) supporting both modes.

## Acceptance Criteria
- [x] Obfuscated presentation on web view.
- [x] Clean semantic `tel:` link in print view.
- [x] Unit build verification passing without errors.
