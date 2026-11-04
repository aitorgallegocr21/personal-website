import { describe, it, expect, vi, beforeEach } from 'vitest';
import { copyToClipboard } from '@/lib/clipboard';

describe('clipboard utilities', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('returns false when text is empty', async () => {
    const result = await copyToClipboard('');
    expect(result).toBe(false);
  });

  it('uses navigator.clipboard.writeText when available', async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal('navigator', {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    const result = await copyToClipboard('test@example.com');
    expect(result).toBe(true);
    expect(writeTextMock).toHaveBeenCalledWith('test@example.com');
  });

  it('handles writeText rejection gracefully', async () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const writeTextMock = vi
      .fn()
      .mockRejectedValue(new Error('Permission denied'));
    vi.stubGlobal('navigator', {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    const result = await copyToClipboard('test@example.com');
    expect(result).toBe(false);
    expect(consoleErrorSpy).toHaveBeenCalled();
  });
});
