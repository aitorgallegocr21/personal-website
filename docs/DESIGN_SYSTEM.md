# Sistema de Diseño UI/UX - Portfolio & Automated CV

Guía de diseño e interfaz de usuario inspirada en estándares de ingeniería modernos (Linear, Raycast, Vercel). Diseñado para combinar una estética oscura minimalista en la web con una tipografía suiza ultra-legible en la vista de impresión A4.

---

## 1. Filosofía de Diseño

1. **Dark Mode First con Profundidad:** Se evita el negro plano (`#000000`) para no generar contraste excesivo. Se trabaja con la escala profunda de `zinc` con capas sutiles de transparencia y desenfoque (`backdrop-blur`).
2. **Jerarquía Visual Inmediata:** La información crítica (stack técnico, proyectos principales y disponibilidad) debe captarse en menos de 5 segundos.
3. **Microinteracciones Precisas:** Transiciones sutiles de borde, efectos de foco con el cursor y feedback háptico/visual en botones interactivos (como copiar email).
4. **Cero Penalización de Rendimiento:** Todos los componentes se estilizan con utilidades de Tailwind CSS y CSS nativo. Cero librerías pesadas de animación o JavaScript innecesario en cliente.

---

## 2. Paleta de Colores y Superficies

### A. Vista Web (Dark Mode)

| Token Semántico | Clase Tailwind | Valor Hex / Canal | Propósito |
|---|---|---|---|
| **Background Principal** | `bg-zinc-950` | `#09090b` | Lienzo general de la aplicación |
| **Superficie de Tarjeta** | `bg-zinc-900/40` | `rgba(24, 24, 27, 0.4)` | Fondo de tarjetas con `backdrop-blur-sm` |
| **Superficie en Hover** | `hover:bg-zinc-900/70` | `rgba(24, 24, 27, 0.7)` | Estado activo al pasar el cursor |
| **Borde Base** | `border-zinc-800/80` | `rgba(39, 39, 42, 0.8)` | Delimitadores de precisión finos |
| **Borde en Hover** | `hover:border-zinc-700` | `#3f3f46` | Contorno resaltado al interactuar |
| **Texto Primario** | `text-zinc-100` | `#f4f4f5` | Títulos, nombres y enlaces destacados |
| **Texto Secundario** | `text-zinc-400` | `#a1a1aa` | Párrafos descriptivos y resúmenes |
| **Texto Terciario / Muted** | `text-zinc-500` | `#71717a` | Fechas, metadatos y etiquetas secundarias |
| **Acento Tecnológico** | `text-emerald-400` | `#34d399` | Indicador de disponibilidad y estados activos |
| **Fondo de Acento** | `bg-emerald-500/10` | `rgba(16, 185, 129, 0.1)` | Relleno de badges de estado |

### B. Vista CV / PDF (Swiss Minimalist - Light Mode)

| Token Semántico | Clase Tailwind | Propósito |
|---|---|---|
| **Fondo Documento** | `bg-white` | Fondo blanco puro obligatorio para impresión |
| **Texto Primario** | `text-zinc-900` | Tipografía de máxima legibilidad y contraste |
| **Texto Secundario** | `text-zinc-700` | Bloques de texto descriptivo |
| **Texto Terciario** | `text-zinc-500` | Fechas, empresas e instituciones |
| **Bordes Separadores** | `border-zinc-200` | Líneas horizontales de separación sutiles |

---

## 3. Tipografía y Escalas

### Fuentes Recomendadas
* **Sans-serif (Cuerpo y Títulos):** `Inter`, `Geist Sans`, o la pila del sistema (`font-sans`).
* **Monospace (Stack, Badges y Rutas):** `JetBrains Mono`, `Geist Mono`, o `font-mono`.

### Escalas Tipográficas
* **Hero / Nombre Principal:** `text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl`
* **Subtítulos / Rol:** `text-lg font-medium text-zinc-300`
* **Títulos de Sección (Web):** `text-xl font-semibold text-zinc-100 flex items-center gap-2`
* **Badges de Tecnologías:** `font-mono text-xs font-medium px-2 py-0.5 rounded-md`
* **Texto CV A4 (Base):** `text-[12px] leading-relaxed text-zinc-700`
* **Metadatos CV A4:** `text-[11px] font-mono text-zinc-500`

---

## 4. Patrones de Componentes (Código de Referencia)

### A. Badge de Disponibilidad Activa (Pulsing Indicator)
Elemento visual en la cabecera del portfolio que comunica estado activo y búsqueda de retos:

```html
<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
  <span class="relative flex h-2 w-2">
    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
    <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
  </span>
  Disponible para proyectos & prácticas
</div>
```

---

### B. Tarjeta Bento Grid con Borde Activo
Estructura modular para destacar proyectos principales (2 columnas) frente a proyectos secundarios o métricas:

```html
<div class="group relative rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/70 hover:shadow-2xl hover:shadow-zinc-950/50">
  <!-- Cabecera de la tarjeta -->
  <div class="flex items-start justify-between gap-4 mb-3">
    <h3 class="text-lg font-semibold text-zinc-100 group-hover:text-white transition-colors">
      Local Music Management Engine
    </h3>
    <span class="font-mono text-xs px-2 py-0.5 rounded-md bg-zinc-800/70 text-zinc-300 border border-zinc-700/50">
      Python
    </span>
  </div>

  <!-- Descripción técnica -->
  <p class="text-sm text-zinc-400 leading-relaxed mb-4">
    Motor open-source enfocado en privacidad y gestión de metadatos automatizada para streaming local.
  </p>

  <!-- Tags de tecnologías -->
  <div class="flex flex-wrap gap-1.5">
    <span class="font-mono text-[11px] px-2 py-0.5 rounded bg-zinc-800/40 text-zinc-400 border border-zinc-800">
      yt-dlp
    </span>
    <span class="font-mono text-[11px] px-2 py-0.5 rounded bg-zinc-800/40 text-zinc-400 border border-zinc-800">
      ListenBrainz API
    </span>
    <span class="font-mono text-[11px] px-2 py-0.5 rounded bg-zinc-800/40 text-zinc-400 border border-zinc-800">
      ID3 Tagging
    </span>
  </div>
</div>
```

---

### C. Botón "Copiar Email" con Feedback Instantáneo
Permite a los reclutadores copiar la dirección de contacto con un clic y feedback visual sin recargas:

```html
<button
  type="button"
  id="copy-email-btn"
  class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-300 bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 hover:text-white transition-colors cursor-pointer"
  data-email="aitorgallegocr21@gmail.com"
>
  <svg id="copy-icon" class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
  </svg>
  <span id="copy-text">Copiar email</span>
</button>

<script>
  const btn = document.getElementById('copy-email-btn');
  const text = document.getElementById('copy-text');
  btn?.addEventListener('click', () => {
    const email = btn.getAttribute('data-email') || '';
    navigator.clipboard.writeText(email).then(() => {
      if (text) text.textContent = '¡Copiado!';
      btn.classList.add('border-emerald-500/50', 'text-emerald-400');
      setTimeout(() => {
        if (text) text.textContent = 'Copiar email';
        btn.classList.remove('border-emerald-500/50', 'text-emerald-400');
      }, 2000);
    });
  });
</script>
```

---

### D. Enlace con Microdesplazamiento
Interacción minimalista para enlaces salientes (GitHub, LinkedIn, Demos):

```html
<a
  href="https://github.com/aitorgcr"
  target="_blank"
  rel="noopener noreferrer"
  class="group inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
>
  <span>Ver repositorio</span>
  <svg class="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
  </svg>
</a>
```

---

## 5. Reglas Obligatorias para la Vista de Impresión (/cv)

1. **Configuración de Hoja A4 Milimétrica:**
   ```css
   @page {
     size: A4 portrait;
     margin: 10mm 12mm 10mm 12mm;
   }
   ```
2. **Control de Roturas (`break-inside-avoid`):**
   Cada bloque de experiencia, proyecto o grupo de formación debe llevar la clase CSS `break-inside-avoid` para evitar que títulos o listas queden seccionados a mitad de hoja.
3. **Visibilidad Condicional:**
   * Utilizar `print:hidden` para barras flotantes de navegación, botones de descarga o selectores de idioma.
   * Utilizar `print:block` o `print:text-zinc-900` para forzar contraste sobre fondo blanco en el documento PDF final.