import { STORAGE_KEYS } from '@/utils/constants';
import type { FavoriteRecord, HistoryRecord, LastPreferenceRecord, UserPreferenceInput } from '@/types/outfit';

interface StorageLike {
  getStorageSync(key: string): unknown;
  setStorageSync(key: string, value: unknown): void;
}

const memoryStorage = new Map<string, unknown>();

function getStorage(): StorageLike {
  if (typeof wx !== 'undefined' && typeof wx.getStorageSync === 'function' && typeof wx.setStorageSync === 'function') {
    return wx;
  }

  return {
    getStorageSync(key: string) {
      return memoryStorage.get(key);
    },
    setStorageSync(key: string, value: unknown) {
      memoryStorage.set(key, value);
    }
  };
}

function readList<T>(key: string): T[] {
  const value = getStorage().getStorageSync(key);
  return Array.isArray(value) ? (value as T[]) : [];
}

export function getFavorites(): FavoriteRecord[] {
  return readList<FavoriteRecord>(STORAGE_KEYS.favorites);
}

export function saveFavorite(outfitId: string, savedAt: string = new Date().toISOString()): FavoriteRecord[] {
  const next = [{ outfitId, savedAt }, ...getFavorites().filter((item) => item.outfitId !== outfitId)];
  getStorage().setStorageSync(STORAGE_KEYS.favorites, next);
  return next;
}

export function isFavorite(outfitId: string): boolean {
  return getFavorites().some((item) => item.outfitId === outfitId);
}

export function getHistory(): HistoryRecord[] {
  return readList<HistoryRecord>(STORAGE_KEYS.history);
}

export function saveHistory(outfitId: string, viewedAt: string = new Date().toISOString()): HistoryRecord[] {
  const next = [{ outfitId, viewedAt }, ...getHistory().filter((item) => item.outfitId !== outfitId)].slice(0, 5);
  getStorage().setStorageSync(STORAGE_KEYS.history, next);
  return next;
}

export function saveLastPreference(input: UserPreferenceInput, updatedAt: string = new Date().toISOString()): LastPreferenceRecord {
  const record = { ...input, updatedAt };
  getStorage().setStorageSync(STORAGE_KEYS.lastPreference, record);
  return record;
}

export function getLastPreference(): LastPreferenceRecord | null {
  const value = getStorage().getStorageSync(STORAGE_KEYS.lastPreference);
  return value && typeof value === 'object' ? (value as LastPreferenceRecord) : null;
}

export function __resetStorage(): void {
  memoryStorage.clear();
}
