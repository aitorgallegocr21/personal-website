# ⚡ Portfolio & Generador Automatizado de CV (SSOT)

<div align="center">

[![Astro](https://img.shields.io/badge/Astro-5.x-BC52EE?style=flat-square&logo=astro&logoColor=white)](https://astro.build/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x_Strict-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Licencia: MIT](https://img.shields.io/badge/Licencia-MIT-blue.svg?style=flat-square)](LICENSE)
[![CI/CD](https://img.shields.io/badge/GitHub_Actions-Despliegue_Automático-2088FF?style=flat-square&logo=github-actions&logoColor=white)](https://github.com/aitorgallegocr21/personal-website/actions)

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
- **🎨 Theming Dinámico & Rotación Diaria:** 5 paletas de acento (Esmeralda, Sky, Violeta, Rosa, Ámbar) con rotación automática según el día de la semana, selector manual y modo oscuro/claro.
- **🎴 Bento Grid Moderno & Retrato Interactivo:** Tarjeta de perfil con micro-interacción 3D tilt, indicador de disponibilidad en tiempo real y enlaces directos a código/demos.
- **📜 Motor Modal Multi-Documental de Credenciales:** Visor interactivo capaz de navegar entre múltiples PDFs de módulos formativos, descarga individual y descarga en lote secuencial (`Descargar todos`).
- **✨ Micro-interacciones con Acento & Footer Estructurado:** Pie de página responsivo en 3 columnas con indicador dinámico de disponibilidad, bordes con brillo ambiental reactivo a la paleta activa y badges de proyecto sin colisiones.
- **📰 Maquetación Editorial del CV a 2 Columnas:** Diseño editorial para impresión A4 en 2 columnas con insignia destacada hacia el portfolio interactivo, proyectos de software con enlaces a repositorios GitHub, chips compactos de certificación, experiencia complementaria y permiso B/inglés técnico.
- **🖨️ Barra de Impresión A4 Interactiva:** Permite cambiar la paleta cromática en vivo en `/cv` antes de disparar la exportación nativa a PDF.
- **🛡️ Privacidad & Protección Anti-Scraping:** El teléfono se inyecta en tiempo de compilación (`PUBLIC_PHONE`) mediante variables de entorno y se protege contra rastreadores web.

---

## 🌐 Vistas del Proyecto & Rutas

| Ruta | Propósito | Características Clave |
|---|---|---|
| **`/`** | Portfolio Web Interactivo | Bento showcase, enlaces a demos/código, timeline profesional, visor de títulos y diseño totalmente responsivo. |
| **`/cv`** | CV Imprimible / Exportable a PDF | Diseño editorial a 2 columnas, ajuste estricto a 1 página A4, CTA destacado a portfolio web, enlaces a repositorios, selector de color para impresión y estructura semántica legible para ATS. |

---

## 🛠 Stack Tecnológico

- **Framework:** [Astro 5.x](https://astro.build/) (Static Site Generation / SSG)
- **Lenguaje:** [TypeScript 5.x](https://www.typescriptlang.org/) (Modo estricto habilitado)
- **Estilos:** [Tailwind CSS 4.x](https://tailwindcss.com/) con variables nativas CSS
- **Calidad de Código:** [Prettier](https://prettier.io/) con plugin de Tailwind y `@astrojs/check`
- **Despliegue Continuo:** GitHub Pages automatizado vía GitHub Actions (`.github/workflows/deploy.yml`)

---

## 📂 Estructura del Repositorio

```text
.
├── .agents/skills/              # Skills especializadas para trabajo con agentes IA (Antigravity)
├── docs/                        # Documentación técnica completa y especificaciones
│   ├── DESIGN_SYSTEM.md         # Tokens de diseño, paletas y especificaciones de impresión
│   ├── DOSSIER_PROFESIONAL.md   # Historial completo, trayectoria y datos de referencia
│   ├── tasks/                   # Desglose exhaustivo de fases y tareas técnicas
│   └── TASKS.md                 # Índice del backlog activo y roadmap
├── src/
│   ├── components/              # Componentes Astro organizados por dominio
│   │   ├── cv/                  # Componentes compactos optimizados para hoja A4
│   │   └── portfolio/           # Componentes interactivos del portfolio (Hero, Bento, Modal)
│   ├── data/
│   │   └── cv-data.ts           # 🌟 SSOT: Datos profesionales centralizados
│   ├── layouts/
│   │   ├── BaseLayout.astro     # Estructura HTML global, scripts de tema y metadatos
│   │   └── PrintLayout.astro    # Maquetación específica con reglas @page para A4
│   ├── pages/
│   │   ├── index.astro          # Vista del portfolio web (/)
│   │   └── cv.astro             # Vista del CV imprimible (/cv)
│   ├── styles/                  # CSS global, Tailwind y variables de paletas dinámicas
│   ├── types/
│   │   └── resume.ts            # Contratos de datos e interfaces TypeScript
│   └── utils/                   # Utilidades para cálculo dinámico de edad y formato de fechas
├── public/                      # Archivos estáticos servidos en la raíz
│   ├── docs/certificates/       # Certificados en PDF y credenciales académicas
│   ├── images/                  # Fotos de perfil, capturas de proyectos e iconos
│   └── _headers                 # Políticas de caché para producción
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

## 💻 Flujo de Desarrollo & Scripts

| Comando | Acción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo local en `http://localhost:4321`. |
| `astro dev --background` | Arranca el servidor de desarrollo en segundo plano. |
| `npm run check` | Valida tipos TypeScript y diagnóstico en archivos `.astro` sin compilar. |
| `npm run build` | Compila el bundle de producción estático en `/dist` tras verificar tipos. |
| `npm run preview` | Levanta un servidor local para previsualizar el contenido generado en `/dist`. |

---

## 🖨️ Guía de Exportación a PDF / Impresión

Para generar un CV en PDF nítido y optimizado desde la ruta `/cv`:

1. Inicia el servidor (`npm run dev`) o entra a la página desplegada en `/cv`.
2. En la barra superior flotante, elige el acento cromático deseado (*Esmeralda*, *Sky*, *Pizarra*, etc.).
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
- **Cero Ambigüedad:** El estado del proyecto y el backlog activo se consultan y mantienen siempre en [`docs/TASKS.md`](docs/TASKS.md).
- **Auditoría de Documentación:** Tras cualquier tarea que altere arquitectura, props o configuración, evaluar y actualizar la documentación afectada.

---

## 📄 Licencia

Este proyecto es de código abierto y cuenta con la [Licencia MIT](LICENSE).