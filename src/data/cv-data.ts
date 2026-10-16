import type { ResumeData } from '../types/resume';

export const cvData: ResumeData = {
  personal: {
    name: "Aitor Gallego-Casilda Romero",
    title: "Desarrollador de Software Junior | Backend & Sistemas",
    email: "aitorgallegocr21@gmail.com",
    phone: "+34 611 04 93 14",
    location: "Herencia, Ciudad Real, España",
    website: "https://tuportfolio.dev", // Reemplazar al desplegar
    github: "https://github.com/aitorgcr", // Ajustar a tu slug real
    linkedin: "https://linkedin.com/in/aitor-gallego-casilda", // Ajustar a tu slug real
  },

  about: {
    shortSummary:
      "Desarrollador de software con base sólida en administración de sistemas (SMR) y especialización en desarrollo multiplataforma (DAM, media 9,2). Enfoque en código limpio, arquitectura estructurada y desarrollo backend con Java. Experiencia en formación técnica en NTT Data y proyectos colaborativos en Python y Angular.",
    fullBio:
      "Estudiante de 2º curso de Desarrollo de Aplicaciones Multiplataforma con formación previa en Sistemas Microinformáticos y Redes. Me apasiona la optimización de código, el diseño de arquitecturas eficientes y la resolución de problemas lógicos. Combino una metodología de trabajo meticulosa y estructurada con capacidad demostrada para aprender y entregar software bajo presión.",
  },

  skills: [
    {
      category: "Lenguajes & Backend",
      skills: ["Java (POO, Streams)", "Python", "SQL", "Spring Boot (Fundamentos)", "REST APIs"],
    },
    {
      category: "Frontend & Web",
      skills: ["TypeScript", "Angular", "Astro", "Tailwind CSS", "JavaScript (ES6+)", "HTML5/CSS3"],
    },
    {
      category: "Bases de Datos",
      skills: ["MariaDB", "SQLite", "Diseño Relacional", "Patrón DAO / JDBC"],
    },
    {
      category: "Sistemas & Herramientas",
      skills: ["Linux / Bash", "Git & GitHub", "Redes & SMR", "VS Code", "Obsidian"],
    },
  ],

  experience: [
    {
      id: "ntt-data",
      role: "Desarrollador Software en Prácticas",
      company: "NTT DATA",
      location: "Remoto / España",
      startDate: "2026-03", // Ajustar fechas exactas si difieren
      endDate: "2026-04",
      description:
        "Programa intensivo de formación técnica avanzada en inglés y desarrollo de software fullstack en equipo.",
      bullets: [
        "Completé más de 120 horas de especialización técnica en inglés (Java avanzado, JUnit/Mockito, Spring Boot, Angular y BBDD).",
        "Diseñé e implementé en equipo un prototipo fullstack con Angular y Spring Boot bajo plazos ajustados, superando los objetivos de entrega.",
        "Fortalecí competencias de comunicación ágil, gestión de emociones y resolución colaborativa de incidencias técnicas.",
      ],
      technologies: ["Java", "Spring Boot", "Angular", "JUnit", "Mockito", "SQL"],
      featuredInCV: true,
    },
    {
      id: "ies-hermogenes",
      role: "Técnico de Sistemas en Prácticas (FCT)",
      company: "IES Hermógenes Rodríguez",
      location: "Herencia, Ciudad Real",
      startDate: "2025-03",
      endDate: "2025-06",
      description: "Administración, despliegue y mantenimiento de infraestructura informática educativa.",
      bullets: [
        "Mantuve y optimicé el parque informático y la infraestructura de red local del centro educativo.",
        "Proporcioné soporte técnico crítico de alta disponibilidad durante las Pruebas de Evaluación de Castilla-La Mancha.",
        "Automaticé y ejecuté el despliegue de imágenes de software en aulas y puestos administrativos.",
      ],
      technologies: ["Linux", "Windows Server", "Redes Locales", "Hardware", "Mantenimiento"],
      featuredInCV: true,
    },
    {
      id: "clases-tenis",
      role: "Profesor Particular de Tenis",
      company: "Cuenta propia",
      location: "Herencia, Ciudad Real",
      startDate: "2025-09",
      description: "Enseñanza técnica personalizada y planificación deportiva.",
      bullets: [
        "Planificación individualizada de sesiones técnicas y seguimiento de objetivos para alumnos particulares.",
        "Desarrollo de habilidades de pedagogía, comunicación asertiva y adaptación a distintos ritmos de aprendizaje.",
      ],
      technologies: ["Planificación", "Pedagogía", "Comunicación"],
      featuredInCV: false, // Se muestra en la web, se oculta en el CV para dar prioridad técnica
    },
    {
      id: "hosteleria",
      role: "Camarero y Servicio de Barra",
      company: "Hostelería Local",
      location: "Herencia, Ciudad Real",
      startDate: "2026-05", // Ajustar rango de meses
      endDate: "2026-08",
      description: "Servicio al cliente y soporte operativo a jornada parcial (40%).",
      bullets: [
        "Gestión ágil de pedidos y resolución de incidencias en picos de alta demanda.",
        "Refuerzo de capacidad de trabajo bajo presión, priorización y coordinación de tareas.",
      ],
      technologies: ["Trabajo bajo presión", "Atención al cliente", "Multitasking"],
      featuredInCV: false, // Visible en web o cartas, omitido en CV técnico A4
    },
  ],

  projects: [
    {
      id: "music-engine",
      title: "Local Music Management Engine",
      summary: "Motor local de descarga y gestión de música en Python con inferencia de preferencias y metadatos ID3.",
      description:
        "Desarrollo open-source de un motor local enfocado en privacidad para catalogación y descarga musical. Autor del ~90% de la lógica de procesamiento del repositorio.",
      bullets: [
        "Desarrollo del 90% de la lógica central en Python: algoritmos de gustos, extracción de letras sincronizadas y tagging ID3.",
        "Implementación de cola dinámica de descargas y streaming desde YouTube Music API con gestión de fallos.",
        "Integración con la API de ListenBrainz para registro analítico de métricas y hábitos de escucha.",
      ],
      technologies: ["Python", "yt-dlp", "ListenBrainz API", "Algoritmia", "Metadatos ID3"],
      repoUrl: "https://github.com/aitorgcr/music-manager",
      featuredInCV: true,
    },
    {
      id: "bookstack",
      title: "Bookstack - Registro de Lecturas",
      summary: "Aplicación web moderna en Angular y Tailwind CSS para organización de bibliotecas y seguimiento de libros.",
      description:
        "Plataforma web enfocada en experiencia de usuario y diseño limpio para registrar y puntuar lecturas en almacenamiento local.",
      bullets: [
        "Diseño modular de componentes desacoplados en Angular con tipado estricto en TypeScript.",
        "Interfaz visual moderna y responsive construida con utilidades avanzadas de Tailwind CSS.",
        "Gestión de estado y persistencia local sin fricción de registros externos.",
      ],
      technologies: ["Angular", "TypeScript", "Tailwind CSS", "HTML5"],
      repoUrl: "https://github.com/aitorgcr/bookstack",
      featuredInCV: true,
    },
    {
      id: "portal-reservas",
      title: "Portal de Reservas Deportivas",
      summary: "Aplicación web interactiva desarrollada en Vanilla JavaScript para reserva de instalaciones municipales.",
      description:
        "Proyecto Intermodular de 1º DAM desarrollado en equipo de 3 personas para informatizar la reserva de instalaciones en Argamasilla de Alba.",
      bullets: [
        "Desarrollo de la lógica interactiva completa con JavaScript moderno (ES6+) sin frameworks externos.",
        "Validación dinámica de disponibilidad y gestión de horarios en frontend.",
        "Coordinación y control de versiones con Git en equipo multidisciplinar.",
      ],
      technologies: ["JavaScript (ES6+)", "HTML5", "CSS3", "Git"],
      repoUrl: "https://github.com/aitorgcr/portal-reservas-argamasilla",
      featuredInCV: false, // Detallado en web
    },
    {
      id: "portfolio-cv-ssot",
      title: "Portfolio Web & Automated CV SSOT",
      summary: "Sitio web de alto rendimiento y generador de CV A4 con Astro, TypeScript y Tailwind CSS.",
      description:
        "Plataforma personal con arquitectura Single Source of Truth para unificar la web y el PDF descargable.",
      bullets: [
        "Cero KB de JavaScript en cliente por defecto, logrando máxima puntuación en rendimiento.",
        "Estilos de impresión CSS `@media print` para exportar un PDF A4 perfecto sin desbordamientos.",
      ],
      technologies: ["Astro", "TypeScript", "Tailwind CSS", "SSOT"],
      repoUrl: "https://github.com/aitorgcr/portfolio-cv",
      featuredInCV: false,
    },
  ],

  education: [
    {
      institution: "IES Juan Bosco (Alcázar de San Juan)",
      degree: "CFGS Desarrollo de Aplicaciones Multiplataforma (DAM)",
      period: "2025 - 2027 (En curso)",
      details: [
        "Nota media de 1º curso: 9,2.",
        "Especialización en desarrollo backend con Java, patrones DAO/MVC y bases de datos relacionales.",
      ],
    },
    {
      institution: "IES Juan Bosco (Alcázar de San Juan)",
      degree: "CFGM Sistemas Microinformáticos y Redes (SMR)",
      period: "2023 - 2025",
      details: [
        "Nota media final: 8,7.",
        "Gestión de servidores, cableado estructurado, redes y seguridad perimetral.",
      ],
    },
  ],

  certificates: [
    // --- ITINERARIO JAVA & BACKEND ---
    {
      id: "java-se-8-programmer",
      title: "Java SE 8 Programmer I & II",
      issuer: "NTT DATA",
      platform: "Percipio",
      category: "Java & Backend",
      hours: "Especialización avanzada",
      summary: "Profundización en Programación Orientada a Objetos, API de colecciones de Java, gestión avanzada de excepciones, hilos y concurrencia básica.",
      skills: ["Java SE 8", "POO", "Colecciones", "Manejo de Excepciones", "Concurrencia"],
      featuredInCV: true,
    },
    {
      id: "java-se-11-lambdas-streams",
      title: "Java SE 11 Programmer: Lambdas y Streams",
      issuer: "NTT DATA",
      platform: "Percipio",
      category: "Java & Backend",
      hours: "Especialización funcional",
      summary: "Programación declarativa y funcional en Java moderno mediante Functional Interfaces, expresiones Lambda y operaciones intermedias/terminales con Stream API.",
      skills: ["Java 11", "Streams API", "Lambdas", "Programación Funcional"],
      featuredInCV: true,
    },
    {
      id: "spring-boot-rest-apis",
      title: "Desarrollo de REST APIs con Spring Boot",
      issuer: "NTT DATA",
      platform: "Percipio",
      category: "Java & Backend",
      hours: "Especialización backend",
      summary: "Diseño y construcción de servicios web RESTful, inyección de dependencias, mapeo de endpoints con controladores Spring MVC y serialización JSON.",
      skills: ["Spring Boot", "REST APIs", "Spring MVC", "Inyección de Dependencias"],
      featuredInCV: true,
    },
    {
      id: "junit-mockito-testing",
      title: "Testing Unitario con JUnit y Mockito",
      issuer: "NTT DATA",
      platform: "Percipio",
      category: "Java & Backend",
      hours: "Calidad de software",
      summary: "Metodologías de testing automatizado, aislamiento de capas con mocks/stubs mediante Mockito y aseguramiento de suites de pruebas con JUnit 5.",
      skills: ["JUnit 5", "Mockito", "Test Unitarios", "Mocks & Stubs"],
      featuredInCV: true,
    },

    // --- ITINERARIO ANGULAR ---
    {
      id: "angular-track",
      title: "Especialización Integral en Angular (v16 a v18)",
      issuer: "NTT DATA",
      platform: "Percipio (9 certificaciones modulares)",
      category: "Frontend",
      hours: "~6 horas lectivas",
      summary: "Formación completa de 9 módulos formativos: fundamentos y arquitectura en Angular 16, transición y nuevas características reactivas en Angular 17 y 18 (Signals, nuevo control flow syntax y componentes Standalone).",
      skills: ["Angular 16-18", "Signals", "Standalone Components", "Control Flow", "TypeScript"],
      featuredInCV: true,
    },

    // --- ITINERARIO BASES DE DATOS ---
    {
      id: "bbdd-advanced-track",
      title: "Bases de Datos Relacionales y NoSQL",
      issuer: "NTT DATA",
      platform: "Percipio (3 certificaciones avanzadas)",
      category: "Bases de Datos",
      hours: "~4.5 horas lectivas",
      summary: "Ciclo intensivo de gestión y diseño de persistencia: modelado de esquemas, sentencias DDL y DML complejas, definición de constraints de integridad referencial y nociones de bases de datos NoSQL.",
      skills: ["SQL", "DDL / DML", "Constraints", "Modelado de Datos", "NoSQL"],
      featuredInCV: true,
    },

    // --- ITINERARIO INTELIGENCIA ARTIFICIAL ---
    {
      id: "prompt-engineering-genai",
      title: "Prompt Engineering with Generative AI Tools",
      issuer: "NTT DATA",
      platform: "Percipio",
      category: "Inteligencia Artificial",
      summary: "Técnicas avanzadas de prompting, diseño de directrices para modelos de lenguaje y aplicación práctica de herramientas de IA Generativa al flujo de desarrollo.",
      skills: ["Prompt Engineering", "GenAI", "LLMs", "Context Optimization"],
      featuredInCV: false, // Visible en web y dossier
    },
    {
      id: "ia-big-school",
      title: "Iniciación al Desarrollo con IA",
      issuer: "BIG School",
      category: "Inteligencia Artificial",
      summary: "Fundamentos de modelos de inteligencia artificial aplicados al desarrollo de software y automatización.",
      skills: ["Inteligencia Artificial", "Automatización"],
      featuredInCV: false,
    },
  ],

  languages: [
    { language: "Español", level: "Nativo" },
    { language: "Inglés", level: "Técnico (B1/B2 - Formación y documentación técnica en inglés)" },
  ],
};