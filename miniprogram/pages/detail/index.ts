import { defaultContent } from '@/data/default-content';
import { getDetailDisplayOutfit } from '@/data/primary-visuals';
import { buildMatchedReasons, buildSummary } from '@/services/explain';
import { getOutfitById } from '@/services/recommend';
import { isFavorite, saveFavorite, saveHistory } from '@/utils/storage';
import type { BudgetLevel, OutfitPlan, Scene, StylePreference } from '@/types/outfit';
import { getPieceBadge } from '@/utils/outfit-display';

type DetailContext = {
  scene: Scene;
  budgetLevel: BudgetLevel;
  stylePreference: StylePreference;
};

function parseDetailContext(query: Record<string, string>): DetailContext | null {
  if (!query.scene || !query.budgetLevel || !query.stylePreference) {
    return null;
  }

  return {
    scene: query.scene as Scene,
    budgetLevel: query.budgetLevel as BudgetLevel,
    stylePreference: query.stylePreference as StylePreference
  };
}

export function buildDetailViewModel(query: Record<string, string>) {
  const context = parseDetailContext(query);
  const baseOutfit = getOutfitById(query.outfitId);
  if (!baseOutfit) {
    return {
      outfit: null,
      summary: '',
      matchedReasons: [],
      favorite: false,
      errorTitle: defaultContent.detailErrorTitle,
      errorDescription: defaultContent.detailErrorDescription
    };
  }

  saveHistory(baseOutfit.id);
  const outfit = getDetailDisplayOutfit(baseOutfit);

  return {
    outfit,
    pieceCards: outfit?.pieces.map((piece) => ({
      ...piece,
      badge: getPieceBadge(piece)
    })) ?? [],
    summary: buildSummary(context?.scene ?? baseOutfit.sceneTags[0], context?.stylePreference ?? baseOutfit.styleTags[0]),
    matchedReasons: context
      ? buildMatchedReasons(context.scene, context.stylePreference, context.budgetLevel)
      : baseOutfit.reason,
    favorite: isFavorite(baseOutfit.id),
    errorTitle: '',
    errorDescription: ''
  };
}

export function toggleFavoriteState(outfit: OutfitPlan) {
  saveFavorite(outfit.id);
  if (typeof wx !== 'undefined' && typeof wx.showToast === 'function') {
    wx.showToast({
      title: '已保存到我的',
      icon: 'success'
    });
  }
  return true;
}

export function createDetailPage() {
  return {
    data: {
      outfit: null as OutfitPlan | null,
      pieceCards: [] as Array<{ name: string; category: string; color: string; badge: string }>,
      summary: '',
      matchedReasons: [] as string[],
      favorite: false,
      errorTitle: '',
      errorDescription: ''
    },
    onLoad(query: Record<string, string>) {
      this.setData(buildDetailViewModel(query));
    },
    onFavoriteTap() {
      if (!this.data.outfit) {
        return;
      }
      this.setData({ favorite: toggleFavoriteState(this.data.outfit) });
    },
    goHome() {
      wx.reLaunch({ url: '/pages/home/index' });
    }
  };
}

/* c8 ignore start */
if (typeof Page === 'function') {
  Page(createDetailPage());
}
/* c8 ignore stop */
