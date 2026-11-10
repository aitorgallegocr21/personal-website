/**
 * Certificate & Document Viewer Modal Manager.
 * Handles dialog display, multi-document tab navigation, deep linking, and ZIP batch export.
 */

export interface DocItem {
  title: string;
  url: string;
  type?: string;
}

export interface CertificateRegistryItem {
  title: string;
  subtitle: string;
  url: string;
  docs?: DocItem[];
}

let currentDocsList: DocItem[] = [];

/**
 * Downloads multiple documents packaged together into a compressed ZIP file.
 */
export async function downloadDocsZip(
  docs: DocItem[],
  folderTitle: string,
  onStatusUpdate?: (status: string) => void
): Promise<void> {
  if (!docs || docs.length === 0) return;

  onStatusUpdate?.('Generando ZIP...');

  try {
    const { default: JSZip } = await import('jszip');
    const zip = new JSZip();
    const cleanFileName = `Certificados_${folderTitle.replace(/[^a-zA-Z0-9_\u00C0-\u017F-]/g, '_')}.zip`;

    const fetchPromises = docs.map(async (doc) => {
      const response = await fetch(doc.url);
      if (!response.ok) {
        throw new Error(
          `Error descargando documento: ${doc.url} (${response.statusText})`
        );
      }
      const blob = await response.blob();
      let fileName = doc.url.split('/').pop() || `${doc.title}.pdf`;
      try {
        fileName = decodeURIComponent(fileName);
      } catch {
        // ignore
      }
      if (!fileName.toLowerCase().endsWith('.pdf')) {
        fileName += '.pdf';
      }
      zip.file(fileName, blob);
    });

    await Promise.all(fetchPromises);

    const zipBlob = await zip.generateAsync({
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: { level: 6 },
    });

    const downloadUrl = URL.createObjectURL(zipBlob);
    const anchor = document.createElement('a');
    anchor.href = downloadUrl;
    anchor.download = cleanFileName;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(downloadUrl);

    onStatusUpdate?.('¡ZIP Descargado!');
  } catch (err) {
    console.error('Error al empaquetar archivo ZIP:', err);
    onStatusUpdate?.('Error al generar');
    throw err;
  }
}

/**
 * Switches the active document inside the modal viewer.
 */
export function selectModalDoc(index: number): void {
  const modalIframe = document.getElementById(
    'cert-modal-iframe'
  ) as HTMLIFrameElement | null;
  const modalDownload = document.getElementById(
    'cert-modal-download'
  ) as HTMLAnchorElement | null;
  const modalExternal = document.getElementById(
    'cert-modal-external'
  ) as HTMLAnchorElement | null;
  const modalMobileOpen = document.getElementById(
    'cert-modal-mobile-open'
  ) as HTMLAnchorElement | null;
  const modalCounterBadge = document.getElementById('cert-modal-counter-badge');
  const modalLoading = document.getElementById('cert-modal-loading');
  const modalNavTabs = document.getElementById('cert-modal-nav-tabs');

  if (!currentDocsList[index] || !modalIframe || !modalDownload) return;
  const doc = currentDocsList[index];

  if (modalLoading) modalLoading.classList.remove('hidden');
  modalIframe.src = doc.url;
  modalDownload.href = doc.url;
  modalDownload.download = doc.url.split('/').pop() || `${doc.title}.pdf`;

  if (modalExternal) {
    modalExternal.href = doc.url;
  }
  if (modalMobileOpen) {
    modalMobileOpen.href = doc.url;
  }

  if (modalCounterBadge) {
    modalCounterBadge.textContent = `${index + 1} de ${currentDocsList.length}`;
  }

  if (modalNavTabs) {
    const tabButtons =
      modalNavTabs.querySelectorAll<HTMLButtonElement>('.doc-tab-btn');
    tabButtons.forEach((btn, i) => {
      if (i === index) {
        btn.className =
          'doc-tab-btn shrink-0 min-h-[32px] px-3 py-1 rounded-lg text-xs font-semibold bg-[var(--color-accent)] text-[var(--color-accent-contrast)] border border-[var(--color-accent)] shadow-xs transition-all cursor-default';
        btn.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      } else {
        btn.className =
          'doc-tab-btn shrink-0 min-h-[32px] px-3 py-1 rounded-lg text-xs font-medium bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 border border-zinc-200 dark:border-zinc-700/60 hover:border-[var(--color-accent-border)] transition-all cursor-pointer';
      }
    });
  }
}

/**
 * Opens the certificate viewer modal with single or multiple documents.
 */
export function openCertificateModal(
  url: string,
  title: string,
  subtitle?: string,
  docsJson?: string
): void {
  const modal = document.getElementById(
    'certificate-modal'
  ) as HTMLDialogElement | null;
  const modalTitle = document.getElementById('cert-modal-title');
  const modalSubtitle = document.getElementById('cert-modal-subtitle');
  const modalCounterBadge = document.getElementById('cert-modal-counter-badge');
  const modalDownload = document.getElementById(
    'cert-modal-download'
  ) as HTMLAnchorElement | null;
  const modalDownloadAll = document.getElementById(
    'cert-modal-download-all'
  ) as HTMLButtonElement | null;
  const modalDownloadAllText = document.getElementById(
    'cert-modal-download-all-text'
  );
  const modalExternal = document.getElementById(
    'cert-modal-external'
  ) as HTMLAnchorElement | null;
  const modalMobileOpen = document.getElementById(
    'cert-modal-mobile-open'
  ) as HTMLAnchorElement | null;
  const modalIframe = document.getElementById(
    'cert-modal-iframe'
  ) as HTMLIFrameElement | null;
  const modalLoading = document.getElementById('cert-modal-loading');
  const modalNavContainer = document.getElementById('cert-modal-nav-container');
  const modalNavTabs = document.getElementById('cert-modal-nav-tabs');

  if (!modal || !modalIframe || !modalDownload) return;

  if (modalTitle) modalTitle.textContent = title;
  if (modalSubtitle)
    modalSubtitle.textContent = subtitle || 'Acreditación oficial';

  let parsedDocs: DocItem[] = [];
  if (docsJson) {
    try {
      parsedDocs = JSON.parse(docsJson);
    } catch (e) {
      console.error('Failed to parse data-docs JSON:', e);
    }
  }

  if (parsedDocs.length > 0) {
    currentDocsList = parsedDocs;
  } else if (url) {
    currentDocsList = [{ title, url, type: 'main' }];
  } else {
    currentDocsList = [];
  }

  if (currentDocsList.length > 1) {
    if (modalNavContainer) modalNavContainer.classList.remove('hidden');
    if (modalDownloadAll) {
      modalDownloadAll.classList.remove('hidden');
      modalDownloadAll.title =
        'Descargar todos los documentos en un archivo ZIP';
    }
    if (modalDownloadAllText)
      modalDownloadAllText.textContent = `ZIP (${currentDocsList.length})`;
    if (modalCounterBadge) modalCounterBadge.classList.remove('hidden');

    if (modalNavTabs) {
      modalNavTabs.innerHTML = '';
      currentDocsList.forEach((doc, i) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = doc.title;
        btn.className =
          'doc-tab-btn shrink-0 min-h-[32px] px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer';
        btn.addEventListener('click', () => selectModalDoc(i));
        modalNavTabs.appendChild(btn);
      });
    }

    const targetIndex = Math.max(
      0,
      currentDocsList.findIndex((d) => d.url === url)
    );
    selectModalDoc(targetIndex);
  } else {
    if (modalNavContainer) modalNavContainer.classList.add('hidden');
    if (modalDownloadAll) modalDownloadAll.classList.add('hidden');
    if (modalCounterBadge) modalCounterBadge.classList.add('hidden');

    const singleUrl = currentDocsList[0]?.url || url;
    if (modalLoading) modalLoading.classList.remove('hidden');
    modalIframe.src = singleUrl;
    modalDownload.href = singleUrl;
    modalDownload.download = singleUrl.split('/').pop() || 'documento.pdf';
    if (modalExternal) {
      modalExternal.href = singleUrl;
    }
    if (modalMobileOpen) {
      modalMobileOpen.href = singleUrl;
    }
  }

  modal.showModal();
  document.body.classList.add('overflow-hidden');
}

/**
 * Closes the certificate modal dialog and resets state.
 */
export function closeCertificateModal(): void {
  const modal = document.getElementById(
    'certificate-modal'
  ) as HTMLDialogElement | null;
  const modalIframe = document.getElementById(
    'cert-modal-iframe'
  ) as HTMLIFrameElement | null;
  const modalDownload = document.getElementById(
    'cert-modal-download'
  ) as HTMLAnchorElement | null;
  const modalExternal = document.getElementById(
    'cert-modal-external'
  ) as HTMLAnchorElement | null;
  const modalMobileOpen = document.getElementById(
    'cert-modal-mobile-open'
  ) as HTMLAnchorElement | null;
  const modalLoading = document.getElementById('cert-modal-loading');
  const modalNavContainer = document.getElementById('cert-modal-nav-container');
  const modalDownloadAll = document.getElementById(
    'cert-modal-download-all'
  ) as HTMLButtonElement | null;

  if (!modal) return;
  if (modal.open) {
    modal.close();
  }
  if (modalIframe) modalIframe.src = 'about:blank';
  if (modalDownload) {
    modalDownload.href = '#';
    modalDownload.removeAttribute('download');
  }
  if (modalExternal) {
    modalExternal.href = '#';
  }
  if (modalMobileOpen) {
    modalMobileOpen.href = '#';
  }
  if (modalLoading) modalLoading.classList.remove('hidden');
  if (modalNavContainer) modalNavContainer.classList.add('hidden');
  if (modalDownloadAll) modalDownloadAll.classList.add('hidden');
  currentDocsList = [];
  document.body.classList.remove('overflow-hidden');

  try {
    const url = new URL(window.location.href);
    if (url.searchParams.has('doc') || url.searchParams.has('cert')) {
      url.searchParams.delete('doc');
      url.searchParams.delete('cert');
      window.history.replaceState({}, '', url.pathname + url.search + url.hash);
    }
  } catch {
    // ignore
  }
}

/**
 * Checks URL search parameters for modal deep links (?doc=<id> or ?cert=<id>).
 */
export function checkUrlDeepLink(): void {
  try {
    const docRegistryEl = document.getElementById('doc-registry-data');
    if (!docRegistryEl || !docRegistryEl.textContent) return;
    const registry: Record<string, CertificateRegistryItem> = JSON.parse(
      docRegistryEl.textContent
    );

    const params = new URLSearchParams(window.location.search);
    const targetId = params.get('doc') || params.get('cert');
    if (targetId && registry[targetId]) {
      const item = registry[targetId];
      openCertificateModal(
        item.url,
        item.title,
        item.subtitle,
        item.docs ? JSON.stringify(item.docs) : undefined
      );
    }
  } catch (e) {
    console.error('Error processing modal deep link:', e);
  }
}

/**
 * Initializes all modal event handlers and triggers across the page.
 */
export function initCertificateModal(): void {
  const modal = document.getElementById(
    'certificate-modal'
  ) as HTMLDialogElement | null;
  if (!modal) return;
  if (modal.dataset.bound === 'true') return;
  modal.dataset.bound = 'true';

  const modalContainer = document.getElementById('cert-modal-container');
  const closeTriggers = modal.querySelectorAll('.cert-modal-close-trigger');
  const modalClose = document.getElementById('cert-modal-close');
  const modalDownload = document.getElementById(
    'cert-modal-download'
  ) as HTMLAnchorElement | null;
  const modalDownloadAll = document.getElementById(
    'cert-modal-download-all'
  ) as HTMLButtonElement | null;
  const modalDownloadAllText = document.getElementById(
    'cert-modal-download-all-text'
  );
  const modalExternal = document.getElementById(
    'cert-modal-external'
  ) as HTMLAnchorElement | null;
  const modalMobileOpen = document.getElementById(
    'cert-modal-mobile-open'
  ) as HTMLAnchorElement | null;
  const modalIframe = document.getElementById(
    'cert-modal-iframe'
  ) as HTMLIFrameElement | null;
  const modalLoading = document.getElementById('cert-modal-loading');
  const modalTitle = document.getElementById('cert-modal-title');

  // Close Buttons (mobile & desktop)
  closeTriggers.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeCertificateModal();
    });
  });
  modalClose?.addEventListener('click', (e) => {
    e.stopPropagation();
    closeCertificateModal();
  });

  // Backdrop click
  modal.addEventListener('click', (e) => {
    if (!modalContainer) return;
    const rect = modalContainer.getBoundingClientRect();
    const isInDialog =
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width;
    if (!isInDialog) {
      closeCertificateModal();
    }
  });

  // Native cancel (Esc key)
  modal.addEventListener('cancel', () => {
    closeCertificateModal();
  });

  // Iframe loaded
  modalIframe?.addEventListener('load', () => {
    if (
      modalLoading &&
      modalIframe.src &&
      !modalIframe.src.endsWith('about:blank')
    ) {
      modalLoading.classList.add('hidden');
    }
  });

  // Prevent default if download/external links not configured
  [modalDownload, modalExternal, modalMobileOpen].forEach((link) => {
    link?.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#' || href === 'about:blank') {
        e.preventDefault();
      }
    });
  });

  // Batch ZIP Download
  modalDownloadAll?.addEventListener('click', async () => {
    if (currentDocsList.length === 0) return;
    const originalText = modalDownloadAllText?.textContent || 'ZIP';
    modalDownloadAll.disabled = true;

    try {
      const currentTitle = modalTitle?.textContent?.trim() || 'Certificados';
      await downloadDocsZip(currentDocsList, currentTitle, (status) => {
        if (modalDownloadAllText) modalDownloadAllText.textContent = status;
      });
    } catch {
      // handled inside downloadDocsZip
    } finally {
      setTimeout(() => {
        if (modalDownloadAllText)
          modalDownloadAllText.textContent = originalText;
        if (modalDownloadAll) modalDownloadAll.disabled = false;
      }, 2500);
    }
  });

  // Document trigger delegation across the whole document
  document.addEventListener('click', (e) => {
    const target = (e.target as HTMLElement).closest(
      '[data-doc-url], [data-docs]'
    ) as HTMLElement | null;
    if (!target) return;

    e.preventDefault();
    const url = target.getAttribute('data-doc-url') || '';
    const title = target.getAttribute('data-doc-title') || 'Documento';
    const subtitle = target.getAttribute('data-doc-subtitle') || '';
    const docs = target.getAttribute('data-docs') || undefined;

    if (url || docs) {
      openCertificateModal(url, title, subtitle, docs);
    }
  });

  // Deep-link check
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkUrlDeepLink);
  } else {
    checkUrlDeepLink();
  }
}
