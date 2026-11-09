# ⚡ Portfolio & Generador Automatizado de CV (SSOT)

<div align="center">

[![CI & Quality Check](https://github.com/aitorgallegocr21/personal-website/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/aitorgallegocr21/personal-website/actions/workflows/ci.yml)
[![Deploy to GitHub Pages](https://github.com/aitorgallegocr21/personal-website/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/aitorgallegocr21/personal-website/actions/workflows/deploy.yml)
[![Astro](https://img.shields.io/badge/Astro-5.x-BC52EE?style=flat-square&logo=astro&logoColor=white)](https://astro.build/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x_Strict-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Playwright](https://img.shields.io/badge/Playwright-E2E_Tests-2EAD33?style=flat-square&logo=playwright&logoColor=white)](https://playwright.dev/)
[![Vitest](https://img.shields.io/badge/Vitest-Unit_Tests-6E9F18?style=flat-square&logo=vitest&logoColor=white)](https://vitest.dev/)
[![Licencia: MIT](https://img.shields.io/badge/Licencia-MIT-blue.svg?style=flat-square)](LICENSE)

<p align="center">
  <strong>Portfolio web de alto rendimiento y generador milimétrico de currículum vitae en PDF A4.</strong><br>
  Construido con Astro, TypeScript en modo estricto y Tailwind CSS bajo una arquitectura de Fuente Única de Verdad (SSOT) sin concesiones.
</p>

<p align="center">
  🇪🇸 <strong>Español</strong> • 🇬🇧 <a href="README.md">Read in English</a>
</p>

</div>

---

## 📑 Tabla de Contenidos

- [Visión General & Arquitectura](#-visión-general--arquitectura)
- [Características Principales](#-características-principales)
- [Vistas del Proyecto & Rutas](#-vistas-del-proyecto--rutas)
- [Stack Tecnológico](#-stack-tecnológico)
- [Estructura del Repositorio](#-estructura-del-repositorio)
- [Puesta en Marcha Rápida](#-puesta-en-marcha-rápida)
- [Flujo de Desarrollo & Scripts](#-flujo-de-desarrollo--scripts)
- [Guía de Exportación a PDF / Impresión](#-guía-de-exportación-a-pdf--impresión)
- [Estándares para Agentes de IA & Desarrolladores](#-estándares-para-agentes-de-ia--desarrolladores)
- [Licencia](#-licencia)

---

## 🏛 Visión General & Arquitectura

Este proyecto da vida de forma simultánea a un portfolio web moderno y a un currículum vitae descargable en PDF maquetado a 1 sola página A4, ambos consumiendo exactamente el mismo conjunto de datos centralizado.

```
                      ┌────────────────────────────────┐
                      │   src/data/cv-data.ts (SSOT)   │
                      │ Tipado estricto con resume.ts  │
                      └──────────────┬─────────────────┘
                                     │
                 ┌───────────────────┴───────────────────┐
                 ▼                                       ▼
    ┌────────────────────────┐              ┌────────────────────────┐
    │     Portfolio Web      │              │    CV Imprimible       │
    │        (/)             │              │        (/cv)           │
    │  - Grid Bento dinámico │              │  - Ajuste exacto a 1 A4│
    │  - Modo Claro/Oscuro   │              │  - Cero desbordamiento │
    │  - Tarjeta 3D Tilt     │              │  - Selector de acento  │
    │  - 0 KB JS innecesario │              │  - PDF nítido y ATS    │
    └────────────────────────┘              └────────────────────────┘
```

### Principios Fundamentales de Diseño

1. **Fuente Única de Verdad (SSOT):** Queda estrictamente prohibido incluir texto biográfico, nombres de empresas, métricas o proyectos hardcodeados en componentes `.astro`. Todo se centraliza en [`src/data/cv-data.ts`](src/data/cv-data.ts).
2. **Tipado Estricto:** Cualquier nueva entidad o campo debe modelarse primero en [`src/types/resume.ts`](src/types/resume.ts) sin admitir `any`.
3. **Rendimiento Web Máximo:** Cero JavaScript innecesario enviado al cliente. La interactividad es puntual y aislada (cambio de tema, visor modal de certificados).
4. **Maquetación Matemática de Impresión:** La ruta `/cv` aprovecha reglas CSS `@page` y contenedores calibrados al milímetro para garantizar 1 hoja A4 física sin elementos huérfanos.

---

## ✨ Características Principales

- **🎯 Datos SSOT Centralizados:** Biografía, catálogo de proyectos, stack tecnológico, experiencia y formación gestionados en un solo lugar.
- **🎨 Theming Dinámico & Rotación Diaria:** Sistema de paletas multi-acento para los 7 días de la semana (Ámbar, Esmeralda, Turquesa, Sky, Pizarra, Violeta, Rosa) con rotación automática viva, selector manual y conmutación modo oscuro/claro.
- **🎭 Motor Arquitectónico Multi-Skin & Selector Visual:** Sistema modular de skins visuales intercambiables (`bento-modern` predeterminado) sobre el mismo SSOT `cvData`, con persistencia en `localStorage`, inicialización zero-FOUC y menú selector interactivo.
- **🎴 Bento Grid Moderno & Retrato Interactivo:** Tarjeta de perfil con micro-interacción 3D tilt, indicador de disponibilidad en tiempo real y enlaces directos a código/demos.
- **🏝️ Navbar Flotante Acoplable & Scroll-Spy Fluido:** Isla de navegación reposicionable en escritorio (>= 1024px) con anclaje magnético a los bordes de la pantalla (Top, Bottom, Left, Right), metamorfosis de layout a riel vertical compacto de iconos (~56px) con tooltips flotantes, reseteo con doble clic, selector rápido de posición y un indicador continuo de scroll-spy con interpolación matemática fluida a 60/120 FPS y atenuación progresiva de iluminación de texto.
- **📜 Motor Modal Multi-Documental & Enlaces Profundos:** Visor móvil a pantalla completa (`h-[100dvh]`), pestañas táctiles con scroll horizontal suave, banner de soporte para PDFs móviles con apertura nativa directa, enlaces URL (`?doc=<id>`), descarga individual y empaquetado en lote `.zip` mediante JSZip.
- **✨ Micro-interacciones con Acento & Footer Estructurado:** Pie de página responsivo en 3 columnas con indicador dinámico de disponibilidad, bordes con brillo ambiental reactivo a la paleta activa y badges de proyecto sin colisiones.
- **📰 Maquetación Editorial del CV a 2 Columnas:** Diseño editorial para impresión A4 en 2 columnas con insignia destacada hacia el portfolio interactivo, educación reglada (DAM con media 9,2 y SMR con 8,7) en cabecera principal, proyectos de software con enlaces a repositorios GitHub, certificaciones clave, bloque de aspectos personales & virtudes humanas (organización, tenis de competición, lectura), e idiomas/permiso B.
- **🧠 Filosofía de Ingeniería & Enfoque de Trabajo:** Sección dedicada en el portfolio web que refleja el criterio técnico, el dominio de fundamentos sin cajas negras y el equilibrio pragmático orientado a evitar la sobreingeniería y maximizar la entrega de valor.
- **🖨️ Motor Headless de PDFs Multi-Paleta & Barra Dual de Impresión:** Compilación automatizada en build de PDFs A4 deterministas para las 8 paletas de color (7 días + monocromo) con Chromium headless, descarga directa en 1 clic y modal accesible de recomendación de formato para impresión.
- **📐 Retrato Editorial & Columna de Contacto:** Insignia de retrato rectangular en proporción nativa, encabezado estructurado `// CONTACTO` con icono telefónico alineado e insignias de contacto optimizadas con defensa anti-scraping.
- **🔍 Schema.org Enriquecido & SEO Automatizado:** Datos estructurados JSON-LD (`Person` y `ProfilePage`), `sitemap-index.xml` autogenerado con `@astrojs/sitemap`, directivas para motores de búsqueda en `robots.txt` y tarjeta social Open Graph dedicada de 1200x630 para compartir en redes.
- **🖼️ Pipeline Nativo de Optimización de Assets:** Uso del componente nativo `<Image />` de Astro potenciado por Sharp, transcodificando capturas y retratos a WebP sin Cumulative Layout Shift (CLS) y reduciendo el peso de imágenes en un 97%.
- **🧪 Suite Completa de Pruebas (Unitarias & E2E):** 87 tests unitarios con Vitest (integridad SSOT, cálculo de fechas, esquemas Zod, estado de skins, motor de scroll-spy, gestor de dock, schema-org, portapapeles) junto a 19 tests End-to-End en navegador real con Playwright automatizados en GitHub Actions CI con resolución elástica de Chromium.
- **🛡️ Privacidad & Protección Anti-Scraping:** El teléfono se inyecta en tiempo de compilación (`PUBLIC_PHONE`) mediante variables de entorno y se protege contra rastreadores web.

---

## 🌐 Vistas del Proyecto & Rutas

| Ruta      | Propósito                        | Características Clave                                                                                                                                                                          |
| --------- | -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`/`**   | Portfolio Web Interactivo        | Bento showcase, enlaces a demos/código, timeline profesional, visor de títulos y diseño totalmente responsivo.                                                                                 |
| **`/cv`** | CV Imprimible / Exportable a PDF | Diseño editorial a 2 columnas, ajuste estricto a 1 página A4, CTA destacado a portfolio web, enlaces a repositorios, selector de color para impresión y estructura semántica legible para ATS. |

---

## 🛠 Stack Tecnológico

- **Framework:** [Astro 5.x](https://astro.build/) (Static Site Generation / SSG)
- **Lenguaje:** [TypeScript 5.x](https://www.typescriptlang.org/) (Modo estricto habilitado)
- **Estilos:** [Tailwind CSS 4.x](https://tailwindcss.com/) con variables nativas CSS
- **Validación Runtime:** [Zod](https://zod.dev/) para verificación estricta de esquemas de datos
- **Calidad de Código & Formateo:** ESLint (Flat Config), Prettier con plugin de Tailwind y `@astrojs/check`
- **Testing & Calibración:** Vitest (87 tests unitarios), Playwright (19 tests E2E y verificación A4 de impresión)
- **Motor de PDFs & Assets:** Puppeteer Core (compilación Chromium headless de PDFs A4), Sharp (optimización WebP) y JSZip
- **SEO & Indexación:** `@astrojs/sitemap` (sitemap automatizado) y metadatos Schema.org JSON-LD
- **Despliegue Continuo:** GitHub Pages automatizado vía GitHub Actions (`.github/workflows/deploy.yml`)

---

## 📂 Estructura del Repositorio

```text
.
├── .agents/skills/              # Skills especializadas para agentes IA (Antigravity workflows)
├── .github/                     # Workflows CI/CD de GitHub Actions y plantillas de PR/Issues
├── docs/                        # Documentación técnica completa y especificaciones
│   ├── DESIGN_SYSTEM.md         # Tokens de diseño, paletas y especificaciones de impresión
│   ├── DOSSIER_PROFESIONAL.md   # Historial completo, trayectoria y datos de referencia
│   ├── tasks/                   # Desglose exhaustivo de fases y tareas técnicas (Fases 0 a 24)
│   └── TASKS.md                 # Índice del backlog activo y roadmap
├── public/                      # Archivos estáticos servidos en la raíz
│   ├── cv/                      # PDFs A4 precompilados en 8 paletas de color
│   ├── docs/certificates/       # Certificados en PDF y credenciales académicas
│   ├── images/                  # Fotos de perfil, capturas de proyectos y banner OG
│   └── _headers                 # Políticas de caché para producción
├── scripts/                     # Scripts de automatización (generación PDF, OG image, entorno)
├── src/
│   ├── assets/                  # Imágenes optimizadas por el pipeline de astro:assets
│   ├── components/              # Componentes Astro organizados por dominio
│   │   ├── cv/                  # Componentes compactos optimizados para hoja A4
│   │   ├── portfolio/           # Componentes interactivos (Hero, Bento, Modal, Navbar Dock)
│   │   ├── seo/                 # Datos estructurados (JsonLd.astro)
│   │   ├── skins/               # Arquitectura multi-skin visual (bento-modern, registry)
│   │   └── ui/                  # Componentes UI compartidos (PhoneContact.astro)
│   ├── data/
│   │   └── cv-data.ts           # 🌟 SSOT: Datos profesionales centralizados
│   ├── layouts/
│   │   ├── BaseLayout.astro     # Estructura HTML global, scripts de tema y metadatos
│   │   └── PrintLayout.astro    # Maquetación específica con reglas @page para A4
│   ├── lib/                     # Lógica cliente desacoplada (dock, scrollspy, theme, modal, skin)
│   ├── pages/
│   │   ├── index.astro          # Vista del portfolio web (/)
│   │   └── cv.astro             # Vista del CV imprimible (/cv)
│   ├── schemas/
│   │   └── resume.schema.ts     # Esquemas runtime Zod para validación de cvData
│   ├── styles/                  # CSS global, Tailwind y variables de paletas dinámicas
│   ├── types/                  # Contratos de datos e interfaces TypeScript (resume.ts, skin.ts)
│   └── utils/                   # Utilidades para cálculo dinámico de edad y formato de fechas
├── tests/
│   ├── e2e/                     # Especificaciones de pruebas End-to-End con Playwright
│   └── unit/                    # Suites de pruebas unitarias con Vitest (87 tests)
├── AGENTS.md                    # Protocolo inviolable para agentes IA, flujo y commits
├── README.md                    # Documentación en inglés
└── README.es.md                 # Documentación en español (este archivo)
```

---

## 🚀 Puesta en Marcha Rápida

### Requisitos Previos

- **Node.js:** `v20.x` o superior (versión LTS recomendada)
- **Gestor de paquetes:** `npm` (v10+ recomendado)

### Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/aitorgallegocr21/personal-website.git
cd personal-website

# 2. Instalar dependencias exactas
npm clean-install

# 3. Configurar variables de entorno opcionales
cp .env.example .env
```

> **Nota:** En `.env` puedes definir `PUBLIC_PHONE="+34 600 00 00 00"`. Si no se define, el campo de teléfono se omitirá limpiamente sin generar fallos en la compilación.

---

## 🌿 Modelo de Ramas Git & Integración

El proyecto sigue una estrategia estricta y limpia de dos ramas:

- **`main` (Producción):** Rama protegida de despliegue y producción. Siempre estable y sincronizada con el sitio en vivo en GitHub Pages.
- **`develop` (Desarrollo Activo):** Rama principal de integración. Todo desarrollo activo, ramas de características (`feat/...`), correcciones (`fix/...`) y documentación (`docs/...`) se originan y fusionan hacia `develop`. Una vez verificado el ciclo de calidad, `develop` se fusiona hacia `main`.

---

## 💻 Flujo de Desarrollo & Scripts

| Comando                  | Acción                                                                                                                      |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| `npm run verify`         | Puerta de calidad completa y determinista (`check` + `lint` + `format` + `test` + `build`).                                 |
| `npm run verify:fast`    | Puerta de calidad rápida (`check` + `lint` + `format` + `test`).                                                            |
| `npm run dev`            | Inicia el servidor de desarrollo local en `http://localhost:4321`.                                                          |
| `astro dev --background` | Arranca el servidor de desarrollo en segundo plano.                                                                         |
| `npm run check`          | Valida tipos TypeScript y diagnóstico en archivos `.astro` sin compilar.                                                    |
| `npm run lint`           | Ejecuta ESLint (flat config) validando reglas TypeScript, Astro y accesibilidad JSX.                                        |
| `npm run format`         | Verifica el formateo del código con Prettier y ordenamiento de clases Tailwind CSS (`npm run format:fix` para corregir).    |
| `npm test`               | Ejecuta la suite de pruebas unitarias con Vitest (87 tests cubriendo SSOT, fechas, temas, gestor de dock, scrollspy y Zod). |
| `npm run test:e2e`       | Ejecuta la suite de pruebas End-to-End con Playwright (19 tests verificando interacciones y contención A4).                 |
| `npm run build`          | Compila el bundle de producción estático en `/dist` tras verificar tipos y compilar PDFs headless.                          |
| `npm run build:pdf`      | Genera los PDFs A4 deterministas para las 8 paletas de color con Chromium headless.                                         |
| `npm run build:og`       | Genera la tarjeta Open Graph de 1200x630 para compartir en redes sociales.                                                  |
| `npm run preview`        | Levanta un servidor local para previsualizar el contenido generado en `/dist`.                                              |

---

## 🖨️ Guía de Exportación a PDF / Impresión

Para generar un CV en PDF nítido y optimizado desde la ruta `/cv`:

1. Inicia el servidor (`npm run dev`) o entra a la página desplegada en `/cv`.
2. En la barra superior flotante, elige el acento cromático deseado (_Esmeralda_, _Sky_, _Pizarra_, etc.).
3. Abre el cuadro de diálogo de impresión del navegador:
   - **Atajo:** `Ctrl + P` (Windows/Linux) o `Cmd + P` (macOS).
4. Configura los siguientes parámetros en la ventana de impresión:
   - **Destino:** Guardar como PDF
   - **Tamaño de papel:** A4
   - **Márgenes:** Predeterminados (el diseño define internamente `@page { margin: 10mm 12mm }`)
   - **Opciones:** Marcar **"Gráficos de fondo"** (necesario para insignias y detalles de color)
   - **Escala:** 100% (Predeterminada)

---

## 🤖 Estándares para Agentes de IA & Desarrolladores

Cualquier agente de programación o colaborador debe respetar las directrices del proyecto:

- **Seguir [AGENTS.md](AGENTS.md):** Cumplir estrictamente el ciclo de 5 pasos (`Spec` ➔ `Code` ➔ `npm run build` ➔ `Sincronización de Docs` ➔ `Commit Semántico`).
- **Nunca hardcodear datos estáticos:** Cualquier dato debe agregarse a `src/data/cv-data.ts` y estar respaldado por tipos en `src/types/resume.ts`.
- **Regla Inviolable de Sincronización de Documentación (Cero Pérdida de Contexto):** En **CADA** cambio realizado en el código, arquitectura, esquemas, componentes, estilos o scripts, la documentación correspondiente (`docs/TASKS.md`, `docs/tasks/`, `docs/DESIGN_SYSTEM.md`, `README.md`, `README.es.md` y/o `AGENTS.md`) DEBE ser actualizada de inmediato en la misma iteración. Ningún cambio o Pull Request se considera finalizado sin su documentación sincronizada.
- **Cero Ambigüedad:** El estado del proyecto y el backlog activo se consultan y mantienen siempre en [`docs/TASKS.md`](docs/TASKS.md).
- **Puerta de Calidad & Mobile-First:** Ejecutar siempre `npm run verify:fast` o `npm run check` y verificar la visualización móvil en 375px antes de proponer cambios.

---

## 📄 Licencia

Este proyecto es de código abierto y cuenta con la [Licencia MIT](LICENSE).
