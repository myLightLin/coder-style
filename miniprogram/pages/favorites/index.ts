import { defaultContent } from '@/data/default-content';
import { outfitPlans } from '@/data/outfits';
import { getFavorites, getHistory } from '@/utils/storage';

export function buildFavoritesViewModel() {
  const favorites = getFavorites()
    .map((record) => outfitPlans.find((item) => item.id === record.outfitId))
    .filter(Boolean);
  const history = getHistory()
    .map((record) => outfitPlans.find((item) => item.id === record.outfitId))
    .filter(Boolean);

  return {
    favorites,
    history,
    emptyTitle: defaultContent.emptyFavoritesTitle,
    emptyDescription: defaultContent.emptyFavoritesDescription
  };
}

export function createFavoritesPage() {
  return {
    data: buildFavoritesViewModel(),
    onShow() {
      this.setData(buildFavoritesViewModel());
    },
    goGenerate() {
      wx.navigateTo({ url: '/pages/generate/index' });
    }
  };
}

/* c8 ignore start */
if (typeof Page === 'function') {
  Page(createFavoritesPage());
}
/* c8 ignore stop */
