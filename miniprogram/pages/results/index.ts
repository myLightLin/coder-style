import { defaultContent } from '@/data/default-content';
import { recommendOutfits, getSampleRecommendations } from '@/services/recommend';
import { getResultsFeaturedOutfit } from '@/data/primary-visuals';
import type { BudgetLevel, Scene, StylePreference, UserPreferenceInput } from '@/types/outfit';
import { budgetLabelMap, sceneLabelMap, styleLabelMap } from '@/utils/mapper';
import { getOutfitTemperatureLabel, getPieceBadge } from '@/utils/outfit-display';

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
  const featured = items[0] ?? null;
  const featuredOutfit = getResultsFeaturedOutfit(featured?.outfit ?? null);

  return {
    filters,
    items,
    featured,
    featuredOutfit,
    featuredTemperature: featuredOutfit ? getOutfitTemperatureLabel(featuredOutfit) : '',
    pieceRows:
      featuredOutfit?.pieces.map((piece) => ({
        ...piece,
        badge: getPieceBadge(piece)
      })) ?? [],
    visualThumbs:
      featuredOutfit?.pieces.slice(0, 3).map((piece) => ({
        name: piece.name,
        badge: getPieceBadge(piece),
        image: piece.image
      })) ?? [],
    sampleHint: filters ? '' : defaultContent.sampleResultsHint,
    emptyState: items.some((item) => item.fallbackApplied) ? defaultContent.emptyResultsDescription : '',
    filterSummary: filters
      ? `${sceneLabelMap[filters.scene]} / ${budgetLabelMap[filters.budgetLevel]} / ${styleLabelMap[filters.stylePreference]}`
      : '示例方案'
  };
}

export function buildDetailUrl(outfitId: string, filters: UserPreferenceInput | null) {
  const params = [`outfitId=${outfitId}`];

  if (filters) {
    params.push(`scene=${filters.scene}`);
    params.push(`budgetLevel=${filters.budgetLevel}`);
    params.push(`stylePreference=${filters.stylePreference}`);
  }

  return `/pages/detail/index?${params.join('&')}`;
}

export function createResultsPage() {
  return {
    data: {
      filters: null,
      items: [],
      featured: null,
      featuredOutfit: null,
      featuredTemperature: '',
      pieceRows: [],
      visualThumbs: [],
      filterSummary: '',
      sampleHint: '',
      emptyState: ''
    },
    onLoad(query: Record<string, string>) {
      this.setData(buildResultsViewModel(query));
    },
    openDetail(event: WechatMiniprogram.CustomEvent<{ outfitId: string }>) {
      wx.navigateTo({ url: buildDetailUrl(event.detail.outfitId, this.data.filters) });
    },
    openPiece(event: WechatMiniprogram.BaseEvent<{ outfitId: string }>) {
      wx.navigateTo({ url: buildDetailUrl(event.currentTarget.dataset.outfitId, this.data.filters) });
    },
    openFeaturedDetail() {
      if (!this.data.featured) {
        return;
      }
      wx.navigateTo({ url: buildDetailUrl(this.data.featured.outfitId, this.data.filters) });
    },
    goHome() {
      wx.reLaunch({ url: '/pages/home/index' });
    }
  };
}

/* c8 ignore start */
if (typeof Page === 'function') {
  Page(createResultsPage());
}
/* c8 ignore stop */
