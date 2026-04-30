export type Scene = 'commute' | 'interview' | 'client' | 'weekend' | 'date';
export type BudgetLevel = 'low' | 'medium' | 'high';
export type StylePreference = 'minimal' | 'commuter' | 'smart-casual';
export type FormalityLevel = 1 | 2 | 3 | 4 | 5;
export type SeasonTag = 'spring' | 'summer' | 'autumn' | 'winter' | 'all';
export type OutfitPieceCategory = 'top' | 'bottom' | 'shoes' | 'outerwear';

export interface UserPreferenceInput {
  scene: Scene;
  budgetLevel: BudgetLevel;
  stylePreference: StylePreference;
  acceptFormalUpgrade: boolean;
}

export interface OutfitPiece {
  category: OutfitPieceCategory;
  name: string;
  color: string;
  note?: string;
  alternatives?: string[];
}

export interface OutfitPlan {
  id: string;
  title: string;
  sceneTags: Scene[];
  budgetTags: BudgetLevel[];
  styleTags: StylePreference[];
  formality: FormalityLevel;
  seasonTags: SeasonTag[];
  impressionTags: string[];
  colorNote: string;
  reason: string[];
  avoidTips: string[];
  tips: string[];
  pieces: OutfitPiece[];
  heroImage?: string;
  isSample: boolean;
}

export interface RecommendationResult {
  outfitId: string;
  score: number;
  scoreLabel: string;
  matchedReasons: string[];
  fallbackApplied: boolean;
}

export interface FavoriteRecord {
  outfitId: string;
  savedAt: string;
}

export interface HistoryRecord {
  outfitId: string;
  viewedAt: string;
}

export interface LastPreferenceRecord extends UserPreferenceInput {
  updatedAt: string;
}

export interface Option<T extends string> {
  label: string;
  value: T;
  description?: string;
}
