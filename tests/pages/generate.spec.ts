import { beforeEach, describe, expect, it, vi } from 'vitest';

import { createGeneratePage } from '@/pages/generate/index';
import { __resetStorage, getLastPreference } from '@/utils/storage';

function createPageHarness<T extends Record<string, any>>(page: T) {
  return {
    ...page,
    setData(update: Record<string, any>) {
      Object.entries(update).forEach(([key, value]) => {
        const segments = key.split('.');
        let cursor = this.data;
        while (segments.length > 1) {
          const segment = segments.shift() as string;
          cursor[segment] = cursor[segment] ?? {};
          cursor = cursor[segment];
        }
        cursor[segments[0]] = value;
      });
    }
  };
}

describe('generate page', () => {
  beforeEach(() => {
    __resetStorage();
    vi.stubGlobal('wx', {
      navigateTo: vi.fn()
    });
  });

  it('accepts quick scene on load', () => {
    const page = createPageHarness(createGeneratePage());
    page.onLoad({ scene: 'client' });
    expect(page.data.form.scene).toBe('client');
  });

  it('updates form state and navigates with saved preference', () => {
    const page = createPageHarness(createGeneratePage());
    page.setScene({ currentTarget: { dataset: { value: 'interview' } } } as any);
    page.setBudget({ currentTarget: { dataset: { value: 'high' } } } as any);
    page.setStyle({ currentTarget: { dataset: { value: 'smart-casual' } } } as any);
    page.toggleFormal({ detail: { value: true } } as any);
    page.submit();

    expect(getLastPreference()?.scene).toBe('interview');
    expect(wx.navigateTo).toHaveBeenCalledWith({
      url: '/pages/results/index?mode=generated&scene=interview&budgetLevel=high&stylePreference=smart-casual&acceptFormalUpgrade=true'
    });
  });
});
