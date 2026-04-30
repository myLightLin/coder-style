import { budgetLabelMap, sceneLabelMap, styleLabelMap } from '@/utils/mapper';
import type { BudgetLevel, Scene, StylePreference } from '@/types/outfit';

const sceneExplanations: Record<Scene, string> = {
  commute: '正式度够用，适合办公室与日常见人。',
  interview: '正式度足够，但不会显得刻意老派。',
  client: '有边界感，也保留技术岗的干净气质。',
  weekend: '轻松但不邋遢，适合低决策成本出门。',
  date: '显精神、有层次，不会给人用力过猛的感觉。'
};

const styleExplanations: Record<StylePreference, string> = {
  minimal: '配色控制在 3 种以内，整体更干净。',
  commuter: '版型更利落，适合程序员日常和轻商务场景。',
  'smart-casual': '会比基础通勤多一点层次和成熟感。'
};

const budgetExplanations: Record<BudgetLevel, string> = {
  low: '基础款即可复现，不依赖高价品牌。',
  medium: `${budgetLabelMap.medium}适合优先升级版型和面料。`,
  high: `${budgetLabelMap.high}可以把预算放在鞋子和外套质感上。`
};

export function buildMatchedReasons(scene: Scene, style: StylePreference, budget: BudgetLevel): string[] {
  return [sceneExplanations[scene], styleExplanations[style], budgetExplanations[budget]];
}

export function buildSummary(scene: Scene, style: StylePreference): string {
  return `${sceneLabelMap[scene]} · ${styleLabelMap[style]}，重点是简单、干净、可直接照抄。`;
}
