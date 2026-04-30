import { defaultContent } from '@/data/default-content';
import { outfitPlans } from '@/data/outfits';
import { getHomeFeaturedOutfit } from '@/data/primary-visuals';
import { buildWeatherSummary, getOutfitTemperatureLabel } from '@/utils/outfit-display';

export function buildHomeViewModel() {
  const baseFeaturedSample = outfitPlans.find((item) => item.isSample && item.sceneTags.includes('commute')) ?? outfitPlans[0] ?? null;
  const featuredSample = getHomeFeaturedOutfit(baseFeaturedSample);

  return {
    heroTitle: defaultContent.heroTitle,
    heroSubtitle: defaultContent.heroSubtitle,
    heroHint: defaultContent.heroHint,
    generateButtonText: defaultContent.generateButtonText,
    sampleButtonText: defaultContent.sampleButtonText,
    weather: buildWeatherSummary(),
    coldStartTitle: '还没填写偏好？',
    coldStartHint: '先用一套示例看看效果',
    quickScenes: [
      { label: '上班通勤', scene: 'commute', active: true },
      { label: '周末外出', scene: 'weekend', active: false },
      { label: '见客户', scene: 'client', active: false }
    ],
    featuredSample,
    featuredTemperature: featuredSample ? getOutfitTemperatureLabel(featuredSample) : '',
    featuredTag: featuredSample?.impressionTags[0] ?? ''
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
    handleOpenFavorite(event: WechatMiniprogram.CustomEvent<{ id?: string }>) {
      const outfitId = event.detail.id ?? event.currentTarget.dataset.id;
      if (!outfitId) {
        return;
      }
      wx.navigateTo({ url: `/pages/detail/index?outfitId=${outfitId}` });
    }
  };
}

/* c8 ignore start */
if (typeof Page === 'function') {
  Page(createHomePage());
}
/* c8 ignore stop */
