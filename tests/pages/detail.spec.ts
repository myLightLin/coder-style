import { beforeEach, describe, expect, it, vi } from 'vitest';

import { buildDetailViewModel, createDetailPage, toggleFavoriteState } from '@/pages/detail/index';
import { __resetStorage, isFavorite } from '@/utils/storage';
import { getOutfitById } from '@/services/recommend';

describe('detail page', () => {
  beforeEach(() => {
    __resetStorage();
    vi.stubGlobal('wx', {
      reLaunch: vi.fn()
    });
  });

  it('shows empty state for invalid outfit id', () => {
    const viewModel = buildDetailViewModel('missing-id');
    expect(viewModel.outfit).toBeNull();
    expect(viewModel.errorTitle).toContain('不存在');
  });

  it('toggles favorite status for valid outfit', () => {
    const outfit = getOutfitById('commute-minimal-01');
    expect(outfit).toBeTruthy();
    expect(toggleFavoriteState(outfit!)).toBe(true);
    expect(isFavorite('commute-minimal-01')).toBe(true);
  });

  it('handles page actions for valid and invalid states', () => {
    const page = {
      ...createDetailPage(),
      setData(update: Record<string, any>) {
        this.data = { ...this.data, ...update };
      }
    };

    page.onLoad({ outfitId: 'commute-minimal-01' });
    expect(page.data.outfit?.id).toBe('commute-minimal-01');
    page.onFavoriteTap();
    expect(page.data.favorite).toBe(true);

    page.setData({ outfit: null });
    page.onFavoriteTap();
    page.goHome();
    expect(wx.reLaunch).toHaveBeenCalledWith({ url: '/pages/home/index' });
  });
});
