import { sceneLabelMap } from '@/utils/mapper';
import type { OutfitPiece, OutfitPlan } from '@/types/outfit';

const pieceEmojiMap: Record<OutfitPiece['category'], string> = {
  top: '上装',
  bottom: '裤装',
  shoes: '鞋履',
  outerwear: '外套'
};

export function buildWeatherSummary() {
  const today = new Date();
  const dayLabels = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

  return {
    temperature: '22°C',
    condition: '多云',
    range: '18-24°C',
    dateLabel: `${today.getMonth() + 1}月${today.getDate()}日 ${dayLabels[today.getDay()] ?? ''}`
  };
}

export function getOutfitTemperatureLabel(outfit: OutfitPlan) {
  if (outfit.seasonTags.includes('summer')) {
    return '适合 18-24°C';
  }
  if (outfit.seasonTags.includes('winter')) {
    return '适合 8-16°C';
  }
  return '适合 16-22°C';
}

export function getOutfitFigureLabel(outfit: OutfitPlan) {
  return `${sceneLabelMap[outfit.sceneTags[0]]} · ${outfit.title}`;
}

export function getPieceBadge(piece: OutfitPiece) {
  return pieceEmojiMap[piece.category];
}
