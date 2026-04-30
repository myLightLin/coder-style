import { defaultContent } from '@/data/default-content';
import { buildSummary } from '@/services/explain';
import { getOutfitById } from '@/services/recommend';
import { isFavorite, saveFavorite, saveHistory } from '@/utils/storage';
import type { OutfitPlan } from '@/types/outfit';

export function buildDetailViewModel(outfitId: string) {
  const outfit = getOutfitById(outfitId);
  if (!outfit) {
    return {
      outfit: null,
      summary: '',
      favorite: false,
      errorTitle: defaultContent.detailErrorTitle,
      errorDescription: defaultContent.detailErrorDescription
    };
  }

  saveHistory(outfit.id);

  return {
    outfit,
    summary: buildSummary(outfit.sceneTags[0], outfit.styleTags[0]),
    favorite: isFavorite(outfit.id),
    errorTitle: '',
    errorDescription: ''
  };
}

export function toggleFavoriteState(outfit: OutfitPlan) {
  saveFavorite(outfit.id);
  return true;
}

export function createDetailPage() {
  return {
    data: {
      outfit: null as OutfitPlan | null,
      summary: '',
      favorite: false,
      errorTitle: '',
      errorDescription: ''
    },
    onLoad(query: Record<string, string>) {
      this.setData(buildDetailViewModel(query.outfitId));
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
