import { beforeEach, describe, expect, it, vi } from 'vitest';

import { buildHomeViewModel, createHomePage } from '@/pages/home/index';
import { __resetStorage } from '@/utils/storage';

describe('home page', () => {
  beforeEach(() => {
    __resetStorage();
    vi.stubGlobal('wx', {
      navigateTo: vi.fn()
    });
  });

  it('navigates to generate page on primary CTA', () => {
    const page = createHomePage();
    page.handleGenerateTap();
    expect(wx.navigateTo).toHaveBeenCalledWith({ url: '/pages/generate/index' });
  });

  it('navigates to sample results', () => {
    const page = createHomePage();
    page.handleSampleTap();
    expect(wx.navigateTo).toHaveBeenCalledWith({ url: '/pages/results/index?mode=sample' });
  });

  it('builds a home view model without the removed favorites block', () => {
    const viewModel = buildHomeViewModel();
    expect(viewModel.weather.temperature).toBe('22°C');
    expect(viewModel.featuredTag).toBe('清爽低压');
    expect(viewModel.featuredSample?.heroImage).toBe('/assets/primary-visuals/home-primary.png');
    expect('recentFavorites' in viewModel).toBe(false);
  });

  it('supports quick scene and favorite navigation', () => {
    const page = createHomePage();
    page.handleQuickSceneTap({ currentTarget: { dataset: { scene: 'client' } } } as any);
    page.handleOpenFavorite({ detail: { id: 'commute-minimal-01' } } as any);

    expect(wx.navigateTo).toHaveBeenNthCalledWith(1, { url: '/pages/generate/index?scene=client' });
    expect(wx.navigateTo).toHaveBeenNthCalledWith(2, { url: '/pages/detail/index?outfitId=commute-minimal-01' });
  });

  it('refreshes data on show', () => {
    const page = {
      ...createHomePage(),
      setData(update: Record<string, any>) {
        this.data = update;
      }
    };

    page.onShow();
    expect(page.data.heroTitle).toBe('程序员穿搭');
  });
});
