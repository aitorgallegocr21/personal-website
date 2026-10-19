# Phase 7: Interactive Modal Fixes & Navigation Polish

**Status:** In Progress (Active)

## Objective
Resolve critical UI overlay issues on the web portfolio (`/`), specifically fixing the persistent open state of `CertificateModal.astro`, restoring its closing controls (button `X`, backdrop click, Escape key), preventing broken fallback downloads, and validating seamless navigation to the printable CV (`/cv`).

## Tasks Breakdown
- [ ] [7.1 Certificate Modal Display & Control Fixes](task-7.1-certificate-modal-display-and-controls.md) — Fix CSS display clash in `<dialog>`, restore close button `X` and backdrop dismissal, and prevent untriggered downloads.
- [ ] [7.2 Navigation & CV Trigger Verification](task-7.2-cv-navigation-verification.md) — Ensure "Ver CV (PDF A4)" and navbar "CV PDF" cleanly direct to `/cv` without modal interference.
