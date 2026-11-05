/**
 * Fluid Scroll-Spy & Interpolated 2D Indicator Engine
 *
 * Provides real-time continuous scroll interpolation between document sections,
 * rendering a sliding GPU-accelerated pill indicator and cross-fading link text brightness.
 * Designed for 60/120 FPS performance with zero DOM reflows during scroll.
 */

export interface LinkCoords {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ScrollProgressResult {
  activeIndex: number;
  targetIndex: number;
  progress: number;
  opacity: number;
}

export interface FluidScrollSpyOptions {
  container: HTMLElement;
  links: HTMLAnchorElement[];
  indicator: HTMLElement;
  headerOffset?: number;
  fadeDistance?: number;
  onUpdate?: (result: ScrollProgressResult, geometry: LinkCoords) => void;
}

export interface FluidScrollSpyController {
  refresh: () => void;
  destroy: () => void;
  getState: () => {
    progress: ScrollProgressResult;
    geometry: LinkCoords | null;
  };
}

/**
 * Pure calculation: computes normalized progress t in [0, 1] between active and target sections.
 */
export function calculateScrollProgress(
  scrollY: number,
  sectionTops: number[],
  options: {
    headerOffset?: number;
    fadeDistance?: number;
    maxScrollY?: number;
  } = {}
): ScrollProgressResult {
  const count = sectionTops.length;

  if (count === 0) {
    return { activeIndex: 0, targetIndex: 0, progress: 0, opacity: 0 };
  }

  const headerOffset = options.headerOffset ?? 100;
  const fadeDistance = options.fadeDistance ?? 160;
  const maxScrollY = options.maxScrollY ?? Number.POSITIVE_INFINITY;

  // Case 1: Page scrolled to bottom (last section active)
  if (scrollY >= maxScrollY - 24 && maxScrollY > 0) {
    return {
      activeIndex: count - 1,
      targetIndex: count - 1,
      progress: 0,
      opacity: 1,
    };
  }

  const triggerY = scrollY + headerOffset;
  const firstTop = sectionTops[0];

  // Case 2: Above the first section (e.g. Hero zone)
  if (triggerY < firstTop) {
    if (triggerY < firstTop - fadeDistance) {
      return { activeIndex: 0, targetIndex: 0, progress: 0, opacity: 0 };
    }
    const fadeRatio = (triggerY - (firstTop - fadeDistance)) / fadeDistance;
    const clampedFade = Math.max(0, Math.min(1, fadeRatio));
    return {
      activeIndex: 0,
      targetIndex: 0,
      progress: 0,
      opacity: clampedFade,
    };
  }

  // Case 3: At or beyond the last section
  const lastTop = sectionTops[count - 1];
  if (triggerY >= lastTop) {
    return {
      activeIndex: count - 1,
      targetIndex: count - 1,
      progress: 0,
      opacity: 1,
    };
  }

  // Case 4: In-between section i and section i + 1
  for (let i = 0; i < count - 1; i++) {
    const currentTop = sectionTops[i];
    const nextTop = sectionTops[i + 1];

    if (triggerY >= currentTop && triggerY < nextTop) {
      const distance = nextTop - currentTop;
      const progress = distance > 0 ? (triggerY - currentTop) / distance : 0;
      const clampedProgress = Math.max(0, Math.min(1, progress));

      return {
        activeIndex: i,
        targetIndex: i + 1,
        progress: clampedProgress,
        opacity: 1,
      };
    }
  }

  return { activeIndex: 0, targetIndex: 0, progress: 0, opacity: 1 };
}

/**
 * Pure calculation: linearly interpolates geometric coordinates between two link rects.
 */
export function interpolateGeometry(
  from: LinkCoords,
  to: LinkCoords,
  progress: number
): LinkCoords {
  const t = Math.max(0, Math.min(1, progress));
  return {
    x: from.x + (to.x - from.x) * t,
    y: from.y + (to.y - from.y) * t,
    width: from.width + (to.width - from.width) * t,
    height: from.height + (to.height - from.height) * t,
  };
}

/**
 * Pure calculation: calculates proportional text brightness/glow for each link.
 */
export function computeGlowIntensities(
  numLinks: number,
  activeIndex: number,
  targetIndex: number,
  progress: number,
  opacity: number
): number[] {
  const intensities = new Array(numLinks).fill(0);

  if (opacity <= 0 || numLinks === 0) {
    return intensities;
  }

  if (activeIndex === targetIndex) {
    if (activeIndex >= 0 && activeIndex < numLinks) {
      intensities[activeIndex] = opacity;
    }
    return intensities;
  }

  if (activeIndex >= 0 && activeIndex < numLinks) {
    intensities[activeIndex] = (1 - progress) * opacity;
  }
  if (targetIndex >= 0 && targetIndex < numLinks) {
    intensities[targetIndex] = progress * opacity;
  }

  return intensities;
}

/**
 * Reads document-relative top coordinates for each target section.
 */
export function getSectionDocumentTops(
  sectionElements: HTMLElement[]
): number[] {
  const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
  return sectionElements.map((el) => {
    const rect = el.getBoundingClientRect();
    return rect.top + scrollY;
  });
}

/**
 * Measures each anchor link's bounding coordinates relative to their parent container.
 */
export function measureLinkCoords(
  container: HTMLElement,
  links: HTMLAnchorElement[]
): LinkCoords[] {
  const containerRect = container.getBoundingClientRect();
  return links.map((link) => {
    const linkRect = link.getBoundingClientRect();
    return {
      x: linkRect.left - containerRect.left,
      y: linkRect.top - containerRect.top,
      width: linkRect.width,
      height: linkRect.height,
    };
  });
}

/**
 * Initializes the fluid scroll-spy on the provided container, links, and indicator element.
 */
export function initFluidScrollSpy(
  options: FluidScrollSpyOptions
): FluidScrollSpyController {
  const { container, links, indicator } = options;

  if (!container || links.length === 0 || !indicator) {
    return {
      refresh: () => {},
      destroy: () => {},
      getState: () => ({
        progress: { activeIndex: 0, targetIndex: 0, progress: 0, opacity: 0 },
        geometry: null,
      }),
    };
  }

  // Resolve target section elements from anchor href attributes
  const sectionElements: (HTMLElement | null)[] = links.map((link) => {
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return null;
    const id = href.slice(1);
    return document.getElementById(id);
  });

  let cachedSectionTops: number[] = [];
  let cachedLinkCoords: LinkCoords[] = [];
  let latestProgress: ScrollProgressResult = {
    activeIndex: 0,
    targetIndex: 0,
    progress: 0,
    opacity: 0,
  };
  let latestGeometry: LinkCoords | null = null;
  let rafId: number | null = null;

  function cacheMeasurements() {
    // Collect valid section tops
    const scrollY = window.scrollY;
    cachedSectionTops = sectionElements.map((el) => {
      if (!el) return 0;
      const rect = el.getBoundingClientRect();
      return rect.top + scrollY;
    });

    // Cache relative link coordinates
    cachedLinkCoords = measureLinkCoords(container, links);
  }

  function render() {
    if (cachedSectionTops.length === 0 || cachedLinkCoords.length === 0) {
      return;
    }

    const scrollY = window.scrollY;
    const maxScrollY =
      document.documentElement.scrollHeight - window.innerHeight;

    latestProgress = calculateScrollProgress(scrollY, cachedSectionTops, {
      headerOffset: options.headerOffset,
      fadeDistance: options.fadeDistance,
      maxScrollY,
    });

    const fromCoords = cachedLinkCoords[latestProgress.activeIndex];
    const toCoords = cachedLinkCoords[latestProgress.targetIndex];

    if (!fromCoords || !toCoords) {
      return;
    }

    // Interpolate geometry across 2D plane (x, y, width, height)
    latestGeometry = interpolateGeometry(
      fromCoords,
      toCoords,
      latestProgress.progress
    );

    // Apply GPU transform and dimensions to indicator pill
    indicator.style.transform = `translate3d(${latestGeometry.x.toFixed(1)}px, ${latestGeometry.y.toFixed(1)}px, 0)`;
    indicator.style.width = `${latestGeometry.width.toFixed(1)}px`;
    indicator.style.height = `${latestGeometry.height.toFixed(1)}px`;
    indicator.style.opacity = latestProgress.opacity.toFixed(3);

    // Compute glow intensities for each link
    const intensities = computeGlowIntensities(
      links.length,
      latestProgress.activeIndex,
      latestProgress.targetIndex,
      latestProgress.progress,
      latestProgress.opacity
    );

    const dominantIndex =
      latestProgress.progress < 0.5
        ? latestProgress.activeIndex
        : latestProgress.targetIndex;

    links.forEach((link, idx) => {
      const intensity = intensities[idx] ?? 0;
      link.style.setProperty('--nav-glow', intensity.toFixed(3));

      const isDominant = idx === dominantIndex && latestProgress.opacity > 0.3;
      if (isDominant) {
        link.setAttribute('data-active', 'true');
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('data-active');
        link.removeAttribute('aria-current');
      }
    });

    if (options.onUpdate) {
      options.onUpdate(latestProgress, latestGeometry);
    }
  }

  function onScroll() {
    if (rafId === null) {
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        render();
      });
    }
  }

  function refresh() {
    cacheMeasurements();
    render();
  }

  // Initial measurement and render
  cacheMeasurements();
  render();

  // Attach passive scroll listener for high FPS tracking
  window.addEventListener('scroll', onScroll, { passive: true });

  // Refresh on resize
  let resizeTimeout: number | undefined;
  function onResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = window.setTimeout(() => {
      refresh();
    }, 60);
  }
  window.addEventListener('resize', onResize, { passive: true });

  // Observe container layout changes (e.g. dock transitions or font rendering)
  let resizeObserver: ResizeObserver | null = null;
  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(() => {
      cacheMeasurements();
      render();
    });
    resizeObserver.observe(container);
  }

  // If document fonts are still loading, refresh once ready
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      refresh();
    });
  }

  return {
    refresh,
    destroy: () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (resizeTimeout) clearTimeout(resizeTimeout);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      if (resizeObserver) resizeObserver.disconnect();
    },
    getState: () => ({
      progress: latestProgress,
      geometry: latestGeometry,
    }),
  };
}
