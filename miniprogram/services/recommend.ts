import { outfitPlans } from '@/data/outfits';
import { buildMatchedReasons } from '@/services/explain';
import type { OutfitPlan, RecommendationResult, Scene, UserPreferenceInput } from '@/types/outfit';

export const SCENE_FORMALITY_MAP = {
  commute: 3,
  interview: 4,
  client: 4,
  weekend: 2,
  date: 3
} as const;

const ADJACENT_SCENE_MAP: Record<Scene, Scene[]> = {
  commute: ['client'],
  interview: ['client'],
  client: ['commute', 'interview'],
  weekend: ['date'],
  date: ['weekend']
};

export function getTargetFormality(input: UserPreferenceInput): number {
  const base = SCENE_FORMALITY_MAP[input.scene];
  if (!input.acceptFormalUpgrade) {
    return base;
  }

  if (input.scene === 'interview' || input.scene === 'client') {
    return base;
  }

  if (input.scene === 'weekend') {
    return Math.min(base + 1, 3);
  }

  return Math.min(base + 1, 4);
}

function getSceneScore(plan: OutfitPlan, scene: Scene, relaxed: boolean): number {
  if (plan.sceneTags.includes(scene)) {
    return 50;
  }

  if (relaxed && ADJACENT_SCENE_MAP[scene].some((item) => plan.sceneTags.includes(item))) {
    return 35;
  }

  return 0;
}

function getStyleScore(plan: OutfitPlan, style: UserPreferenceInput['stylePreference']): number {
  if (plan.styleTags.includes(style)) {
    return 20;
  }

  if (plan.styleTags.includes('minimal') || plan.styleTags.includes('commuter')) {
    return 10;
  }

  return 0;
}

function getBudgetScore(plan: OutfitPlan, budget: UserPreferenceInput['budgetLevel'], relaxed: boolean): number {
  if (plan.budgetTags.includes(budget)) {
    return 10;
  }

  return relaxed ? 5 : 0;
}

function getFormalityScore(plan: OutfitPlan, targetFormality: number, relaxed: boolean): number {
  const diff = Math.abs(plan.formality - targetFormality);
  if (diff === 0) {
    return 20;
  }
  if (diff === 1 && relaxed) {
    return 10;
  }
  return 0;
}

function rankOutfits(
  input: UserPreferenceInput,
  options: { relaxBudget: boolean; relaxFormality: boolean; relaxScene: boolean }
): Array<RecommendationResult & { outfit: OutfitPlan }> {
  const targetFormality = getTargetFormality(input);

  return outfitPlans
    .map((outfit) => {
      const sceneScore = getSceneScore(outfit, input.scene, options.relaxScene);
      if (sceneScore === 0) {
        return {
          outfit,
          outfitId: outfit.id,
          score: 0,
          scoreLabel: '72%',
          matchedReasons: buildMatchedReasons(input.scene, input.stylePreference, input.budgetLevel),
          fallbackApplied: options.relaxBudget || options.relaxFormality || options.relaxScene
        };
      }

      const score =
        sceneScore +
        getStyleScore(outfit, input.stylePreference) +
        getBudgetScore(outfit, input.budgetLevel, options.relaxBudget) +
        getFormalityScore(outfit, targetFormality, options.relaxFormality) +
        (outfit.isSample ? 5 : 0);

      return {
        outfit,
        outfitId: outfit.id,
        score,
        scoreLabel: `${Math.min(99, Math.max(72, score))}%`,
        matchedReasons: buildMatchedReasons(input.scene, input.stylePreference, input.budgetLevel),
        fallbackApplied: options.relaxBudget || options.relaxFormality || options.relaxScene
      };
    })
    .filter((item) => item.score > 0)
    .sort((left, right) => right.score - left.score || Number(right.outfit.isSample) - Number(left.outfit.isSample))
    .slice(0, 3);
}

export function recommendOutfits(input: UserPreferenceInput): Array<RecommendationResult & { outfit: OutfitPlan }> {
  const strict = rankOutfits(input, { relaxBudget: false, relaxFormality: false, relaxScene: false });
  if (strict.length >= 3) {
    return strict;
  }

  const relaxedBudget = rankOutfits(input, { relaxBudget: true, relaxFormality: false, relaxScene: false });
  if (relaxedBudget.length >= 3) {
    return relaxedBudget;
  }

  const relaxedFormality = rankOutfits(input, { relaxBudget: true, relaxFormality: true, relaxScene: false });
  if (relaxedFormality.length >= 3) {
    return relaxedFormality;
  }

  const relaxedScene = rankOutfits(input, { relaxBudget: true, relaxFormality: true, relaxScene: true });
  if (relaxedScene.length > 0) {
    return relaxedScene;
  }

  return outfitPlans.slice(0, 3).map((outfit) => ({
    outfit,
    outfitId: outfit.id,
    score: 60,
    scoreLabel: '72%',
    matchedReasons: buildMatchedReasons(input.scene, input.stylePreference, input.budgetLevel),
    fallbackApplied: true
  }));
}

export function getSampleRecommendations(): Array<RecommendationResult & { outfit: OutfitPlan }> {
  return outfitPlans
    .filter((item) => item.isSample)
    .slice(0, 3)
    .map((outfit, index) => ({
      outfit,
      outfitId: outfit.id,
      score: 92 - index * 4,
      scoreLabel: `${92 - index * 4}%`,
      matchedReasons: outfit.reason,
      fallbackApplied: false
    }));
}

export function getOutfitById(outfitId: string): OutfitPlan | undefined {
  return outfitPlans.find((item) => item.id === outfitId);
}
