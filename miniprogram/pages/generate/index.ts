import { budgetOptions, sceneOptions, styleOptions } from '@/data/options';
import { getLastPreference, saveLastPreference } from '@/utils/storage';
import type { UserPreferenceInput } from '@/types/outfit';

function getInitialForm(): UserPreferenceInput {
  return (
    getLastPreference() ?? {
      scene: 'commute',
      budgetLevel: 'medium',
      stylePreference: 'minimal',
      acceptFormalUpgrade: false
    }
  );
}

export function createGeneratePage() {
  return {
    data: {
      sceneOptions,
      budgetOptions,
      styleOptions,
      form: getInitialForm()
    },
    onLoad(query: Record<string, string>) {
      if (query.scene) {
        this.setData({
          'form.scene': query.scene
        });
      }
    },
    setScene(event: WechatMiniprogram.BaseEvent<{ value: string }>) {
      this.setData({ 'form.scene': event.currentTarget.dataset.value });
    },
    setBudget(event: WechatMiniprogram.BaseEvent<{ value: string }>) {
      this.setData({ 'form.budgetLevel': event.currentTarget.dataset.value });
    },
    setStyle(event: WechatMiniprogram.BaseEvent<{ value: string }>) {
      this.setData({ 'form.stylePreference': event.currentTarget.dataset.value });
    },
    toggleFormal(event: WechatMiniprogram.SwitchChange) {
      this.setData({ 'form.acceptFormalUpgrade': event.detail.value });
    },
    submit() {
      saveLastPreference(this.data.form);
      const { scene, budgetLevel, stylePreference, acceptFormalUpgrade } = this.data.form;
      const query = `scene=${scene}&budgetLevel=${budgetLevel}&stylePreference=${stylePreference}&acceptFormalUpgrade=${String(acceptFormalUpgrade)}`;
      wx.navigateTo({ url: `/pages/results/index?mode=generated&${query}` });
    }
  };
}

/* c8 ignore start */
if (typeof Page === 'function') {
  Page(createGeneratePage());
}
/* c8 ignore stop */
