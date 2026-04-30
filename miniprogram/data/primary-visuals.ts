import type { OutfitPiece, OutfitPlan } from '@/types/outfit';

type OutfitOverride = Partial<
  Pick<OutfitPlan, 'title' | 'heroImage' | 'impressionTags' | 'colorNote' | 'reason' | 'tips' | 'avoidTips' | 'pieces'>
>;

const localPrimaryVisuals = {
  home: '/assets/primary-visuals/home-primary.png',
  results: '/assets/primary-visuals/results-primary.png',
  detail: '/assets/primary-visuals/detail-primary.png'
} as const;

const homePieces: OutfitPiece[] = [
  { category: 'top', name: '灰蓝衬衫', color: '灰蓝', image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=800&q=80' },
  { category: 'bottom', name: '米白直筒长裤', color: '米白', image: 'https://images.unsplash.com/photo-1506629905607-d9c297dce8cc?auto=format&fit=crop&w=800&q=80' },
  { category: 'shoes', name: '白色休闲鞋', color: '白', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80' }
];

const resultsPieces: OutfitPiece[] = [
  { category: 'top', name: '深灰针织 POLO', color: '深灰', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80' },
  { category: 'bottom', name: '卡其直筒裤', color: '卡其', image: 'https://images.unsplash.com/photo-1506629905607-d9c297dce8cc?auto=format&fit=crop&w=800&q=80' },
  { category: 'shoes', name: '小白鞋', color: '白', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80' }
];

const detailPieces: OutfitPiece[] = [
  { category: 'outerwear', name: '海军蓝轻外套', color: '海军蓝', image: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=800&q=80' },
  { category: 'top', name: '白色基础 T 恤', color: '白', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80' },
  { category: 'bottom', name: '灰色直筒长裤', color: '灰', image: 'https://images.unsplash.com/photo-1506629905607-d9c297dce8cc?auto=format&fit=crop&w=800&q=80' },
  { category: 'shoes', name: '小白鞋', color: '白', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80' }
];

function applyOverride(outfit: OutfitPlan | null, override: OutfitOverride): OutfitPlan | null {
  if (!outfit) {
    return null;
  }

  return {
    ...outfit,
    ...override,
    impressionTags: override.impressionTags ?? outfit.impressionTags,
    pieces: override.pieces ?? outfit.pieces
  };
}

export function getHomeFeaturedOutfit(outfit: OutfitPlan | null) {
  return applyOverride(outfit, {
    title: '灰蓝轻通勤',
    heroImage: localPrimaryVisuals.home,
    impressionTags: ['清爽低压', '最易照穿'],
    colorNote: '灰蓝衬衫 + 米白长裤 + 白鞋，符合首页方案 A 的低饱和轻商务基线。',
    reason: ['灰蓝上装和米白长裤关系清楚，第一次看就能直接照穿。'],
    tips: ['衬衫保持挺括', '裤型选直筒', '鞋面尽量留白干净'],
    avoidTips: ['不要替换成头像近景或半身裁切图。'],
    pieces: homePieces
  });
}

export function getResultsFeaturedOutfit(outfit: OutfitPlan | null) {
  return applyOverride(outfit, {
    title: '轻商务通勤',
    heroImage: localPrimaryVisuals.results,
    impressionTags: ['稳重', '显干净', '轻商务'],
    colorNote: '深灰 + 卡其 + 白色，保持办公室与客户场景都不过度用力。',
    reason: ['深灰针织 Polo 和卡其直筒裤更稳，适合承接推荐结果页的轻商务语境。'],
    pieces: resultsPieces
  });
}

export function getDetailDisplayOutfit(outfit: OutfitPlan | null) {
  return applyOverride(outfit, {
    title: '通勤层次展开款',
    heroImage: localPrimaryVisuals.detail,
    impressionTags: ['有层次', '可信', '轻商务'],
    colorNote: '海军蓝外套 + 白 T + 灰裤，方便在详情页解释层次与配色关系。',
    reason: ['外套、内搭、裤装和鞋的关系完整，适合展开说明为什么这样搭。'],
    tips: ['外套保持轻量', '内搭尽量纯色', '裤型直筒更稳', '鞋面保持干净'],
    avoidTips: ['不要把主图替换成头像近景。'],
    pieces: detailPieces
  });
}
