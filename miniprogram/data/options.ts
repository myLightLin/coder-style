import type { BudgetLevel, Option, Scene, StylePreference } from '@/types/outfit';

export const sceneOptions: Option<Scene>[] = [
  { label: '上班通勤', value: 'commute', description: '日常办公室与轻商务' },
  { label: '面试场合', value: 'interview', description: '稳妥、干净、不过度用力' },
  { label: '见客户', value: 'client', description: '专业、可信赖、有边界感' },
  { label: '周末外出', value: 'weekend', description: '轻松，但别太随便' },
  { label: '约会见面', value: 'date', description: '有层次、显精神' }
];

export const budgetOptions: Option<BudgetLevel>[] = [
  { label: '低预算', value: 'low', description: '优先基础款，不依赖品牌溢价' },
  { label: '中预算', value: 'medium', description: '兼顾质感与性价比' },
  { label: '高预算', value: 'high', description: '可升级面料与版型' }
];

export const styleOptions: Option<StylePreference>[] = [
  { label: '极简干净', value: 'minimal' },
  { label: '通勤稳妥', value: 'commuter' },
  { label: '轻熟利落', value: 'smart-casual' }
];
