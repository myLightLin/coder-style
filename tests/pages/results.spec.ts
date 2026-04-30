import { beforeEach, describe, expect, it, vi } from 'vitest';

import { buildDetailUrl, buildResultsViewModel, createResultsPage, parseResultsQuery } from '@/pages/results/index';
import { outfitPlans } from '@/data/outfits';

describe('results page', () => {
  beforeEach(() => {
    vi.stubGlobal('wx', {
      navigateTo: vi.fn()
    });
  });

  it('parses generated query into filters', () => {
    expect(
      parseResultsQuery({
        mode: 'generated',
        scene: 'commute',
        budgetLevel: 'medium',
        stylePreference: 'minimal',
        acceptFormalUpgrade: 'true'
      })
    ).toEqual({
      scene: 'commute',
      budgetLevel: 'medium',
      stylePreference: 'minimal',
      acceptFormalUpgrade: true
    });
  });

  it('builds sample mode without filters', () => {
    const viewModel = buildResultsViewModel({ mode: 'sample' });
    expect(viewModel.filters).toBeNull();
    expect(viewModel.items).toHaveLength(3);
    expect(viewModel.sampleHint).toContain('当前为示例数据');
  });

  it('builds generated mode summary and fallback copy', () => {
    const original = [...outfitPlans];
    outfitPlans.splice(
      0,
      outfitPlans.length,
      ...original.filter((item) => ['weekend-relaxed-01', 'weekend-relaxed-02', 'date-neat-02'].includes(item.id))
    );

    try {
      const viewModel = buildResultsViewModel({
        mode: 'generated',
        scene: 'weekend',
        budgetLevel: 'high',
        stylePreference: 'commuter',
        acceptFormalUpgrade: 'false'
      });
      expect(viewModel.filterSummary).toContain('周末外出');
      expect(viewModel.emptyState).not.toBe('');
    } finally {
      outfitPlans.splice(0, outfitPlans.length, ...original);
    }
  });

  it('returns null filters when generated query is incomplete', () => {
    expect(parseResultsQuery({ mode: 'generated', scene: 'commute' })).toBeNull();
  });

  it('opens detail page from card event', () => {
    const page = createResultsPage();
    page.data.filters = {
      scene: 'client',
      budgetLevel: 'medium',
      stylePreference: 'minimal',
      acceptFormalUpgrade: false
    };
    page.openDetail({ detail: { outfitId: 'commute-minimal-01' } } as any);
    expect(wx.navigateTo).toHaveBeenCalledWith({
      url: '/pages/detail/index?outfitId=commute-minimal-01&scene=client&budgetLevel=medium&stylePreference=minimal'
    });
  });

  it('builds fallback detail url when filters are missing', () => {
    expect(buildDetailUrl('commute-minimal-01', null)).toBe('/pages/detail/index?outfitId=commute-minimal-01');
  });

  it('sets data on load', () => {
    const page = {
      ...createResultsPage(),
      setData(update: Record<string, any>) {
        this.data = { ...this.data, ...update };
      }
    };
    page.onLoad({ mode: 'sample' });
    expect(page.data.items).toHaveLength(3);
  });
});
