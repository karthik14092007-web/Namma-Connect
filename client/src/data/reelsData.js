// client/src/data/reelsData.js
// Mock data and calculation engine for Namma-Connect Launch Reels

export const TARGET_LOCATIONS = [
  'Madurai & Southern TN',
  'Chennai Metro & Suburbs',
  'Coimbatore & Tiruppur',
  'Bangalore & Urban Karnataka',
  'Pan-South India Tier 2/3',
  'Pan-India Tier 1/2'
];

export const TARGET_AGE_GROUPS = [
  '18–24 (Gen-Z & Students)',
  '25–34 (Young Professionals & Parents)',
  '35–44 (Families & Established Buyers)',
  '45+ (Senior Health Conscious)'
];

export const TARGET_INTERESTS = [
  'Healthy Eating & Millets',
  'Clean Ingredients & No Preservatives',
  'Handcrafted & Handloom',
  'Traditional Indian Recipes',
  'Eco-Friendly & Sustainable Living',
  'Fitness & Daily Nutrition',
  'Regional D2C Brands',
  'Artisan Pottery & Homeware'
];

export const TARGET_CUSTOMER_TYPES = [
  'Health-conscious Parents',
  'Busy Urban Professionals',
  'Sustainable Lifestyle Seekers',
  'Heritage & Handloom Enthusiasts',
  'Value-driven Regional Buyers'
];

export const GOAL_OPTIONS = [
  { id: 'Product Launch', label: 'Product Launch', desc: 'Introduce a brand-new product line to relevant regional buyers' },
  { id: 'Product Demo', label: 'Product Demo', desc: 'Show how your product is made, used, or experienced' },
  { id: 'Founder Story', label: 'Founder Story', desc: 'Build emotional connection and trust through your journey' },
  { id: 'Limited-Time Offer', label: 'Limited-Time Offer', desc: 'Drive instant sales with an exclusive launch discount' }
];

export const CTA_OPTIONS = [
  { id: 'Buy Product', label: 'Buy Product (1-Click Checkout)', desc: 'Direct purchase action with tagged product' },
  { id: 'Visit Brand Page', label: 'Visit Brand Page', desc: 'Drive traffic to your Namma-Connect brand profile' },
  { id: 'Pre-Order', label: 'Pre-Order / Reserve', desc: 'Collect early reservations before batch dispatch' },
  { id: 'Request Sample', label: 'Request Sample Pack', desc: 'Send miniature trial samples to high-intent leads' }
];

// Seeded high-quality Launch Reels
export const INITIAL_REELS = [
  {
    id: 'reel-kavya-1',
    founderId: 'founder-kavya-1',
    founderName: 'Kavya',
    brandName: 'Namma Crunch',
    brandAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    location: 'Madurai, Tamil Nadu',
    category: 'Healthy Snacks',
    title: 'A Healthier Crunch is Here: Roasted Millets with Zero Palm Oil!',
    description: 'We spent 8 months perfecting this heirloom foxtail and ragi millet crunch in our Madurai kitchen. 100% slow-roasted, seasoned with real Salem curry leaves and black pepper. No palm oil, no artificial flavors.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-bowl-of-healthy-salad-41484-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281691?auto=format&fit=crop&w=800&q=80',
    duration: '0:28',
    status: 'Live',
    campaignId: 'LR-2025-8842',
    goal: 'Product Launch',
    cta: 'Buy Product',
    product: {
      id: 'prod-millet-crunch',
      name: 'Millet Crunch (Spiced Clusters)',
      price: 120,
      originalPrice: 150,
      discount: '20% OFF',
      rating: 4.9,
      reviewsCount: 38,
      packSize: '150g pack',
      image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=400&q=80'
    },
    audienceFit: 91,
    fitBreakdown: {
      productRelevance: 96,
      interestMatch: 94,
      locationFit: 89,
      customerFit: 92
    },
    matchedReason: 'Matched to: Healthy Food • Madurai & Chennai • Parents',
    targeting: {
      locations: ['Madurai & Southern TN', 'Chennai Metro & Suburbs'],
      ageGroups: ['25–34 (Young Professionals & Parents)', '35–44 (Families & Established Buyers)'],
      interests: ['Healthy Eating & Millets', 'Clean Ingredients & No Preservatives', 'Regional D2C Brands'],
      customerTypes: ['Health-conscious Parents', 'Busy Urban Professionals']
    },
    metrics: {
      reach: 8420,
      relevantReach: 6050,
      relevantPercent: 72,
      views: 684,
      productClicks: 143,
      conversions: 27,
      likes: 218,
      comments: 34,
      shares: 49,
      budgetSpent: 500,
      roas: '6.48x'
    },
    createdAt: '2 days ago'
  },
  {
    id: 'reel-vaigai-1',
    founderId: 'founder-suresh-2',
    founderName: 'Suresh Kumar',
    brandName: 'Vaigai Naturals',
    brandAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    location: 'Madurai, Tamil Nadu',
    category: 'Agri-Tech',
    title: 'Wood-Pressed Sesame Oil: From Seed to Bottle in 40 Minutes',
    description: 'Watch how we cold-press native black sesame seeds using traditional Vagai wood chekku mills. No chemicals, pure unrefined golden oil rich in natural antioxidants and nutty aroma.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-pouring-oil-over-a-fresh-salad-41486-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80',
    duration: '0:34',
    status: 'Live',
    campaignId: 'LR-2025-7731',
    goal: 'Product Demo',
    cta: 'Buy Product',
    product: {
      id: 'prod-sesame-oil',
      name: 'Cold-Pressed Sesame Oil (Wood Chekku)',
      price: 240,
      originalPrice: 280,
      discount: '14% OFF',
      rating: 4.8,
      reviewsCount: 52,
      packSize: '500ml glass bottle',
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80'
    },
    audienceFit: 88,
    fitBreakdown: {
      productRelevance: 92,
      interestMatch: 89,
      locationFit: 86,
      customerFit: 85
    },
    matchedReason: 'Matched to: Traditional Indian Recipes • Farm to Table',
    targeting: {
      locations: ['Madurai & Southern TN', 'Coimbatore & Tiruppur'],
      ageGroups: ['25–34 (Young Professionals & Parents)', '35–44 (Families & Established Buyers)', '45+ (Senior Health Conscious)'],
      interests: ['Clean Ingredients & No Preservatives', 'Traditional Indian Recipes'],
      customerTypes: ['Health-conscious Parents', 'Heritage & Handloom Enthusiasts']
    },
    metrics: {
      reach: 6190,
      relevantReach: 4820,
      relevantPercent: 78,
      views: 512,
      productClicks: 98,
      conversions: 19,
      likes: 164,
      comments: 21,
      shares: 31,
      budgetSpent: 500,
      roas: '9.12x'
    },
    createdAt: '4 days ago'
  },
  {
    id: 'reel-chettinad-1',
    founderId: 'founder-meenakshi-3',
    founderName: 'Meenakshi Sundaram',
    brandName: 'Chettinad Weaves',
    brandAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    location: 'Karaikudi, Tamil Nadu',
    category: 'Handloom & Craft',
    title: '3 Days of Weaver Craftsmanship in One 30-Second Saree Tour',
    description: 'Every Chettinad cotton saree is hand-spun by master weavers in Karaikudi. Featuring authentic geometric borders, breathable thread count, and natural vegetable dyes that soften with every wash.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-weaving-with-a-loom-41485-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    duration: '0:31',
    status: 'Live',
    campaignId: 'LR-2025-9120',
    goal: 'Founder Story',
    cta: 'Visit Brand Page',
    product: {
      id: 'prod-chettinad-saree',
      name: 'Chettinad Cotton Handloom Saree',
      price: 1450,
      originalPrice: 1800,
      discount: '19% OFF',
      rating: 4.9,
      reviewsCount: 76,
      packSize: '6.2m with blouse piece',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80'
    },
    audienceFit: 93,
    fitBreakdown: {
      productRelevance: 95,
      interestMatch: 95,
      locationFit: 90,
      customerFit: 92
    },
    matchedReason: 'Matched to: Handcrafted & Handloom • Sustainable Fashion',
    targeting: {
      locations: ['Chennai Metro & Suburbs', 'Bangalore & Urban Karnataka', 'Pan-South India Tier 2/3'],
      ageGroups: ['25–34 (Young Professionals & Parents)', '35–44 (Families & Established Buyers)'],
      interests: ['Handcrafted & Handloom', 'Eco-Friendly & Sustainable Living', 'Regional D2C Brands'],
      customerTypes: ['Heritage & Handloom Enthusiasts', 'Sustainable Lifestyle Seekers']
    },
    metrics: {
      reach: 11200,
      relevantReach: 8640,
      relevantPercent: 77,
      views: 1240,
      productClicks: 284,
      conversions: 38,
      likes: 412,
      comments: 63,
      shares: 98,
      budgetSpent: 500,
      roas: '11.02x'
    },
    createdAt: '1 week ago'
  },
  {
    id: 'reel-greenroots-1',
    founderId: 'founder-arun-4',
    founderName: 'Arun Varma',
    brandName: 'GreenRoots Herbal',
    brandAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    location: 'Salem, Tamil Nadu',
    category: 'Healthy Snacks',
    title: 'Morning Detox: How to Brew Farm-Fresh Moringa Leaf Tea',
    description: 'Grown on rain-fed farms around Yercaud foothills. Handpicked within 4 hours of sunrise to preserve chlorophyll, iron and vital antioxidants. Try our 14-day morning vitality challenge.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-pouring-hot-tea-into-a-cup-41483-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80',
    duration: '0:26',
    status: 'Live',
    campaignId: 'LR-2025-4421',
    goal: 'Limited-Time Offer',
    cta: 'Pre-Order',
    product: {
      id: 'prod-moringa-tea',
      name: 'Organic Shade-Dried Moringa Powder',
      price: 180,
      originalPrice: 220,
      discount: '18% OFF',
      rating: 4.7,
      reviewsCount: 29,
      packSize: '100g tin',
      image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=400&q=80'
    },
    audienceFit: 87,
    fitBreakdown: {
      productRelevance: 90,
      interestMatch: 88,
      locationFit: 85,
      customerFit: 86
    },
    matchedReason: 'Matched to: Clean Ingredients • Fitness & Daily Nutrition',
    targeting: {
      locations: ['Bangalore & Urban Karnataka', 'Chennai Metro & Suburbs'],
      ageGroups: ['25–34 (Young Professionals & Parents)', '35–44 (Families & Established Buyers)'],
      interests: ['Clean Ingredients & No Preservatives', 'Fitness & Daily Nutrition'],
      customerTypes: ['Health-conscious Parents', 'Busy Urban Professionals']
    },
    metrics: {
      reach: 4890,
      relevantReach: 3620,
      relevantPercent: 74,
      views: 395,
      productClicks: 72,
      conversions: 14,
      likes: 98,
      comments: 15,
      shares: 22,
      budgetSpent: 500,
      roas: '5.04x'
    },
    createdAt: '3 days ago'
  },
  {
    id: 'reel-claycraft-1',
    founderId: 'founder-selvam-5',
    founderName: 'Selvam Potteries',
    brandName: 'ClayCraft Tanjore',
    brandAvatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80',
    location: 'Thanjavur, Tamil Nadu',
    category: 'Handloom & Craft',
    title: 'Clay Cookware That Keeps Fish Curry Warm For 4+ Hours',
    description: 'Hand-thrown on traditional potter wheels in Thanjavur using nutrient-dense river clay. Naturally non-toxic, alkali-balancing, and seasoned with rice starch water.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-working-on-a-clay-pot-41487-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    duration: '0:35',
    status: 'Live',
    campaignId: 'LR-2025-6329',
    goal: 'Product Demo',
    cta: 'Buy Product',
    product: {
      id: 'prod-clay-kadai',
      name: 'Seasoned Terracotta Cooking Kadai (2.5L)',
      price: 420,
      originalPrice: 499,
      discount: '16% OFF',
      rating: 4.8,
      reviewsCount: 44,
      packSize: '2.5L cooking pot with lid',
      image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=400&q=80'
    },
    audienceFit: 89,
    fitBreakdown: {
      productRelevance: 92,
      interestMatch: 89,
      locationFit: 88,
      customerFit: 87
    },
    matchedReason: 'Matched to: Artisan Pottery • Traditional Indian Recipes',
    targeting: {
      locations: ['Madurai & Southern TN', 'Chennai Metro & Suburbs', 'Pan-South India Tier 2/3'],
      ageGroups: ['25–34 (Young Professionals & Parents)', '35–44 (Families & Established Buyers)'],
      interests: ['Artisan Pottery & Homeware', 'Traditional Indian Recipes', 'Eco-Friendly & Sustainable Living'],
      customerTypes: ['Heritage & Handloom Enthusiasts', 'Health-conscious Parents']
    },
    metrics: {
      reach: 5410,
      relevantReach: 4120,
      relevantPercent: 76,
      views: 480,
      productClicks: 110,
      conversions: 22,
      likes: 185,
      comments: 29,
      shares: 44,
      budgetSpent: 500,
      roas: '18.48x'
    },
    createdAt: '5 days ago'
  }
];

// Calculation engine for live audience fit score
export function calculateAudienceFit({
  category = 'Healthy Snacks',
  locations = [],
  ageGroups = [],
  interests = [],
  customerTypes = [],
  hasParentsInterest = false
}) {
  let productRelevance = 84;
  let interestMatch = 80;
  let locationFit = 82;
  let customerFit = 80;

  // Base adjustments
  if (locations.length > 0) {
    locationFit += Math.min(locations.length * 4, 12);
  }
  if (locations.includes('Madurai & Southern TN') || locations.includes('Chennai Metro & Suburbs')) {
    locationFit += 4;
  }

  if (interests.length > 0) {
    interestMatch += Math.min(interests.length * 4, 15);
  }
  if (hasParentsInterest || interests.some(i => i.toLowerCase().includes('healthy') || i.toLowerCase().includes('clean'))) {
    interestMatch += 4;
    productRelevance += 6;
  }

  if (customerTypes.length > 0) {
    customerFit += Math.min(customerTypes.length * 4, 14);
  }
  if (customerTypes.some(c => c.toLowerCase().includes('parents') || c.toLowerCase().includes('urban'))) {
    customerFit += 4;
    productRelevance += 4;
  }

  // Cap sub-scores
  productRelevance = Math.min(98, Math.max(70, productRelevance));
  interestMatch = Math.min(98, Math.max(68, interestMatch));
  locationFit = Math.min(96, Math.max(65, locationFit));
  customerFit = Math.min(96, Math.max(70, customerFit));

  const totalScore = Math.round(
    productRelevance * 0.35 +
    interestMatch * 0.30 +
    locationFit * 0.15 +
    customerFit * 0.20
  );

  return {
    score: totalScore,
    breakdown: {
      productRelevance,
      interestMatch,
      locationFit,
      customerFit
    },
    suggestion: {
      applied: hasParentsInterest,
      title: 'Audience-Fit Optimization',
      text: "Targeting 'Health-conscious Parents' along with 'Healthy Eating' will increase your reach by 24% for Millet Crunch.",
      recommendedInterests: ['Healthy Eating & Millets', 'Clean Ingredients & No Preservatives'],
      recommendedCustomerTypes: ['Health-conscious Parents', 'Busy Urban Professionals']
    }
  };
}

// Demo Campaign Analytics detailed data for Kavya (Namma Crunch)
export const DEMO_KAVYA_ANALYTICS = {
  reelId: 'reel-kavya-1',
  campaignId: 'LR-2025-8842',
  status: 'Active (Day 6 of 7)',
  budget: 500,
  spent: 500,
  totalReach: 8420,
  relevantAudience: 6050,
  relevantPercent: 71.9,
  views: 684,
  viewRate: '11.3%',
  clicks: 143,
  clickRate: '20.9%',
  conversions: 27,
  conversionRate: '18.9%',
  revenueGenerated: 3240,
  roas: '6.48x',
  funnelSteps: [
    { label: 'Total Reach', count: 8420, percent: 100, color: '#64748b', desc: 'Impressions delivered to matched regional feeds' },
    { label: 'Relevant Audience', count: 6050, percent: 71.9, color: '#0f766e', desc: 'Pre-qualified users matching your target customer criteria' },
    { label: 'Reel Video Views', count: 684, percent: 11.3, color: '#0284c7', desc: 'Watched > 5 seconds of the product demonstration' },
    { label: 'Product Clicks', count: 143, percent: 2.37, color: '#d97706', desc: 'Tapped "Buy Now" or opened product specifications' },
    { label: 'Direct Orders', count: 27, percent: 0.45, color: '#16a34a', desc: 'Completed purchase or verified inquiry for Millet Crunch' }
  ],
  dailyPerformance: [
    { day: 'Mon', reach: 980, views: 76, clicks: 14, orders: 2 },
    { day: 'Tue', reach: 1120, views: 88, clicks: 19, orders: 3 },
    { day: 'Wed', reach: 1350, views: 112, clicks: 24, orders: 5 },
    { day: 'Thu', reach: 1540, views: 129, clicks: 28, orders: 6 },
    { day: 'Fri', reach: 1680, views: 138, clicks: 31, orders: 6 },
    { day: 'Sat', reach: 1750, views: 141, clicks: 27, orders: 5 }
  ],
  topLocations: [
    { name: 'Madurai & Surrounds', share: 42, color: '#0f766e' },
    { name: 'Chennai Metro', share: 31, color: '#14b8a6' },
    { name: 'Coimbatore', share: 18, color: '#0284c7' },
    { name: 'Bangalore Tier 1', share: 9, color: '#6366f1' }
  ],
  topAgeGroups: [
    { group: '25–34 yrs', share: 58 },
    { group: '18–24 yrs', share: 24 },
    { group: '35–44 yrs', share: 18 }
  ],
  topInterests: [
    { name: 'Healthy Snacks & Millets', match: '94%' },
    { name: 'Clean Ingredients / Zero Palm Oil', match: '91%' },
    { name: 'Regional South Indian Brands', match: '88%' }
  ]
};
