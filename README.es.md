# Portfolio & Generador Automatizado de CV (SSOT)

> 🌐 **Idioma:** [Read in English](README.md) | Español

Sitio web personal y generador automatizado de currículum vitae en formato PDF de una sola página, construido con **Astro**, **TypeScript** y **Tailwind CSS**, diseñado bajo una arquitectura estricta de **Fuente Única de Verdad (Single Source of Truth - SSOT)**.

---

## Características Principales

- **Fuente Única de Verdad (SSOT):** Todos los datos biográficos, experiencia, proyectos, habilidades técnicas y formación académica residen en `src/data/cv-data.ts`. Tanto la web interactiva como el CV descargable leen el mismo conjunto de datos tipado.
- **Cero JavaScript en el Cliente:** Generación estática pura (SSG) sin descarga de frameworks en tiempo de ejecución (0 KB JS), obteniendo la máxima velocidad de carga y puntuación perfecta en Google Lighthouse.
- **Exportación A4 Perfecta a PDF:** Ruta de impresión dedicada (`/cv`) diseñada con reglas CSS `@media print`, márgenes estandarizados y prevención de saltos de línea huérfanos (`break-inside-avoid`) para imprimir o guardar en PDF (`Ctrl + P` / `Cmd + P`).
- **Arquitectura Tipada Estricta:** Comprobación estática integral mediante interfaces de TypeScript, sin uso de tipos laxos como `any`.
- **Desarrollo Guiado por Especificaciones para Agentes:** Normas arquitectónicas, de ahorro de contexto y de commits semánticos consolidadas en `AGENTS.md`.

---

## Stack Tecnológico

- **Framework:** [Astro](https://astro.build/) (Generación de Sitios Estáticos)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/) (Modo Estricto)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
- **Herramientas de Calidad:** Prettier con plugin oficial de Tailwind, `@astrojs/check`
- **Despliegue:** Cloudflare Pages / GitHub Pages

---

## Estructura del Proyecto

```text
.
├── docs/                   # Dossier profesional maestro y backlog de tareas
│   ├── DOSSIER_PROFESIONAL.md
│   └── TASKS.md
├── src/
│   ├── components/         # Componentes modulares Astro
│   │   ├── cv/             # Componentes compactos optimizados para impresión A4
│   │   └── portfolio/      # Componentes interactivos para la web
│   ├── data/
│   │   └── cv-data.ts      # SSOT: Datos profesionales centralizados
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── PrintLayout.astro
│   ├── pages/
│   │   ├── index.astro     # Portfolio interactivo (/)
│   │   └── cv.astro        # Vista imprimible A4 (/cv)
│   ├── styles/             # Estilos globales y reglas de impresión
│   └── types/
│       └── resume.ts       # Esquema TypeScript y contratos de datos
├── public/                 # Assets estáticos y PDF exportado
├── AGENTS.md               # Protocolo y directrices para agentes de IA
├── README.md               # Documentación principal en inglés
└── README.es.md            # Documentación en español
```

---

## Instalación y Uso

### Requisitos Previos

- **Node.js:** Versión 20.x o superior (LTS recomendada)
- **Gestor de paquetes:** `npm`

### Puesta en Marcha

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/portfolio-cv.git
cd portfolio-cv

# Instalar dependencias exactas
npm clean-install
```

### Scripts Disponibles

```bash
# Servidor local de desarrollo (http://localhost:4321)
npm run dev

# Iniciar servidor de desarrollo en segundo plano
astro dev --background

# Validación estricta de tipos en archivos .astro y .ts
npm run check

# Compilar proyecto estático para producción en /dist
npm run build

# Previsualizar localmente la build de producción
npm run preview
```

---

## Rutas y Exportación de Documentos

- **`/`**: Portfolio interactivo con catálogo completo de proyectos, detalles de arquitectura técnica, enlaces a repositorios y trayectoria íntegra.
- **`/cv`**: Vista minimalista maquetada milimétricamente para caber en una hoja A4. Usa el diálogo de impresión del navegador (`Ctrl + P` o `Cmd + P`) y selecciona **"Guardar como PDF"** con gráficos de fondo activados y márgenes predeterminados.

---

## Protocolos de Desarrollo para Agentes

Antes de realizar modificaciones o delegar tareas a agentes de programación, consulta:
- [`AGENTS.md`](AGENTS.md) para conocer las restricciones de diseño, convención de commits y reglas SSOT.
- [`docs/TASKS.md`](docs/TASKS.md) para revisar el backlog activo de trabajo.

---

## Licencia

Este proyecto está bajo la [Licencia MIT](LICENSE).