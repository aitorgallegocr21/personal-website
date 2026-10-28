import type { ResumeData } from '@/types/resume';

export const cvData: ResumeData = {
  personal: {
    name: "Aitor Gallego-Casilda Romero",
    title: "Desarrollador de Software Junior | Backend & Sistemas",
    email: "aitorgallegocr21@gmail.com",
    phone: import.meta.env.PUBLIC_PHONE || undefined,
    location: "Herencia, Ciudad Real, España",
    website: "https://aitorgallegocr21.github.io/personal-website",
    github: "https://github.com/aitorgallegocr21",
    linkedin: "https://www.linkedin.com/in/aitor-gallego-casilda-romero-7260ba3a1",
    birthDate: "2007-02-21",
    avatarUrl: "/images/avatar.webp",
    status: "Disponible",
    driverLicense: "Permiso B y vehículo propio",
  },

  about: {
    shortSummary:
      "Desarrollador de software con base sólida en administración de sistemas (SMR) y especialización en desarrollo multiplataforma (DAM) con rendimiento académico destacado. Enfoque en código limpio, arquitectura estructurada y desarrollo backend con Java. Experiencia en formación técnica en NTT Data y proyectos colaborativos en Python y Angular.",
    cvSummary:
      "Desarrollador de software con base en sistemas (SMR) y especialización en backend con Java y DAM. Formación técnica en NTT DATA y proyectos en Python y Angular. Enfoque riguroso en código limpio, arquitecturas modulares y resolución analítica.",
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
      locationUrl: "https://www.google.com/maps/search/NTT+DATA+Spain",
      startDate: "2026-03",
      endDate: "2026-04",
      description:
        "Programa intensivo de formación técnica avanzada en inglés y desarrollo de software fullstack en equipo.",
      bullets: [
        "Especialización técnica de +120h en inglés: Java avanzado, JUnit/Mockito, Spring Boot y SQL.",
        "Desarrollo colaborativo de prototipo fullstack (Angular + Spring Boot) cumpliendo hitos ágiles.",
      ],
      technologies: ["Java", "Spring Boot", "Angular", "JUnit", "SQL"],
      featuredInCV: true,
      category: "tech",
    },
    {
      id: "ies-hermogenes",
      role: "Técnico de Sistemas en Prácticas (FCT)",
      company: "IES Hermógenes Rodríguez",
      location: "Herencia, Ciudad Real",
      locationUrl: "https://maps.google.com/?q=IES+Hermogenes+Rodriguez+Herencia",
      startDate: "2025-03",
      endDate: "2025-06",
      description: "Administración, despliegue y mantenimiento de infraestructura informática educativa.",
      bullets: [
        "Mantenimiento preventivo del parque informático, redes locales y despliegue de software.",
        "Soporte técnico de alta disponibilidad en pruebas de evaluación oficiales.",
      ],
      technologies: ["Linux", "Windows Server", "Redes Locales", "Hardware"],
      featuredInCV: true,
      category: "tech",
    },
    {
      id: "clases-tenis",
      role: "Profesor Particular de Tenis",
      company: "Cuenta propia",
      location: "Herencia, Ciudad Real",
      locationUrl: "https://maps.google.com/?q=Herencia,+Ciudad+Real",
      startDate: "2025-09",
      description: "Enseñanza técnica personalizada y planificación deportiva.",
      bullets: [
        "Planificación técnica individualizada, comunicación asertiva y pedagogía adaptada a diferentes perfiles.",
      ],
      technologies: ["Planificación", "Pedagogía", "Comunicación"],
      featuredInCV: true,
      category: "complementary",
    },
    {
      id: "hosteleria",
      role: "Camarero y Servicio de Barra",
      company: "Hostelería Local",
      location: "Arenas de San Juan, Ciudad Real",
      locationUrl: "https://maps.google.com/?q=Arenas+de+San+Juan,+Ciudad+Real",
      startDate: "2026-05",
      endDate: "2026-08",
      description: "Servicio al cliente y soporte operativo a jornada parcial (40%).",
      bullets: [
        "Atención ágil en picos de alta demanda, trabajo en equipo bajo presión y resolución de incidencias.",
      ],
      technologies: ["Trabajo bajo presión", "Atención al cliente", "Multitasking"],
      featuredInCV: true,
      category: "complementary",
    },
  ],

  projects: [
    {
      id: "music-engine",
      title: "Music Engine — The Autonomous Musical Conveyor Belt",
      summary: "Motor local de descarga y gestión de música en Python con inferencia de preferencias y metadatos ID3.",
      description:
        "Desarrollo open-source de un motor local enfocado en privacidad para catalogación y descarga musical. Autor del ~90% de la lógica de procesamiento del repositorio.",
      bullets: [
        "Desarrollo del 90% de la lógica central en Python: metadatos ID3, letras y preferencias.",
        "Cola dinámica de descargas y streaming vía YouTube Music API con gestión de excepciones.",
      ],
      technologies: ["Python", "yt-dlp", "ListenBrainz API", "Metadatos ID3"],
      repoUrl: "https://github.com/jorgefernandezmc-cpu/Music_Engine",
      isCurrentProject: false,
      featuredInCV: true,
    },
    {
      id: "bookstack",
      title: "Bookstack",
      summary: "Aplicación web moderna en Angular y Tailwind CSS para organización de bibliotecas y seguimiento de lecturas.",
      description:
        "Plataforma web enfocada en experiencia de usuario y diseño limpio para registrar y puntuar lecturas en almacenamiento local.",
      bullets: [
        "Arquitectura modular desacoplada en Angular con tipado estricto en TypeScript.",
        "Interfaz interactiva y responsive con utilidades modernas de Tailwind CSS.",
      ],
      technologies: ["Angular", "TypeScript", "Tailwind CSS"],
      repoUrl: "https://github.com/aitorgallegocr21/bookstack",
      liveUrl: "https://aitorgallegocr21.github.io/bookstack/",
      image: "/images/projects/bookstack.png",
      isCurrentProject: false,
      featuredInCV: true,
    },
    {
      id: "portal-reservas",
      title: "Sistema de Gestión y Reservas - Argamasilla de Alba",
      summary: "Aplicación web interactiva desarrollada en Vanilla JavaScript para reserva de instalaciones municipales.",
      description:
        "Proyecto Intermodular de 1º DAM desarrollado en equipo de 3 personas para informatizar la reserva de instalaciones en Argamasilla de Alba.",
      bullets: [
        "Lógica interactiva integral con JavaScript ES6+ y manipulación eficiente del DOM.",
        "Validación de disponibilidad y control de versiones con Git en equipo.",
      ],
      technologies: ["JavaScript (ES6+)", "HTML5", "CSS3", "Git"],
      repoUrl: "https://github.com/aitorgallegocr21/reservas_instalaciones",
      liveUrl: "https://aitorgallegocr21.github.io/reservas_instalaciones/",
      image: "/images/projects/reservas_instalaciones.png",
      isCurrentProject: false,
      featuredInCV: true,
    },
    {
      id: "portfolio-cv-ssot",
      title: "Portfolio & Automated Resume (SSOT)",
      summary: "Sitio web de alto rendimiento y generador de CV A4 con Astro, TypeScript y Tailwind CSS.",
      description:
        "Plataforma personal con arquitectura Single Source of Truth para unificar la web y el PDF descargable.",
      bullets: [
        "Cero KB de JavaScript en cliente por defecto, logrando máxima puntuación en rendimiento.",
        "Estilos de impresión CSS `@media print` para exportar un PDF A4 perfecto sin desbordamientos.",
      ],
      technologies: ["Astro", "TypeScript", "Tailwind CSS", "SSOT"],
      repoUrl: "https://github.com/aitorgallegocr21/personal-website",
      liveUrl: "https://aitorgallegocr21.github.io/personal-website",
      isCurrentProject: true,
      featuredInCV: false,
    },
  ],

  education: [
    {
      institution: "IES Juan Bosco (Alcázar de San Juan)",
      degree: "CFGS Desarrollo de Aplicaciones Multiplataforma (DAM)",
      period: "2025 - 2027 (En curso)",
      grade: "Media 1º curso: 9,2",
      details: [
        "Nota media (1º curso): 9,2 / 10 · Especialización en backend Java, POO avanzada, colecciones y persistencia relacional SQL.",
        "Desarrollo de interfaces de usuario multiplataforma, modularidad y control de versiones profesional con Git.",
      ],
    },
    {
      institution: "IES Juan Bosco (Alcázar de San Juan)",
      degree: "CFGM Sistemas Microinformáticos y Redes (SMR)",
      period: "2023 - 2025",
      grade: "Media final: 8,7",
      details: [
        "Nota media final: 8,7 / 10 · Administración de servidores Linux y Windows Server, servicios de red (DNS, DHCP, SSH, VPN) y seguridad.",
        "Diagnóstico y mantenimiento de infraestructura de hardware y despliegue automatizado de sistemas.",
      ],
      documentUrl: "/docs/certificates/gm-smr/CertificadoSupletorioProvisional_L.O.E._Titulo_Sistemas_Microinformaticos_y_Redes.pdf",
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
      documentUrl: "/docs/certificates/nttdata/Java/1Z0-808 - Java SE 8 Programmer I/1Z0-808_ Java SE 8 Programmer I.pdf",
      documents: [
        {
          title: "1Z0-808: Java SE 8 Programmer I (Diploma)",
          url: "/docs/certificates/nttdata/Java/1Z0-808 - Java SE 8 Programmer I/1Z0-808_ Java SE 8 Programmer I.pdf",
          type: "main",
        },
        {
          title: "Fundamentos: Introduction to Java",
          url: "/docs/certificates/nttdata/Java/1Z0-808 - Java SE 8 Programmer I/Certificados de Contenidos/Fundamentos de Java y Tipos de Datos/Introduction to Java.pdf",
          type: "module",
        },
        {
          title: "Fundamentos: Classes, Data Types & RegEx",
          url: "/docs/certificates/nttdata/Java/1Z0-808 - Java SE 8 Programmer I/Certificados de Contenidos/Fundamentos de Java y Tipos de Datos/Classes, Data Types & Regular Expressions.pdf",
          type: "module",
        },
        {
          title: "Fundamentos: Conditions & Arrays",
          url: "/docs/certificates/nttdata/Java/1Z0-808 - Java SE 8 Programmer I/Certificados de Contenidos/Fundamentos de Java y Tipos de Datos/Conditions & Arrays.pdf",
          type: "module",
        },
        {
          title: "Fundamentos: Working with Variables",
          url: "/docs/certificates/nttdata/Java/1Z0-808 - Java SE 8 Programmer I/Certificados de Contenidos/Fundamentos de Java y Tipos de Datos/Working with Variables.pdf",
          type: "module",
        },
        {
          title: "Fundamentos: Classes & Objects",
          url: "/docs/certificates/nttdata/Java/1Z0-808 - Java SE 8 Programmer I/Certificados de Contenidos/Fundamentos de Java y Tipos de Datos/Classes & Objects.pdf",
          type: "module",
        },
        {
          title: "Métodos: Encapsulation & Constructors",
          url: "/docs/certificates/nttdata/Java/1Z0-808 - Java SE 8 Programmer I/Certificados de Contenidos/Métodos, Operadores y Constructores/Encapsulation & Overloaded Constructors.pdf",
          type: "module",
        },
        {
          title: "Métodos: Operators & Conditionals",
          url: "/docs/certificates/nttdata/Java/1Z0-808 - Java SE 8 Programmer I/Certificados de Contenidos/Métodos, Operadores y Constructores/Operators & Conditionals.pdf",
          type: "module",
        },
        {
          title: "Métodos: Data Manipulation",
          url: "/docs/certificates/nttdata/Java/1Z0-808 - Java SE 8 Programmer I/Certificados de Contenidos/Métodos, Operadores y Constructores/Data Manipulation.pdf",
          type: "module",
        },
        {
          title: "Herencia: Working with Exceptions",
          url: "/docs/certificates/nttdata/Java/1Z0-808 - Java SE 8 Programmer I/Certificados de Contenidos/Herencia, Excepciones y Mejoras/Working with Exceptions.pdf",
          type: "module",
        },
        {
          title: "Herencia: Working with Interfaces",
          url: "/docs/certificates/nttdata/Java/1Z0-808 - Java SE 8 Programmer I/Certificados de Contenidos/Herencia, Excepciones y Mejoras/Working with Interfaces.pdf",
          type: "module",
        },
        {
          title: "Herencia: Working with Inheritance",
          url: "/docs/certificates/nttdata/Java/1Z0-808 - Java SE 8 Programmer I/Certificados de Contenidos/Herencia, Excepciones y Mejoras/Working with Inheritance.pdf",
          type: "module",
        },
      ],
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
      documentUrl: "/docs/certificates/nttdata/Java/Java SE 11 Programmer II - Lambda Operations & Streams/Java SE 11 Programmer II_ Lambda Operations & Streams.pdf",
      documents: [
        {
          title: "Java SE 11: Lambda Operations & Streams",
          url: "/docs/certificates/nttdata/Java/Java SE 11 Programmer II - Lambda Operations & Streams/Java SE 11 Programmer II_ Lambda Operations & Streams.pdf",
          type: "main",
        },
      ],
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
      documentUrl: "/docs/certificates/nttdata/Java/Create REST APIs with Spring and Java/Create REST APIs with Spring and Java.pdf",
      documents: [
        {
          title: "Create REST APIs with Spring & Java (Acreditación)",
          url: "/docs/certificates/nttdata/Java/Create REST APIs with Spring and Java/Create REST APIs with Spring and Java.pdf",
          type: "main",
        },
        {
          title: "Fundamentos: Introduction to CRUD",
          url: "/docs/certificates/nttdata/Java/Create REST APIs with Spring and Java/Fundamentos de Spring/Introduction to CRUD.pdf",
          type: "module",
        },
        {
          title: "Fundamentos: Back-End Architecture",
          url: "/docs/certificates/nttdata/Java/Create REST APIs with Spring and Java/Fundamentos de Spring/Back-End Architecture.pdf",
          type: "module",
        },
        {
          title: "Fundamentos: Spring Bean & Spring Boot",
          url: "/docs/certificates/nttdata/Java/Create REST APIs with Spring and Java/Fundamentos de Spring/Spring Bean and Spring Boot.pdf",
          type: "module",
        },
      ],
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
      documentUrl: "/docs/certificates/nttdata/Java/Unit Testing/Final Exam_ Unit Testing.pdf",
      documents: [
        {
          title: "Final Exam: Unit Testing (Acreditación)",
          url: "/docs/certificates/nttdata/Java/Unit Testing/Final Exam_ Unit Testing.pdf",
          type: "main",
        },
        {
          title: "JUnit: Introduction to Framework",
          url: "/docs/certificates/nttdata/Java/Unit Testing/Unit Testing/Unit Testing_ An Introduction to the JUnit Framework.pdf",
          type: "module",
        },
        {
          title: "JUnit: Executing JUnit Tests",
          url: "/docs/certificates/nttdata/Java/Unit Testing/Unit Testing/Unit Testing_ Executing JUnit Tests.pdf",
          type: "module",
        },
        {
          title: "JUnit: Assertions & Assumptions",
          url: "/docs/certificates/nttdata/Java/Unit Testing/Unit Testing/Unit Testing_ Assertions & Assumptions in JUnit.pdf",
          type: "module",
        },
        {
          title: "JUnit: Parameterized Tests",
          url: "/docs/certificates/nttdata/Java/Unit Testing/Unit Testing/Unit Testing_ Parameterized JUnit Tests.pdf",
          type: "module",
        },
        {
          title: "JUnit: Advanced Annotations",
          url: "/docs/certificates/nttdata/Java/Unit Testing/Unit Testing/Unit Testing_ Advanced Annotations in JUnit.pdf",
          type: "module",
        },
        {
          title: "Mockito: Getting Started with Mockito",
          url: "/docs/certificates/nttdata/Java/Unit Testing/Unit Testing with Mocks/Unit Testing with Mocks_ Getting Started with Mockito.pdf",
          type: "module",
        },
        {
          title: "Mockito: Creating Mocks & Verifying Behavior",
          url: "/docs/certificates/nttdata/Java/Unit Testing/Unit Testing with Mocks/Unit Testing with Mocks_ Creating Mocks & Verifying Behavior.pdf",
          type: "module",
        },
        {
          title: "Mockito: Mocking Exceptions & Spies",
          url: "/docs/certificates/nttdata/Java/Unit Testing/Unit Testing with Mocks/Unit Testing with Mocks_ Mocking Exceptions & Using Spies.pdf",
          type: "module",
        },
      ],
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
      documentUrl: "/docs/certificates/nttdata/Angular/Angular 17 and 18 New Features.pdf",
      documents: [
        {
          title: "Angular 17 & 18: New Features & Signals",
          url: "/docs/certificates/nttdata/Angular/Angular 17 and 18 New Features.pdf",
          type: "module",
        },
        {
          title: "Angular 16: Getting Started with Angular",
          url: "/docs/certificates/nttdata/Angular/Angular 16_ Getting Started with Angular.pdf",
          type: "module",
        },
        {
          title: "Angular 16: Introduction to Components",
          url: "/docs/certificates/nttdata/Angular/Angular 16_ Introduction to Components.pdf",
          type: "module",
        },
        {
          title: "Angular 16: Working with Components",
          url: "/docs/certificates/nttdata/Angular/Angular 16_ Working with Components.pdf",
          type: "module",
        },
        {
          title: "Angular 16: Working with Angular Modules",
          url: "/docs/certificates/nttdata/Angular/Angular 16_ Working with Angular Modules.pdf",
          type: "module",
        },
        {
          title: "Angular 16: Services and Dependency Injection",
          url: "/docs/certificates/nttdata/Angular/Angular 16_ Services and Dependency Injection.pdf",
          type: "module",
        },
        {
          title: "Angular 16: Navigation and Routing",
          url: "/docs/certificates/nttdata/Angular/Angular 16_ Navigation and Routing in Angular.pdf",
          type: "module",
        },
        {
          title: "Angular 16: Working With Forms",
          url: "/docs/certificates/nttdata/Angular/Angular 16_ Working With Forms.pdf",
          type: "module",
        },
        {
          title: "Angular 16: Security and Deployment",
          url: "/docs/certificates/nttdata/Angular/Angular 16_ Security and Deployment in Angular.pdf",
          type: "module",
        },
      ],
      featuredInCV: true,
    },

    // --- ITINERARIO BASES DE DATOS ---
    {
      id: "bbdd-advanced-track",
      title: "Bases de Datos Relacionales y NoSQL",
      issuer: "NTT DATA",
      platform: "Percipio (4 certificaciones modulares)",
      category: "Bases de Datos",
      hours: "~4.5 horas lectivas",
      summary: "Ciclo intensivo de gestión y diseño de persistencia: modelado de esquemas, sentencias DDL y DML complejas, definición de constraints de integridad referencial y nociones de bases de datos NoSQL.",
      skills: ["SQL", "DDL / DML", "Constraints", "Modelado de Datos", "NoSQL"],
      documentUrl: "/docs/certificates/nttdata/BBDD/DDL, DML, & Constraints.pdf",
      documents: [
        {
          title: "BBDD: DDL, DML & Constraints",
          url: "/docs/certificates/nttdata/BBDD/DDL, DML, & Constraints.pdf",
          type: "module",
        },
        {
          title: "BBDD: Creating an Organized Database",
          url: "/docs/certificates/nttdata/BBDD/Creating an Organized Database.pdf",
          type: "module",
        },
        {
          title: "BBDD: Data Retrieval",
          url: "/docs/certificates/nttdata/BBDD/Data Retrieval.pdf",
          type: "module",
        },
        {
          title: "NoSQL: Introduction to MongoDB Atlas",
          url: "/docs/certificates/nttdata/BBDD/Working with MongoDB Atlas_ An Introduction to MongoDB Atlas.pdf",
          type: "module",
        },
      ],
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
      documentUrl: "/docs/certificates/nttdata/Prompt_Engineering_With_Gen_AI_Tools/Prompt Engineering with Generative AI Tools.pdf",
      documents: [
        {
          title: "Prompt Engineering with Gen AI Tools (Diploma)",
          url: "/docs/certificates/nttdata/Prompt_Engineering_With_Gen_AI_Tools/Prompt Engineering with Generative AI Tools.pdf",
          type: "main",
        },
        {
          title: "Módulo: Getting Started with Prompt Engineering",
          url: "/docs/certificates/nttdata/Prompt_Engineering_With_Gen_AI_Tools/Certificados de contenidos/Getting Started with Prompt Engineering.pdf",
          type: "module",
        },
        {
          title: "Módulo: Exploring Prompt Engineering Techniques",
          url: "/docs/certificates/nttdata/Prompt_Engineering_With_Gen_AI_Tools/Certificados de contenidos/Exploring Prompt Engineering Techniques.pdf",
          type: "module",
        },
        {
          title: "Módulo: Exploring the OpenAI Playground",
          url: "/docs/certificates/nttdata/Prompt_Engineering_With_Gen_AI_Tools/Certificados de contenidos/Exploring the OpenAI Playground.pdf",
          type: "module",
        },
        {
          title: "Módulo: Case Studies in Prompt Engineering",
          url: "/docs/certificates/nttdata/Prompt_Engineering_With_Gen_AI_Tools/Certificados de contenidos/Case Studies in Prompt Engineering.pdf",
          type: "module",
        },
        {
          title: "Módulo: Final Exam Prompt Engineering",
          url: "/docs/certificates/nttdata/Prompt_Engineering_With_Gen_AI_Tools/Certificados de contenidos/Final Exam_ Prompt Engineering with Generative AI Tools.pdf",
          type: "module",
        },
      ],
      featuredInCV: false, // Visible en web y dossier
    },
    {
      id: "ia-big-school",
      title: "Iniciación al Desarrollo con IA",
      issuer: "BIG School",
      category: "Inteligencia Artificial",
      summary: "Fundamentos de modelos de inteligencia artificial aplicados al desarrollo de software y automatización.",
      skills: ["Inteligencia Artificial", "Automatización"],
      documentUrl: "/docs/certificates/big-school/Certificado-Aitor-Gallego-Casilda-Romero-abnvieoi.pdf",
      documents: [
        {
          title: "Certificado Oficial: Iniciación al Desarrollo con IA",
          url: "/docs/certificates/big-school/Certificado-Aitor-Gallego-Casilda-Romero-abnvieoi.pdf",
          type: "main",
        },
      ],
      featuredInCV: false,
    },
  ],

  languages: [
    { language: "Español", level: "Nativo" },
    {
      language: "Inglés",
      level: "Nivel Técnico",
      detail: "Lectura, redacción de documentación técnica y comunicación en ingeniería",
    },
  ],

  interests: [
    {
      name: "Tenis de Competición",
      description: "Práctica activa y competición en torneos amateur; enfoque mental, constancia y superación.",
    },
    {
      name: "Lectura & Ficción",
      description: "Lectura asidua de narrativa, novela negra y policiaca como fuente de concentración y desconexión.",
    },
  ],

  personalTraits: [
    {
      id: "organizacion-rigor",
      title: "Organización y Rigor Metodológico",
      description: "Estructuración metódica de flujos de trabajo, documentación precisa y entornos limpios y reproducibles.",
      category: "virtud",
    },
    {
      id: "disciplina-constancia",
      title: "Disciplina y Constancia",
      description: "Hábitos firmes de constancia y planificación trasladados a cada entrega técnica y reto profesional.",
      category: "virtud",
    },
    {
      id: "deporte-competicion",
      title: "Deporte y Resistencia Mental",
      description: "Práctica activa de tenis (recreativo y competición amateur), entrenamiento de fuerza y running como base de foco y energía.",
      category: "habito",
    },
    {
      id: "lectura-analitica",
      title: "Lectura y Razonamiento Deductivo",
      description: "Lector habitual de novela policíaca, misterio y ensayo; estímulo continuo de la atención al detalle y el análisis crítico.",
      category: "habito",
    },
  ],

  engineeringPhilosophy: {
    title: "Filosofía de Ingeniería & Enfoque de Trabajo",
    subtitle: "Criterio técnico, dominio de fundamentos y búsqueda continua de equilibrio pragmático.",
    principles: [
      {
        id: "fundamentos-cajas-negras",
        title: "Comprensión profunda sin cajas negras",
        description: "Priorizo dominar la arquitectura interna, el ciclo de vida de procesos y la gestión de recursos a bajo nivel antes que confiar a ciegas en abstracciones prefabricadas.",
        type: "principle",
      },
      {
        id: "rigor-optimizacion",
        title: "Rigor metodológico y optimización",
        description: "Mentalidad de ingeniería aplicada a especificaciones claras, tipado estricto y eliminación sistemática de desperdicio técnico.",
        type: "principle",
      },
      {
        id: "soberania-seguridad",
        title: "Soberanía digital y seguridad por diseño",
        description: "Postura activa en protección de datos, principio de menor privilegio y preferencia por soluciones auditables y de código abierto.",
        type: "principle",
      },
      {
        id: "aprendizaje-disciplinado",
        title: "Aprendizaje continuo y estructurado",
        description: "Asimilación rápida y sólida de nuevos paradigmas y estándares de arquitectura a partir de sus especificaciones formales.",
        type: "principle",
      },
      {
        id: "equilibrio-pragmatico",
        title: "Equilibrio pragmático y prevención de sobreingeniería",
        description: "Vigilo activamente el coste de mantenimiento técnico para evitar el over-engineering, priorizando la entrega ágil de valor real en equipo.",
        type: "balance",
      },
      {
        id: "adaptabilidad-equipo",
        title: "Adaptabilidad táctica en ecosistemas reales",
        description: "Tolerancia constructiva ante sistemas heredados y plazos de negocio, combinando la excelencia técnica con la agilidad operativa.",
        type: "balance",
      },
    ],
  },
};
