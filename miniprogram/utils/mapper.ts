import { budgetOptions, sceneOptions, styleOptions } from '@/data/options';
import type { BudgetLevel, Scene, StylePreference } from '@/types/outfit';

export const sceneLabelMap = Object.fromEntries(sceneOptions.map((item) => [item.value, item.label])) as Record<Scene, string>;
export const budgetLabelMap = Object.fromEntries(budgetOptions.map((item) => [item.value, item.label])) as Record<BudgetLevel, string>;
export const styleLabelMap = Object.fromEntries(styleOptions.map((item) => [item.value, item.label])) as Record<StylePreference, string>;
