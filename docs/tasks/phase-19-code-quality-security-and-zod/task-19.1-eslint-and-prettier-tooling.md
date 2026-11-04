# Task 19.1: Configuración de ESLint y Prettier para Astro y TypeScript

**Status:** Completed  
**Scope:** `eslint.config.mjs`, `.prettierrc.mjs`, `.prettierignore`, `package.json`

---

## 1. Objetivo Técnico

Establecer una configuración moderna de ESLint (formato flat config) compatible con Astro, TypeScript y accesibilidad JSX, junto con Prettier y el plugin oficial de Tailwind CSS para el ordenamiento automático de utilidades.

---

## 2. Especificación Detallada

1. **Instalación de Dependencias:**
   - Instalar `eslint`, `eslint-plugin-astro`, `@typescript-eslint/parser`, `@typescript-eslint/eslint-plugin`, `eslint-plugin-jsx-a11y`.
   - Instalar `prettier`, `prettier-plugin-astro`, `prettier-plugin-tailwindcss`.
2. **Configuración de ESLint (`eslint.config.mjs`):**
   - Configuración basada en módulos ESM.
   - Reglas recomendadas para TypeScript y Astro.
   - Reglas de prevención de `console.log` residuales y variables no utilizadas.
3. **Configuración de Prettier (`.prettierrc.mjs`):**
   - Tabulación de 2 espacios, comillas simples, punto y coma obligatorio.
   - Plugins: `prettier-plugin-astro` y `prettier-plugin-tailwindcss`.
4. **Scripts en `package.json`:**
   - `"lint": "eslint ."`
   - `"lint:fix": "eslint . --fix"`
   - `"format": "prettier --check ."`
   - `"format:fix": "prettier --write ."`

---

## 3. Verificación

```bash
npm run lint
npm run format
npm run check
```
