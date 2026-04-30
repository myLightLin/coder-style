import { defaultContent } from '@/data/default-content';
import { outfitPlans } from '@/data/outfits';
import { getFavorites } from '@/utils/storage';
import { getSampleRecommendations } from '@/services/recommend';

export function buildHomeViewModel() {
  const featuredSample = outfitPlans.find((item) => item.isSample && item.sceneTags.includes('commute')) ?? outfitPlans[0] ?? null;
  const favoriteIds = getFavorites().slice(0, 2).map((item) => item.outfitId);
  const recentFavorites = outfitPlans.filter((item) => favoriteIds.includes(item.id));

  return {
    heroTitle: defaultContent.heroTitle,
    heroSubtitle: defaultContent.heroSubtitle,
    heroHint: defaultContent.heroHint,
    generateButtonText: defaultContent.generateButtonText,
    sampleButtonText: defaultContent.sampleButtonText,
    quickScenes: [
      { label: '上班通勤', scene: 'commute' },
      { label: '周末外出', scene: 'weekend' },
      { label: '见客户', scene: 'client' }
    ],
    featuredSample,
    recentFavorites,
    samplePreview: getSampleRecommendations()[0] ?? null
  };
}

export function createHomePage() {
  return {
    data: buildHomeViewModel(),
    onShow() {
      this.setData(buildHomeViewModel());
    },
    handleGenerateTap() {
      wx.navigateTo({ url: '/pages/generate/index' });
    },
    handleSampleTap() {
      wx.navigateTo({ url: '/pages/results/index?mode=sample' });
    },
    handleQuickSceneTap(event: WechatMiniprogram.BaseEvent<{ scene: string }>) {
      wx.navigateTo({ url: `/pages/generate/index?scene=${event.currentTarget.dataset.scene}` });
    },
    handleOpenFavorite(event: WechatMiniprogram.CustomEvent<{ id: string }>) {
      wx.navigateTo({ url: `/pages/detail/index?outfitId=${event.detail.id}` });
    }
  };
}

/* c8 ignore start */
if (typeof Page === 'function') {
  Page(createHomePage());
}
/* c8 ignore stop */
