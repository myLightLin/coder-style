import type { OutfitPlan } from '@/types/outfit';

const plan = (item: OutfitPlan): OutfitPlan => item;

const heroImages = {
  commute:
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
  interview:
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
  client:
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80',
  weekend:
    'https://images.unsplash.com/photo-1506629905607-d9c297dce8cc?auto=format&fit=crop&w=1200&q=80',
  date:
    'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=1200&q=80'
} as const;

const pieceImages = {
  polo: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80',
  shirt: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=800&q=80',
  trousers: 'https://images.unsplash.com/photo-1506629905607-d9c297dce8cc?auto=format&fit=crop&w=800&q=80',
  whiteShoes: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
  jacket: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=800&q=80',
  blazer: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80',
  loafers: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',
  knit: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80',
  tee: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80',
  cardigan: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80'
} as const;

export const outfitPlans: OutfitPlan[] = [
  plan({
    id: 'commute-minimal-01',
    title: '极简通勤',
    sceneTags: ['commute', 'client'],
    budgetTags: ['low', 'medium'],
    styleTags: ['minimal', 'commuter'],
    formality: 3,
    seasonTags: ['spring', 'summer', 'autumn'],
    impressionTags: ['低调有精神', '可直接照穿'],
    colorNote: '深灰 + 米白 + 海军蓝，颜色控制在 3 种以内。',
    reason: ['正式度够用，适合办公室和轻商务见面。', '上深下浅更显干净，程序员日常照抄不会出错。'],
    avoidTips: ['不要换成大 Logo T 恤。', '裤脚别堆在鞋面上。'],
    tips: ['优先合身', '颜色不超过 3 种', '裤线保持利落'],
    heroImage: heroImages.commute,
    pieces: [
      { category: 'top', name: '深灰针织 POLO', color: '深灰', image: pieceImages.polo, alternatives: ['深蓝针织 POLO'] },
      { category: 'bottom', name: '米白直筒长裤', color: '米白', image: pieceImages.trousers, alternatives: ['浅卡其直筒裤'] },
      { category: 'shoes', name: '小白鞋', color: '白', image: pieceImages.whiteShoes, alternatives: ['德训鞋'] },
      { category: 'outerwear', name: '海军蓝轻薄外套', color: '海军蓝', image: pieceImages.jacket, alternatives: ['灰蓝衬衫外套'] }
    ],
    isSample: true
  }),
  plan({
    id: 'interview-safe-01',
    title: '面试稳妥款',
    sceneTags: ['interview', 'client'],
    budgetTags: ['medium', 'high'],
    styleTags: ['commuter', 'smart-casual'],
    formality: 4,
    seasonTags: ['spring', 'autumn', 'winter'],
    impressionTags: ['靠谱', '克制'],
    colorNote: '浅蓝与深灰的对比让整体更显专业。',
    reason: ['正式度足够，但不会显得刻意老派。', '衬衫和轻西装能快速建立面试中的可靠感。'],
    avoidTips: ['不要穿破洞裤。', '不要搭脏旧运动鞋。'],
    tips: ['衬衫领口保持平整', '裤长刚好落鞋面', '鞋面保持干净'],
    heroImage: heroImages.interview,
    pieces: [
      { category: 'top', name: '浅蓝牛津衬衫', color: '浅蓝', image: pieceImages.shirt, alternatives: ['白色牛津衬衫'] },
      { category: 'bottom', name: '深灰休闲西裤', color: '深灰', image: pieceImages.trousers },
      { category: 'shoes', name: '简洁白鞋', color: '白', image: pieceImages.whiteShoes, alternatives: ['深棕皮鞋'] },
      { category: 'outerwear', name: '藏青轻西装', color: '藏青', image: pieceImages.blazer }
    ],
    isSample: true
  }),
  plan({
    id: 'client-clean-01',
    title: '见客户清爽款',
    sceneTags: ['client', 'commute'],
    budgetTags: ['medium', 'high'],
    styleTags: ['commuter', 'minimal'],
    formality: 4,
    seasonTags: ['spring', 'summer', 'autumn'],
    impressionTags: ['可信赖', '不刻板'],
    colorNote: '白衬衫和炭灰裤是最安全的客户会面组合。',
    reason: ['客户场景需要边界感，这套有正式度又不僵硬。', '色彩克制，镜头和线下都显干净。'],
    avoidTips: ['不要同时出现亮色和夸张印花。'],
    tips: ['袖长刚过腕骨', '鞋面别过厚', '外套保持轻量'],
    heroImage: heroImages.client,
    pieces: [
      { category: 'top', name: '白色衬衫', color: '白', image: pieceImages.shirt },
      { category: 'bottom', name: '炭灰九分休闲裤', color: '炭灰', image: pieceImages.trousers },
      { category: 'shoes', name: '乐福鞋', color: '深棕', image: pieceImages.loafers, alternatives: ['简洁皮鞋'] },
      { category: 'outerwear', name: '灰蓝薄外套', color: '灰蓝', image: pieceImages.jacket }
    ],
    isSample: false
  }),
  plan({
    id: 'weekend-relaxed-01',
    title: '周末放松款',
    sceneTags: ['weekend', 'date'],
    budgetTags: ['low', 'medium'],
    styleTags: ['minimal', 'smart-casual'],
    formality: 2,
    seasonTags: ['spring', 'summer'],
    impressionTags: ['轻松', '有层次'],
    colorNote: '米白和卡其的低饱和组合，看起来舒服不费力。',
    reason: ['周末需要轻松，但别穿得像刚起床。', '外搭薄衬衫可以让简单单品更有层次。'],
    avoidTips: ['不要上下一样松。'],
    tips: ['T 恤肩线要正', '裤型直筒优先', '留一点脚踝更轻盈'],
    heroImage: heroImages.weekend,
    pieces: [
      { category: 'top', name: '米白纯色 T 恤', color: '米白', image: pieceImages.tee },
      { category: 'bottom', name: '卡其直筒裤', color: '卡其', image: pieceImages.trousers },
      { category: 'shoes', name: '德训鞋', color: '白灰', image: pieceImages.whiteShoes },
      { category: 'outerwear', name: '轻薄衬衫外套', color: '浅灰', image: pieceImages.shirt }
    ],
    isSample: true
  }),
  plan({
    id: 'date-neat-01',
    title: '约会清爽款',
    sceneTags: ['date', 'weekend'],
    budgetTags: ['medium', 'high'],
    styleTags: ['smart-casual', 'minimal'],
    formality: 3,
    seasonTags: ['spring', 'summer', 'autumn'],
    impressionTags: ['显精神', '不油腻'],
    colorNote: '深蓝 POLO 稳住成熟感，浅卡其拉开层次。',
    reason: ['约会不需要过度正式，但要有精神面貌。', '上深下浅更显利落，拍照也更友好。'],
    avoidTips: ['不要整身灰黑无层次。'],
    tips: ['POLO 领口不要塌', '裤腰合适', '鞋子尽量纯色'],
    heroImage: heroImages.date,
    pieces: [
      { category: 'top', name: '深蓝 POLO', color: '深蓝', image: pieceImages.polo },
      { category: 'bottom', name: '浅卡其休闲裤', color: '浅卡其', image: pieceImages.trousers },
      { category: 'shoes', name: '干净板鞋', color: '白', image: pieceImages.whiteShoes },
      { category: 'outerwear', name: '同色系轻外套', color: '海军蓝', image: pieceImages.jacket }
    ],
    isSample: false
  }),
  plan({
    id: 'commute-clean-02',
    title: '轻熟通勤',
    sceneTags: ['commute'],
    budgetTags: ['medium', 'high'],
    styleTags: ['smart-casual', 'commuter'],
    formality: 3,
    seasonTags: ['all'],
    impressionTags: ['清爽', '稳重'],
    colorNote: '石墨灰上装搭配卡其裤，适合绝大多数办公室。',
    reason: ['对程序员日常来说，这套正式度刚好。', '材质和版型比品牌更重要。'],
    avoidTips: ['不要配过厚老爹鞋。'],
    tips: ['上衣下摆保持利落', '裤脚不过长', '一件浅外套即可'],
    heroImage: heroImages.commute,
    pieces: [
      { category: 'top', name: '石墨灰针织短袖', color: '石墨灰', image: pieceImages.knit },
      { category: 'bottom', name: '浅卡其锥形裤', color: '浅卡其', image: pieceImages.trousers },
      { category: 'shoes', name: '白色皮面休闲鞋', color: '白', image: pieceImages.whiteShoes },
      { category: 'outerwear', name: '雾蓝轻夹克', color: '雾蓝', image: pieceImages.jacket }
    ],
    isSample: false
  }),
  plan({
    id: 'interview-safe-02',
    title: '技术岗面试升级款',
    sceneTags: ['interview'],
    budgetTags: ['low', 'medium'],
    styleTags: ['commuter'],
    formality: 4,
    seasonTags: ['all'],
    impressionTags: ['稳妥', '克制'],
    colorNote: '白衬衫 + 深蓝外套是最低风险组合。',
    reason: ['更像认真准备过，但不会像销售岗那样用力过猛。', '低预算也能靠基础款复现。'],
    avoidTips: ['不要穿印花卫衣。', '不要裤子太紧。'],
    tips: ['白衬衫别透', '外套肩线贴合', '袜子别出戏'],
    heroImage: heroImages.interview,
    pieces: [
      { category: 'top', name: '白色免烫衬衫', color: '白', image: pieceImages.shirt },
      { category: 'bottom', name: '深灰直筒西裤', color: '深灰', image: pieceImages.trousers },
      { category: 'shoes', name: '简洁白鞋', color: '白', image: pieceImages.whiteShoes },
      { category: 'outerwear', name: '深蓝针织开衫', color: '深蓝', image: pieceImages.cardigan }
    ],
    isSample: false
  }),
  plan({
    id: 'weekend-relaxed-02',
    title: '周末城市漫步',
    sceneTags: ['weekend'],
    budgetTags: ['medium'],
    styleTags: ['minimal'],
    formality: 2,
    seasonTags: ['all'],
    impressionTags: ['松弛', '干净'],
    colorNote: '灰白黑低对比色适合大多数肤色。',
    reason: ['周末可以放松，但别丢掉干净感。', '基础单品更容易复用到衣柜里。'],
    avoidTips: ['不要同时宽松上衣和拖地裤。'],
    tips: ['裤腿稍卷一折', '鞋子保持白净', '加表或托特包提气质'],
    heroImage: heroImages.weekend,
    pieces: [
      { category: 'top', name: '灰白落肩 T 恤', color: '灰白', image: pieceImages.tee },
      { category: 'bottom', name: '黑色直筒九分裤', color: '黑', image: pieceImages.trousers },
      { category: 'shoes', name: '米白帆布鞋', color: '米白', image: pieceImages.whiteShoes },
      { category: 'outerwear', name: '浅灰衬衫', color: '浅灰', image: pieceImages.shirt }
    ],
    isSample: false
  }),
  plan({
    id: 'date-neat-02',
    title: '轻熟约会款',
    sceneTags: ['date', 'client'],
    budgetTags: ['high'],
    styleTags: ['smart-casual'],
    formality: 3,
    seasonTags: ['autumn', 'winter'],
    impressionTags: ['温和', '有质感'],
    colorNote: '深棕和米白让整体更温和，不会过冷。',
    reason: ['轻熟风能把精神面貌提起来。', '材质对比能让简单单品看起来更贵。'],
    avoidTips: ['不要过度堆叠配饰。'],
    tips: ['外套长度不过臀', '裤线清晰', '皮鞋注意保养'],
    heroImage: heroImages.date,
    pieces: [
      { category: 'top', name: '深棕针织 POLO', color: '深棕', image: pieceImages.polo },
      { category: 'bottom', name: '米白锥形裤', color: '米白', image: pieceImages.trousers },
      { category: 'shoes', name: '深棕乐福鞋', color: '深棕', image: pieceImages.loafers },
      { category: 'outerwear', name: '驼色短外套', color: '驼色', image: pieceImages.jacket }
    ],
    isSample: false
  }),
  plan({
    id: 'client-clean-02',
    title: '轻商务见面款',
    sceneTags: ['client', 'interview'],
    budgetTags: ['low', 'medium'],
    styleTags: ['commuter', 'minimal'],
    formality: 4,
    seasonTags: ['all'],
    impressionTags: ['稳重', '利落'],
    colorNote: '蓝白灰组合对大多数技术岗最稳。',
    reason: ['见客户要先建立可信赖感。', '基础单品即可完成轻商务效果。'],
    avoidTips: ['不要穿皱巴巴的衬衫。'],
    tips: ['衬衫下摆塞半前', '腰线提起来', '鞋子少花纹'],
    heroImage: heroImages.client,
    pieces: [
      { category: 'top', name: '雾蓝衬衫', color: '雾蓝', image: pieceImages.shirt },
      { category: 'bottom', name: '中灰直筒裤', color: '中灰', image: pieceImages.trousers },
      { category: 'shoes', name: '白色皮面板鞋', color: '白', image: pieceImages.whiteShoes },
      { category: 'outerwear', name: '海军蓝轻西装', color: '海军蓝', image: pieceImages.blazer }
    ],
    isSample: false
  })
];
