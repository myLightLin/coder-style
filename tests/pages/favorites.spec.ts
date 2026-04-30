import { beforeEach, describe, expect, it, vi } from 'vitest';

import { buildFavoritesViewModel, createFavoritesPage } from '@/pages/favorites/index';
import { __resetStorage, saveFavorite, saveHistory } from '@/utils/storage';

function createPageHarness<T extends Record<string, any>>(page: T) {
  return {
    ...page,
    setData(update: Record<string, any>) {
      this.data = { ...this.data, ...update };
    }
  };
}

describe('favorites page', () => {
  beforeEach(() => {
    __resetStorage();
    vi.stubGlobal('wx', {
      navigateTo: vi.fn()
    });
  });

  it('builds favorites and history lists from storage', () => {
    saveFavorite('commute-minimal-01');
    saveHistory('interview-safe-01');
    const viewModel = buildFavoritesViewModel();
    expect(viewModel.favorites).toHaveLength(1);
    expect(viewModel.history).toHaveLength(1);
  });

  it('refreshes on show and links to generate page', () => {
    const page = createPageHarness(createFavoritesPage());
    saveFavorite('commute-minimal-01');
    page.onShow();
    expect(page.data.favorites).toHaveLength(1);
    page.goGenerate();
    expect(wx.navigateTo).toHaveBeenCalledWith({ url: '/pages/generate/index' });
  });
});
