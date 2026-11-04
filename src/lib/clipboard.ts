/**
 * Clipboard utilities and interactive button binding.
 * Provides fallback support and visual feedback management.
 */

/**
 * Copies a given text string to the system clipboard using the modern Clipboard API.
 * Returns true if successful, false otherwise.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (!text) return false;

  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    if (typeof document !== 'undefined') {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const legacyDoc = document as unknown as { execCommand?(cmd: string): boolean };
      const successful = Boolean(legacyDoc.execCommand?.('copy'));
      document.body.removeChild(textArea);
      return successful;
    }

    return false;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}

export interface BindCopyButtonOptions {
  getText: () => string | null | undefined;
  labelElement?: HTMLElement | null;
  iconElement?: HTMLElement | null;
  successText?: string;
  successIconHtml?: string;
  durationMs?: number;
}

/**
 * Attaches a click event listener with temporary visual feedback to a copy button.
 * Restores original label and icons after durationMs (default 2000ms).
 */
export function bindCopyButton(
  button: HTMLElement,
  options: BindCopyButtonOptions
): () => void {
  const duration = options.durationMs ?? 2000;
  const originalLabel = options.labelElement?.textContent || '';
  const originalIconHtml = options.iconElement?.innerHTML || '';
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const handleClick = async () => {
    const text = options.getText();
    if (!text) return;

    const success = await copyToClipboard(text);
    if (!success) {
      if (options.labelElement) {
        options.labelElement.textContent = 'Error al copiar';
      }
      setTimeout(() => {
        if (options.labelElement) {
          options.labelElement.textContent = originalLabel;
        }
      }, duration);
      return;
    }

    if (timeoutId) clearTimeout(timeoutId);

    if (options.labelElement && options.successText) {
      options.labelElement.textContent = options.successText;
    }

    if (options.iconElement && options.successIconHtml) {
      options.iconElement.innerHTML = options.successIconHtml;
    }

    button.style.borderColor = 'var(--color-accent)';
    button.style.color = 'var(--color-accent)';
    button.style.backgroundColor = 'var(--color-accent-subtle)';

    timeoutId = setTimeout(() => {
      if (options.labelElement) {
        options.labelElement.textContent = originalLabel;
      }
      if (options.iconElement && options.successIconHtml) {
        options.iconElement.innerHTML = originalIconHtml;
      }
      button.style.borderColor = '';
      button.style.color = '';
      button.style.backgroundColor = '';
      timeoutId = null;
    }, duration);
  };

  button.addEventListener('click', handleClick);
  return () => button.removeEventListener('click', handleClick);
}
