import { defaultContent } from '@/data/default-content';
import { recommendOutfits, getSampleRecommendations } from '@/services/recommend';
import type { BudgetLevel, Scene, StylePreference, UserPreferenceInput } from '@/types/outfit';
import { budgetLabelMap, sceneLabelMap, styleLabelMap } from '@/utils/mapper';

export function parseResultsQuery(query: Record<string, string>): UserPreferenceInput | null {
  if (query.mode === 'sample') {
    return null;
  }

  if (!query.scene || !query.budgetLevel || !query.stylePreference) {
    return null;
  }

  return {
    scene: query.scene as Scene,
    budgetLevel: query.budgetLevel as BudgetLevel,
    stylePreference: query.stylePreference as StylePreference,
    acceptFormalUpgrade: query.acceptFormalUpgrade === 'true'
  };
}

export function buildResultsViewModel(query: Record<string, string>) {
  const filters = parseResultsQuery(query);
  const items = filters ? recommendOutfits(filters) : getSampleRecommendations();

  return {
    filters,
    items,
    emptyState: items.some((item) => item.fallbackApplied) ? defaultContent.emptyResultsDescription : '',
    filterSummary: filters
      ? `${sceneLabelMap[filters.scene]} / ${budgetLabelMap[filters.budgetLevel]} / ${styleLabelMap[filters.stylePreference]}`
      : '示例方案'
  };
}

export function createResultsPage() {
  return {
    data: {
      filters: null,
      items: [],
      filterSummary: '',
      emptyState: ''
    },
    onLoad(query: Record<string, string>) {
      this.setData(buildResultsViewModel(query));
    },
    openDetail(event: WechatMiniprogram.CustomEvent<{ outfitId: string }>) {
      wx.navigateTo({ url: `/pages/detail/index?outfitId=${event.detail.outfitId}` });
    }
  };
}

/* c8 ignore start */
if (typeof Page === 'function') {
  Page(createResultsPage());
}
/* c8 ignore stop */
