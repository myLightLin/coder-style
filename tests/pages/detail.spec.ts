import { beforeEach, describe, expect, it, vi } from 'vitest';

import { buildDetailViewModel, createDetailPage, toggleFavoriteState } from '@/pages/detail/index';
import { __resetStorage, isFavorite } from '@/utils/storage';
import { getOutfitById } from '@/services/recommend';

describe('detail page', () => {
  beforeEach(() => {
    __resetStorage();
    vi.stubGlobal('wx', {
      reLaunch: vi.fn(),
      showToast: vi.fn()
    });
  });

  it('shows empty state for invalid outfit id', () => {
    const viewModel = buildDetailViewModel({ outfitId: 'missing-id' });
    expect(viewModel.outfit).toBeNull();
    expect(viewModel.errorTitle).toContain('不存在');
  });

  it('builds explanation from current filters when provided', () => {
    const viewModel = buildDetailViewModel({
      outfitId: 'commute-minimal-01',
      scene: 'client',
      budgetLevel: 'medium',
      stylePreference: 'minimal'
    });
    expect(viewModel.summary).toContain('见客户');
    expect(viewModel.matchedReasons[0]).toContain('边界感');
    expect(viewModel.matchedReasons[2]).toContain('预算 300-800');
    expect(viewModel.pieceCards).toHaveLength(4);
    expect(viewModel.outfit?.heroImage).toBe('/assets/primary-visuals/detail-primary.png');
    expect(viewModel.pieceCards[0]?.name).toBe('海军蓝轻外套');
    expect(viewModel.pieceCards[0]?.image).toContain('https://');
  });

  it('toggles favorite status for valid outfit', () => {
    const outfit = getOutfitById('commute-minimal-01');
    expect(outfit).toBeTruthy();
    expect(toggleFavoriteState(outfit!)).toBe(true);
    expect(isFavorite('commute-minimal-01')).toBe(true);
    expect(wx.showToast).toHaveBeenCalledWith({ title: '已保存到我的', icon: 'success' });
  });

  it('handles page actions for valid and invalid states', () => {
    const page = {
      ...createDetailPage(),
      setData(update: Record<string, any>) {
        this.data = { ...this.data, ...update };
      }
    };

    page.onLoad({
      outfitId: 'commute-minimal-01',
      scene: 'client',
      budgetLevel: 'medium',
      stylePreference: 'minimal'
    });
    expect(page.data.outfit?.id).toBe('commute-minimal-01');
    expect(page.data.summary).toContain('见客户');
    page.onFavoriteTap();
    expect(page.data.favorite).toBe(true);

    page.setData({ outfit: null });
    page.onFavoriteTap();
    page.goHome();
    expect(wx.reLaunch).toHaveBeenCalledWith({ url: '/pages/home/index' });
  });
});
