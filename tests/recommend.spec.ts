import { describe, expect, it } from 'vitest';

import { outfitPlans } from '@/data/outfits';
import { getSampleRecommendations, recommendOutfits, getTargetFormality } from '@/services/recommend';

describe('recommend service', () => {
  it('maps upgraded formality correctly', () => {
    expect(
      getTargetFormality({
        scene: 'commute',
        budgetLevel: 'medium',
        stylePreference: 'minimal',
        acceptFormalUpgrade: true
      })
    ).toBe(4);

    expect(
      getTargetFormality({
        scene: 'weekend',
        budgetLevel: 'medium',
        stylePreference: 'minimal',
        acceptFormalUpgrade: true
      })
    ).toBe(3);
  });

  it('returns top results ordered by score', () => {
    const items = recommendOutfits({
      scene: 'interview',
      budgetLevel: 'medium',
      stylePreference: 'commuter',
      acceptFormalUpgrade: false
    });

    expect(items).toHaveLength(3);
    expect(items[0].outfitId).toBe('interview-safe-01');
    expect(items[0].score).toBeGreaterThanOrEqual(items[1].score);
  });

  it('applies fallback when strict filters are not enough', () => {
    const original = [...outfitPlans];
    outfitPlans.splice(
      0,
      outfitPlans.length,
      ...original.filter((item) => ['weekend-relaxed-01', 'weekend-relaxed-02', 'date-neat-02'].includes(item.id))
    );

    try {
      const items = recommendOutfits({
        scene: 'weekend',
        budgetLevel: 'high',
        stylePreference: 'commuter',
        acceptFormalUpgrade: false
      });

      expect(items).toHaveLength(3);
      expect(items.some((item) => item.fallbackApplied)).toBe(true);
    } finally {
      outfitPlans.splice(0, outfitPlans.length, ...original);
    }
  });

  it('returns sample results for homepage preview flow', () => {
    const items = getSampleRecommendations();
    expect(items).toHaveLength(3);
    expect(items[0].scoreLabel).toBe('92%');
  });
});
