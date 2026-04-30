import { beforeEach, describe, expect, it } from 'vitest';

import {
  __resetStorage,
  getFavorites,
  getHistory,
  getLastPreference,
  isFavorite,
  saveFavorite,
  saveHistory,
  saveLastPreference
} from '@/utils/storage';

describe('storage utils', () => {
  beforeEach(() => {
    __resetStorage();
  });

  it('deduplicates favorites', () => {
    saveFavorite('commute-minimal-01', '2026-04-30T00:00:00.000Z');
    saveFavorite('commute-minimal-01', '2026-04-30T00:01:00.000Z');

    expect(getFavorites()).toHaveLength(1);
    expect(isFavorite('commute-minimal-01')).toBe(true);
  });

  it('limits history to five items', () => {
    ['1', '2', '3', '4', '5', '6'].forEach((id, index) => {
      saveHistory(id, `2026-04-30T00:0${index}:00.000Z`);
    });

    expect(getHistory()).toHaveLength(5);
    expect(getHistory()[0].outfitId).toBe('6');
  });

  it('stores last preference', () => {
    saveLastPreference({
      scene: 'client',
      budgetLevel: 'high',
      stylePreference: 'smart-casual',
      acceptFormalUpgrade: true
    });

    expect(getLastPreference()?.scene).toBe('client');
  });
});
