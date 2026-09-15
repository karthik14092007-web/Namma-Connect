// client/src/services/brandAIService.js
// Independent AI Brand Positioning Assistant Service

export const DEFAULT_BRAND_PROFILE = {
  brandName: 'Namma Crunch',
  productName: 'Millet-based healthy snacks',
  category: 'Food & Beverage',
  currentDescription: 'Healthy and tasty snacks for everyone made with traditional millets.',
  targetCustomer: 'Health-conscious young professionals & office workers',
  location: 'Madurai, Tamil Nadu',
  priceRange: '₹200–₹400',
  usp: 'Nutrient-rich, roasted traditional millet snacks with zero palm oil & authentic South Indian seasoning',
  competitors: "Lay's / Haldiram's, Yoga Bar, The Whole Truth",
  websiteUrl: 'https://nammacrunch.in',
  marketingChallenge: 'Low brand awareness, broad messaging, and converting social followers into repeated D2C orders'
};

export const INITIAL_POSITIONING_ANALYSIS = {
  score: 68,
  status: 'Needs Differentiation',
  factors: [
    {
      id: 'clarity',
      name: 'Clarity',
      score: 62,
      benchmark: 75,
      description: 'How instantly a first-time visitor understands what you sell and who it is for.',
      status: 'Moderate',
      color: 'amber'
    },
    {
      id: 'differentiation',
      name: 'Differentiation',
      score: 54,
      benchmark: 80,
      description: 'Clear reasons why a customer should buy from you instead of mass-market snack brands.',
      status: 'Low',
      color: 'rose'
    },
    {
      id: 'audience-fit',
      name: 'Target Audience Fit',
      score: 78,
      benchmark: 70,
      description: 'Alignment between the product benefits and the real everyday habits of young professionals.',
      status: 'Good',
      color: 'emerald'
    },
    {
      id: 'value-prop',
      name: 'Value Proposition',
      score: 71,
      benchmark: 75,
      description: 'Strength of the core offer: clean ingredients + traditional crunch + modern convenience.',
      status: 'Moderate',
      color: 'amber'
    },
    {
      id: 'seo-discoverability',
      name: 'Search Discoverability',
      score: 49,
      benchmark: 75,
      description: 'Organic search visibility for high-intent queries like "millet snacks" and "healthy office snacks".',
      status: 'Weak',
      color: 'rose'
    }
  ],
  diagnosis: {
    title: 'Your positioning is too broad',
    severity: 'warning',
    currentText: '"Healthy and tasty snacks for everyone."',
    recommendedText: '"Convenient millet-based snacks for health-conscious young professionals."',
    why: "Your current positioning targets everyone, making it difficult to communicate a specific, compelling reason for your ideal customer to choose you over established mass brands.",
    whatNext: "Narrow your core messaging to desk snacking, active work routines, and clean regional grains. This instantly lifts conversion and ad ROI."
  },
  idealCustomer: {
    title: 'Health-Conscious Young Professional',
    tagline: 'Urban Millennial / Gen-Z Desk Worker & Fitness Enthusiast',
    age: '22–36 years old',
    location: 'Metro & Tier-2 Tech Hubs (Chennai, Bengaluru, Coimbatore, Madurai)',
    income: '₹35,000 – ₹1,20,000 / month',
    interests: ['Desk Snacking', 'Functional Fitness', 'Clean Eating', 'South Indian Heritage', 'Quick Delivery'],
    primaryPainPoint: 'Afternoon 4 PM hunger crashes lead to fried junk food. Struggles to find crunchy snacks that are truly whole-grain without hidden preservatives.',
    buyingMotivation: 'Guilt-free crunch + authentic taste + portable single-serve packs that look modern at an office desk.',
    preferredChannels: ['Instagram Launch Reels', 'Blinkit / Swiggy Instamart', 'D2C Website', 'WhatsApp Community']
  },
  valuePropositions: {
    original: 'For health-conscious young professionals who want convenient everyday snacks, Namma Crunch offers millet-based alternatives that combine traditional Indian ingredients with modern snacking.',
    shorter: 'Healthy millet crunch for busy professionals. Traditional South Indian grains, zero junk.',
    premium: 'Artisanal slow-roasted ancient millets crafted with heritage cold-pressed spices. Pure nutrition for discerning mindful snacking.',
    casual: 'Your 4 PM guilt-free crunch fix! Super-crispy local millets that kick 3 PM tea-time fried snacks to the curb.'
  },
  positioningStatement: {
    for: 'Health-conscious young professionals & mindful snackers',
    who: 'Want delicious, crunchy snacks to fuel busy workdays without health guilt',
    ourBrand: 'Namma Crunch',
    is: 'A direct-to-consumer artisanal millet snack brand',
    that: 'Combines nutrient-dense native Tamil grains with modern roasted seasonings',
    unlike: 'Mass-produced fried chips, refined flour biscuits, and bland imported bars',
    because: 'We slow-roast heritage millets with zero palm oil and transparent farmer sourcing, delivering authentic crunch with 3x more dietary fiber.'
  },
  messagingFramework: {
    promise: 'Better snacking without giving up the crunch.',
    personality: ['Modern', 'Heritage-Proud', 'Nutritious', 'Approachable'],
    tone: ['Clear & Honest', 'Conversational', 'Confident', 'Energetic'],
    pillars: [
      {
        title: 'Native Grains First',
        description: 'Made from Little Millet (Samai), Foxtail, and Ragi sourced directly from South Indian farmers.'
      },
      {
        title: 'Zero Fried Guilt',
        description: '100% slow-roasted with cold-pressed oils. No palm oil, no artificial MSG, no trans fats.'
      },
      {
        title: 'Workday Ready Crunch',
        description: 'Pre-portioned ziplock pouches engineered to keep chips super crisp at your office desk or commute.'
      },
      {
        title: 'Transparent Heritage',
        description: 'Clean labels that any grandmother would recognize and approve.'
      }
    ]
  }
};

export const IMPROVED_POSITIONING_ANALYSIS = {
  ...INITIAL_POSITIONING_ANALYSIS,
  score: 84,
  status: 'Sharply Positioned',
  improvementNote: 'Your brand positioning is now specific, differentiated, and aligned with high-intent customer search demand.',
  factors: [
    {
      id: 'clarity',
      name: 'Clarity',
      score: 88,
      benchmark: 75,
      description: 'Clear value proposition: Instant recognition as premium millet desk snack.',
      status: 'Strong',
      color: 'emerald'
    },
    {
      id: 'differentiation',
      name: 'Differentiation',
      score: 82,
      benchmark: 80,
      description: 'Clear moat: Heritage South Indian millets vs generic corn/potato snacks.',
      status: 'Strong',
      color: 'emerald'
    },
    {
      id: 'audience-fit',
      name: 'Target Audience Fit',
      score: 91,
      benchmark: 70,
      description: 'Laser-focused on 22–36 tech & corporate snackers in Tamil Nadu & South India.',
      status: 'Exceptional',
      color: 'emerald'
    },
    {
      id: 'value-prop',
      name: 'Value Proposition',
      score: 86,
      benchmark: 75,
      description: 'Compelling message: "Better snacking without giving up the crunch."',
      status: 'Strong',
      color: 'emerald'
    },
    {
      id: 'seo-discoverability',
      name: 'Search Discoverability',
      score: 75,
      benchmark: 75,
      description: 'High-intent keyword coverage across informational, commercial, and local queries.',
      status: 'Optimized',
      color: 'emerald'
    }
  ]
};

export const SEO_KEYWORDS_DATA = [
  {
    id: 'kw-1',
    category: 'primary',
    keyword: 'millet snacks',
    intent: 'Commercial',
    volume: '28,400/mo',
    relevance: 96,
    difficulty: 'Medium',
    priority: 'HIGH',
    cpc: '₹14.20'
  },
  {
    id: 'kw-2',
    category: 'primary',
    keyword: 'healthy snacks',
    intent: 'Informational',
    volume: '90,500/mo',
    relevance: 88,
    difficulty: 'High',
    priority: 'HIGH',
    cpc: '₹18.50'
  },
  {
    id: 'kw-3',
    category: 'primary',
    keyword: 'healthy snacks India',
    intent: 'Commercial',
    volume: '14,200/mo',
    relevance: 94,
    difficulty: 'Medium',
    priority: 'HIGH',
    cpc: '₹16.00'
  },
  {
    id: 'kw-4',
    category: 'secondary',
    keyword: 'millet chips',
    intent: 'Transactional',
    volume: '8,900/mo',
    relevance: 95,
    difficulty: 'Low',
    priority: 'HIGH',
    cpc: '₹11.80'
  },
  {
    id: 'kw-5',
    category: 'secondary',
    keyword: 'healthy evening snacks',
    intent: 'Informational',
    volume: '22,100/mo',
    relevance: 89,
    difficulty: 'Medium',
    priority: 'MEDIUM',
    cpc: '₹13.40'
  },
  {
    id: 'kw-6',
    category: 'secondary',
    keyword: 'Indian healthy snacks',
    intent: 'Commercial',
    volume: '12,600/mo',
    relevance: 91,
    difficulty: 'Medium',
    priority: 'HIGH',
    cpc: '₹15.10'
  },
  {
    id: 'kw-7',
    category: 'secondary',
    keyword: 'baked millet snacks',
    intent: 'Transactional',
    volume: '4,400/mo',
    relevance: 92,
    difficulty: 'Low',
    priority: 'HIGH',
    cpc: '₹9.90'
  },
  {
    id: 'kw-8',
    category: 'long-tail',
    keyword: 'best healthy millet snacks in India',
    intent: 'Commercial',
    volume: '3,800/mo',
    relevance: 98,
    difficulty: 'Low',
    priority: 'HIGH',
    cpc: '₹8.50'
  },
  {
    id: 'kw-9',
    category: 'long-tail',
    keyword: 'healthy snacks for working professionals',
    intent: 'Informational',
    volume: '2,900/mo',
    relevance: 95,
    difficulty: 'Low',
    priority: 'HIGH',
    cpc: '₹7.80'
  },
  {
    id: 'kw-10',
    category: 'long-tail',
    keyword: 'millet snacks for weight-conscious consumers',
    intent: 'Informational',
    volume: '1,850/mo',
    relevance: 90,
    difficulty: 'Low',
    priority: 'MEDIUM',
    cpc: '₹6.20'
  },
  {
    id: 'kw-11',
    category: 'local',
    keyword: 'millet snacks Tamil Nadu',
    intent: 'Local',
    volume: '4,200/mo',
    relevance: 97,
    difficulty: 'Low',
    priority: 'HIGH',
    cpc: '₹5.40'
  },
  {
    id: 'kw-12',
    category: 'local',
    keyword: 'healthy snacks Chennai',
    intent: 'Local',
    volume: '5,600/mo',
    relevance: 93,
    difficulty: 'Low',
    priority: 'HIGH',
    cpc: '₹8.10'
  },
  {
    id: 'kw-13',
    category: 'local',
    keyword: 'Tamil Nadu millet products online',
    intent: 'Local',
    volume: '2,100/mo',
    relevance: 96,
    difficulty: 'Low',
    priority: 'MEDIUM',
    cpc: '₹6.90'
  }
];

export const SEARCH_INTENT_CATEGORIES = [
  {
    id: 'informational',
    name: 'Informational Intent',
    badge: 'Discovery & Education',
    sampleQuery: '"Are millet snacks healthy for daily office tea-time?"',
    whyItMatters: 'Founders must build trust by educating customers on nutrition, fiber, and regional grains before pitching sales.',
    conversionAction: 'Create short educational Launch Reels & founder myth-buster videos.'
  },
  {
    id: 'commercial',
    name: 'Commercial Intent',
    badge: 'Comparison & Consideration',
    sampleQuery: '"Best healthy millet snacks in India 2026"',
    whyItMatters: 'Buyers are actively comparing brands. Showcasing your clean label and zero palm oil wins the sale here.',
    conversionAction: 'Provide comparison charts vs mass brands with tasting bundle promos.'
  },
  {
    id: 'transactional',
    name: 'Transactional Intent',
    badge: 'High Purchase Readiness',
    sampleQuery: '"Buy roasted millet chips online 150g pack"',
    whyItMatters: 'High-intent searchers ready to checkout immediately. Frictionless mobile checkout is crucial.',
    conversionAction: 'Target landing pages with 1-click WhatsApp order or instant cart checkout.'
  },
  {
    id: 'local',
    name: 'Local Regional Intent',
    badge: 'Geographic Trust',
    sampleQuery: '"Millet snacks Chennai fast delivery"',
    whyItMatters: 'Local pride and same-day/next-day shipping expectations drive 2.4x higher conversion in your home state.',
    conversionAction: 'Highlight Tamil Nadu heritage, local farm ties, and regional shipping perks.'
  }
];

export const SEO_CONTENT_IDEAS = [
  {
    id: 'content-1',
    title: '5 Healthy Alternatives to 4 PM Tea-Time Fried Chips',
    primaryKeyword: 'healthy evening snacks',
    searchIntent: 'Informational',
    suggestedFormat: '9:16 Vertical Video / Launch Reel',
    estimatedReach: '12K – 18K views',
    hook: '"Stop reaching for that oily samosa at 4 PM! Here is what a Madurai millet farmer eats instead..."',
    outline: 'Show office desk scenario ➔ quick crunch test of roasted millet puffs ➔ nutrient comparison graph ➔ direct link to trial pack.',
    ctaAction: 'launch-reels'
  },
  {
    id: 'content-2',
    title: 'Why Traditional South Indian Millets Beat Ultra-Processed Snacks',
    primaryKeyword: 'millet snacks',
    searchIntent: 'Informational / Commercial',
    suggestedFormat: 'Founder Story Reel & Blog Guide',
    estimatedReach: '8K – 14K views',
    hook: '"My grandmother lived to 94 on Kambu and Samai. Why did we swap them for refined potato starch?"',
    outline: 'Founder Kavya explains the heritage sourcing journey from Tamil Nadu farmers to modern snacking pouches.',
    ctaAction: 'launch-reels'
  },
  {
    id: 'content-3',
    title: 'Best Healthy Snacks for Office Desks: Zero Mess, Zero Guilt',
    primaryKeyword: 'healthy office snacks',
    searchIntent: 'Commercial / Listicle',
    suggestedFormat: 'Instagram Carousel & Marketplace Feature',
    estimatedReach: '15K – 22K views',
    hook: '"Snacks that will not stain your laptop keyboard or leave you falling asleep in your 3 PM meeting."',
    outline: 'Breakdown of non-greasy roasted millet chips, resealable pouches, and 30-day office snack subscription.',
    ctaAction: 'marketplace'
  }
];

export const SEO_PRODUCT_PAGE_DATA = {
  productTitle: 'Namma Crunch Roasted Millet Crisps — 100% Whole Grain Healthy Snack (150g)',
  metaDescription: 'Buy Namma Crunch roasted millet snacks made from native South Indian grains. 100% whole grain, zero palm oil, high fiber & crunchy. Order fresh online.',
  shortDescription: 'Super-crunchy roasted millet crisps seasoned with cold-pressed coconut oil and coastal curry leaves. The ultimate 4 PM guilt-free office snack.',
  longDescription: `Tired of oily fried snacks sabotaging your workday? Namma Crunch Roasted Millet Crisps are crafted from 100% native Tamil Nadu millets (Little Millet & Foxtail Millet) slow-roasted to golden perfection.

• 100% Whole Grain: High fiber & low glycemic index for sustained focus.
• Zero Palm Oil & No Trans Fats: Lightly tossed in pure cold-pressed oil.
• Authentic South Indian Seasoning: Made with farm-fresh curry leaves and hand-ground spices.
• Desk-Ready Ziplock: Stays ultra-crisp even after opening.

Perfect for tea-time, workout refuels, or evening cravings. Delivered fresh directly from our Madurai kitchen.`,
  primaryKeyword: 'millet snacks',
  secondaryKeywords: ['healthy office snacks', 'roasted millet chips', 'South Indian healthy snacks', 'zero palm oil snacks']
};

export const COMPETITOR_COMPARISON_DATA = {
  competitors: [
    {
      name: 'Namma Crunch (Your Brand)',
      isUser: true,
      targetAudience: 'Health-conscious young professionals & mindful desk workers',
      corePromise: 'Better snacking without giving up the crunch (Zero Palm Oil + Whole Native Millets)',
      pricePosition: '₹220 – ₹380 (Accessible Premium D2C)',
      brandTone: 'Modern, authentic, transparent, South Indian pride',
      keyDifferentiator: 'Slow-roasted traditional millets, zero junk, farmer-direct transparency',
      seoFocus: 'Millet snacks, healthy office desk snacks, regional clean snacking'
    },
    {
      name: 'Competitor A (Mass Industrial Snack Brand)',
      isUser: false,
      targetAudience: 'Mass audience, all age groups, price-sensitive shoppers',
      corePromise: 'Tasty, cheap, available everywhere instantly',
      pricePosition: '₹10 – ₹50 (Mass Low Cost)',
      brandTone: 'Loud, hyper-commercial, entertainment-driven',
      keyDifferentiator: 'Ubiquitous distribution and high flavor coating (heavy palm oil & MSG)',
      seoFocus: 'Potato chips, evening snacks, party snacks'
    },
    {
      name: 'Competitor B (Imported / VC Clean Bar Brand)',
      isUser: false,
      targetAudience: 'Elite fitness enthusiasts & luxury Tier-1 gym members',
      corePromise: 'High protein nutrition bars & imported superfoods',
      pricePosition: '₹450 – ₹900 (High Luxury)',
      brandTone: 'Minimalist, serious, Western fitness aesthetic',
      keyDifferentiator: 'High whey protein content, foreign ingredient formulas',
      seoFocus: 'Protein bars, keto diet snacks, energy bars'
    }
  ],
  strategicOpportunity: {
    title: 'Your Untapped D2C Moat: Regional Heritage + Modern Convenience',
    description: 'Mass competitors are burdened by palm oil and artificial additives, while imported health brands are overpriced and lack authentic Indian crunch. Namma Crunch owns the sweet spot: genuine regional millet nostalgia paired with modern guilt-free clean labels.'
  }
};

export const CHATBOT_KNOWLEDGE_RESPONSES = {
  'improve positioning': {
    what: 'Your current positioning ("Healthy and tasty snacks for everyone") dilutes your marketing power.',
    why: 'When you speak to everyone, you resonate with no one. Mass brands like Lay\'s already own generic taste, while local bakeries own low cost.',
    whatNext: 'Pivot to "Desk-ready millet snacks for health-conscious young professionals". Highlight zero palm oil and sustainable afternoon energy.',
    actionLabel: 'Apply Sharper Positioning',
    actionType: 'apply-positioning',
    bridgeNav: { label: 'Create 30-Day Growth Plan →', view: 'roadmap' }
  },
  'find my audience': {
    what: 'Your ideal customer persona is "Aditya & Priya", 24–34 tech/corporate professionals in South India.',
    why: 'They spend 8+ hours at a desk, suffer 4 PM hunger slumps, want to maintain fitness, and are willing to pay ₹250–₹350 for guilt-free convenience.',
    whatNext: 'Focus your marketing on LinkedIn & Instagram Reels showing desk-snacking moments and high-protein/fiber clean labels.',
    actionLabel: 'Launch Targeted Reel for this Audience',
    actionType: 'launch-reel',
    bridgeNav: { label: 'Launch Targeted Reel →', view: 'launch-reels' }
  },
  'generate keywords': {
    what: 'Generated 13 high-intent keyword opportunities tailored to Namma Crunch.',
    why: 'Generic terms like "snacks" are too competitive. High-intent long-tail keywords like "healthy snacks for working professionals" convert 3.8x faster.',
    whatNext: 'Incorporate these keywords into your product page titles, meta descriptions, and video captions.',
    actionLabel: 'View SEO Keyword Table',
    actionType: 'view-seo',
    bridgeNav: { label: 'Find a Marketing Mentor →', view: 'mentors' }
  },
  'analyze competitors': {
    what: 'Competitor analysis reveals a glaring gap between cheap oily chips and overpriced imported granola bars.',
    why: 'Neither caters to the South Indian consumer craving traditional crispiness (murukku/thattai feel) made with clean native millets.',
    whatNext: 'Emphasize your "Slow-Roasted Tamil Millets" and "Zero Palm Oil" across all customer touchpoints.',
    actionLabel: 'View Competitor Comparison Matrix',
    actionType: 'view-competitors',
    bridgeNav: { label: 'Explore D2C Marketplace →', view: 'marketplace' }
  },
  'write product description': {
    what: 'Crafted an SEO-optimized product page blueprint with high-converting titles, bullet points, and meta tags.',
    why: 'Search engines index structured product titles with clear benefits and sizes (150g), lifting organic organic click-through rates by up to 42%.',
    whatNext: 'Copy the generated product page schema directly into your online store or Amazon listing.',
    actionLabel: 'Open Product Page Optimizer',
    actionType: 'view-seo',
    bridgeNav: { label: 'View Marketplace Listing →', view: 'marketplace' }
  },
  'create content ideas': {
    what: 'Developed 3 high-impact content concepts designed for short-form video and educational social reels.',
    why: 'D2C founders win by educating on the problem (4 PM junk crash) before selling the solution (roasted millets).',
    whatNext: 'Film a 30-second Reel demonstrating the crunch test and showing our transparent ingredient list.',
    actionLabel: 'Launch Targeted Reel Wizard',
    actionType: 'launch-reel',
    bridgeNav: { label: 'Launch Targeted Reel →', view: 'launch-reels' }
  }
};

/**
 * Intelligent helper to return structured strategic responses
 */
export function generateBrandAIResponse(userMessage) {
  const query = (userMessage || '').toLowerCase();

  if (query.includes('improve') || query.includes('positioning') || query.includes('stand for') || query.includes('why isn')) {
    return CHATBOT_KNOWLEDGE_RESPONSES['improve positioning'];
  }
  if (query.includes('audience') || query.includes('customer') || query.includes('who is')) {
    return CHATBOT_KNOWLEDGE_RESPONSES['find my audience'];
  }
  if (query.includes('keyword') || query.includes('seo') || query.includes('search')) {
    return CHATBOT_KNOWLEDGE_RESPONSES['generate keywords'];
  }
  if (query.includes('competitor') || query.includes('competition') || query.includes('rival')) {
    return CHATBOT_KNOWLEDGE_RESPONSES['analyze competitors'];
  }
  if (query.includes('description') || query.includes('copy') || query.includes('describe') || query.includes('product page')) {
    return CHATBOT_KNOWLEDGE_RESPONSES['write product description'];
  }
  if (query.includes('content') || query.includes('video') || query.includes('reel') || query.includes('idea') || query.includes('market this product')) {
    return {
      what: 'Start by marketing specifically to health-conscious young professionals facing the 4 PM workday hunger slump.',
      why: 'Young professionals are already searching for better snacking alternatives and love sharing crisp food review reels.',
      whatNext: 'Launch a 30-second vertical video showing a workplace crunch test with authentic customer reactions.',
      actionLabel: 'Launch Targeted Reel',
      actionType: 'launch-reel',
      bridgeNav: { label: 'Launch Targeted Reel →', view: 'launch-reels' }
    };
  }

  // Default fallback strategist response
  return {
    what: `Analyzing "${userMessage}" through our D2C growth framework.`,
    why: 'Early-stage D2C brands succeed not by copying mass corporate brands, but by dominating a distinct regional niche with authentic storytelling.',
    whatNext: 'Review your 5 positioning factors below, then generate targeted search keywords or launch a targeted reel to test audience reception.',
    actionLabel: 'Review Value Proposition',
    actionType: 'view-positioning',
    bridgeNav: { label: 'Explore 30-Day Growth Plan →', view: 'roadmap' }
  };
}
