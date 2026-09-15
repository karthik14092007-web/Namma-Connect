// client/src/scoring/diagnosticQuestions.js
// 24 Diagnostic Questions across 6 factors with 6-level answer ladders (0, 20, 40, 60, 80, 100)

export const DIAGNOSTIC_FACTORS = [
  { id: 'product', label: 'Product', iconName: 'Package', description: 'Product readiness, customer value proposition & iteration speed' },
  { id: 'sales', label: 'Sales', iconName: 'TrendingUp', description: 'Revenue predictability, sales process & customer economics' },
  { id: 'branding', label: 'Branding', iconName: 'Sparkles', description: 'Positioning clarity, differentiation & visual identity' },
  { id: 'marketing', label: 'Marketing', iconName: 'Megaphone', description: 'Customer acquisition, campaign execution & performance tracking' },
  { id: 'reach', label: 'Reach', iconName: 'Share2', description: 'Audience access, distribution channels & organic discovery' },
  { id: 'funding', label: 'Funding', iconName: 'Coins', description: 'Financial documentation, capital budgeting & investment readiness' }
];

export const DIAGNOSTIC_QUESTIONS = {
  marketing: [
    {
      id: 'mkt_q1',
      factor: 'marketing',
      title: 'Target Customer Definition',
      prompt: 'Do you have a clearly defined target customer profile?',
      options: [
        { score: 0, label: 'No specific customer identified', desc: 'Selling broadly without defined customer criteria' },
        { score: 20, label: 'Broad idea of who might buy', desc: 'General demographic assumptions with no written documentation' },
        { score: 40, label: 'Basic customer segment identified', desc: 'Identified broad age or lifestyle group (e.g., young families)' },
        { score: 60, label: 'Specific customer profile documented', desc: 'Clear persona with dietary, geographic, and budget parameters' },
        { score: 80, label: 'Target customer consistently used in campaigns', desc: 'Promotions, copy, and packaging specifically tailored to this persona' },
        { score: 100, label: 'Clearly defined and validated customer segment', desc: 'Validated through repeated purchases and high conversion rates' }
      ]
    },
    {
      id: 'mkt_q2',
      factor: 'marketing',
      title: 'Customer Acquisition Channel',
      prompt: 'Do you have a repeatable customer acquisition channel?',
      options: [
        { score: 0, label: 'No acquisition method', desc: 'No reliable way to bring in new potential buyers' },
        { score: 20, label: 'Only relying on personal network', desc: 'Sales only happen via friends, family, and direct referrals' },
        { score: 40, label: 'Experimenting with channels', desc: 'Testing social media posts, stalls, and whatsapp groups' },
        { score: 60, label: 'One channel showing early consistency', desc: 'One channel (e.g. regional exhibitions or Launch Reels) brings steady leads' },
        { score: 80, label: 'Repeatable acquisition process', desc: 'Documented routine that predictably generates new customer inquiries' },
        { score: 100, label: 'Proven and consistently performing acquisition channel', desc: 'High-ROI channel with measurable customer acquisition cost (CAC)' }
      ]
    },
    {
      id: 'mkt_q3',
      factor: 'marketing',
      title: 'Marketing Performance Tracking',
      prompt: 'Do you track marketing performance and conversion metrics?',
      options: [
        { score: 0, label: 'No tracking', desc: 'Promotions are done without monitoring responses' },
        { score: 20, label: 'Only observing views and likes', desc: 'Looking at superficial social engagement metrics without sales correlation' },
        { score: 40, label: 'Basic metrics occasionally checked', desc: 'Occasionally noting click counts and total weekly website visits' },
        { score: 60, label: 'Regularly tracking campaign metrics', desc: 'Consistently reviewing click-through rates, lead volume, and order sources' },
        { score: 80, label: 'Comparing campaign performance', desc: 'Benchmarking channels to identify what drives actual paying orders' },
        { score: 100, label: 'Using data consistently to optimize marketing', desc: 'Allocating promotional budget strictly based on ROAS and conversion data' }
      ]
    },
    {
      id: 'mkt_q4',
      factor: 'marketing',
      title: 'Campaign Execution',
      prompt: 'Are you actively running structured marketing campaigns?',
      options: [
        { score: 0, label: 'No campaigns', desc: 'Zero active promotional or marketing initiatives' },
        { score: 20, label: 'Occasional promotional posts', desc: 'Sporadic, ad-hoc posts when time permits' },
        { score: 40, label: 'Basic organic promotion', desc: 'Regular organic posting schedule across WhatsApp and Instagram' },
        { score: 60, label: 'Regular campaigns with targeted goals', desc: 'Monthly themed promotions (festivals, product launches, bundles)' },
        { score: 80, label: 'Structured campaigns with defined objectives', desc: 'Targeted campaigns with dedicated landing flows and measured reach' },
        { score: 100, label: 'Consistent campaigns with measured outcomes', desc: 'Multi-touch campaigns consistently driving predictable sales lifts' }
      ]
    }
  ],

  branding: [
    {
      id: 'brd_q1',
      factor: 'branding',
      title: 'Brand Positioning',
      prompt: 'Do you have clear brand positioning against competitors?',
      options: [
        { score: 0, label: 'No clear positioning', desc: 'No defined position; perceived as a generic commodity' },
        { score: 20, label: 'General product description', desc: 'Positioned merely as "tasty snack" or "quality handloom"' },
        { score: 40, label: 'Basic positioning idea', desc: 'Identified an angle (e.g., zero palm oil, native heirloom grain)' },
        { score: 60, label: 'Defined positioning statement', desc: 'Written positioning clarifying who it is for and the core value promise' },
        { score: 80, label: 'Consistently communicated positioning', desc: 'Positioning reflected in every label, post, and founder pitch' },
        { score: 100, label: 'Strong, validated differentiation', desc: 'Customers choose the brand specifically for this unique position' }
      ]
    },
    {
      id: 'brd_q2',
      factor: 'branding',
      title: 'Customer Perception of Difference',
      prompt: 'Can customers easily understand why your product is different?',
      options: [
        { score: 0, label: 'Difference is unclear', desc: 'Buyers frequently compare you to mass-market commercial options' },
        { score: 20, label: 'Founder can explain it', desc: 'Clear in the founder’s head, but not obvious to a casual customer' },
        { score: 40, label: 'Basic differentiation exists', desc: 'Packaging highlights 1 or 2 key USPs (e.g. roasted not fried)' },
        { score: 60, label: 'Differentiation is communicated', desc: 'Most buyers readily understand why you charge a premium' },
        { score: 80, label: 'Customers recognize the difference', desc: 'Repeat customers actively cite your unique qualities in reviews' },
        { score: 100, label: 'Differentiation validated through customer response', desc: 'Strong brand loyalty and word-of-mouth advocacy based on your USP' }
      ]
    },
    {
      id: 'brd_q3',
      factor: 'branding',
      title: 'Visual Identity Consistency',
      prompt: 'Do you have a consistent brand visual identity?',
      options: [
        { score: 0, label: 'No defined identity', desc: 'Inconsistent colors, mismatched fonts, and generic packaging' },
        { score: 20, label: 'Basic logo and name', desc: 'Have a logo design but packaging varies widely between batches' },
        { score: 40, label: 'Some visual consistency', desc: 'Standard colors used across primary pouch or box labels' },
        { score: 60, label: 'Defined visual identity', desc: 'Documented brand colors, typography, and packaging templates' },
        { score: 80, label: 'Consistent identity across channels', desc: 'Uniform aesthetic across retail packs, social profiles, and shipping boxes' },
        { score: 100, label: 'Strong and recognizable brand identity', desc: 'Instantly recognizable shelf and digital presence with cohesive aesthetic' }
      ]
    },
    {
      id: 'brd_q4',
      factor: 'branding',
      title: 'Brand Messaging & Story',
      prompt: 'Do you have consistent brand messaging and founder storytelling?',
      options: [
        { score: 0, label: 'No defined messaging', desc: 'No narrative around origin, mission, or ingredients' },
        { score: 20, label: 'Ad-hoc messaging', desc: 'Different stories told depending on who is asking' },
        { score: 40, label: 'Some recurring messages', desc: 'Core tagline used on packaging and basic social bio' },
        { score: 60, label: 'Defined messaging framework', desc: 'Documented origin story, ingredient values, and brand promise' },
        { score: 80, label: 'Consistent content/message pillars', desc: 'Founder story and heritage values consistently reinforced in all media' },
        { score: 100, label: 'Strong, validated messaging', desc: 'Authentic founder narrative drives customer emotional affinity and press' }
      ]
    }
  ],

  sales: [
    {
      id: 'sls_q1',
      factor: 'sales',
      title: 'Sales Consistency',
      prompt: 'Do you have consistent, predictable monthly sales?',
      options: [
        { score: 0, label: 'No sales yet', desc: 'Pre-revenue stage without paying customer transactions' },
        { score: 20, label: 'Infrequent, ad-hoc orders', desc: 'Sales come in irregular bursts without monthly predictability' },
        { score: 40, label: 'Early sales traction', desc: 'Modest baseline revenue (₹20K–₹50K/mo) with seasonal swings' },
        { score: 60, label: 'Consistent monthly sales volume', desc: 'Reliable recurring baseline revenue (₹1L–₹2L/mo)' },
        { score: 80, label: 'Predictable month-on-month growth', desc: 'Steady monthly revenue growth with recurring subscription or retail re-orders' },
        { score: 100, label: 'High-velocity compounding sales', desc: 'Strong revenue consistency across both direct online orders and retail stockists' }
      ]
    },
    {
      id: 'sls_q2',
      factor: 'sales',
      title: 'Monthly Revenue Tracking',
      prompt: 'Do you track monthly revenue, gross margins, and order volume?',
      options: [
        { score: 0, label: 'No revenue tracking', desc: 'Bank balance is checked without itemized sales bookkeeping' },
        { score: 20, label: 'Rough monthly revenue totals', desc: 'Noting monthly top-line numbers without margin breakdown' },
        { score: 40, label: 'Basic spreadsheet tracking', desc: 'Tracking orders, revenue, and major packaging/raw material costs monthly' },
        { score: 60, label: 'Structured financial records', desc: 'Monthly P&L tracking gross margins, shipping costs, and payment fees' },
        { score: 80, label: 'Unit economics and margin analysis', desc: 'Accurate contribution margin tracked per SKU and sales channel' },
        { score: 100, label: 'Automated real-time financial reporting', desc: 'Live accounting dashboard with automated inventory and cohort tracking' }
      ]
    },
    {
      id: 'sls_q3',
      factor: 'sales',
      title: 'Defined Sales Process',
      prompt: 'Do you have a structured sales and checkout fulfillment process?',
      options: [
        { score: 0, label: 'No defined process', desc: 'Taking manual orders over phone with unstructured dispatch' },
        { score: 20, label: 'Informal order handling', desc: 'Manual UPI requests and individual courier bookings' },
        { score: 40, label: 'Basic standardized ordering', desc: 'Direct WhatsApp/website checkout with standard packing procedure' },
        { score: 60, label: 'Integrated order and dispatch workflow', desc: 'Streamlined online store, automated shipping labels, and tracking notifications' },
        { score: 80, label: 'Optimized fulfillment pipeline', desc: 'SLA-backed dispatch within 24 hours and automated order follow-ups' },
        { score: 100, label: 'Seamless omnichannel sales engine', desc: 'Robust B2C online pipeline plus structured B2B wholesale ordering portal' }
      ]
    },
    {
      id: 'sls_q4',
      factor: 'sales',
      title: 'Product & Customer Analytics',
      prompt: 'Do you understand your best-selling products and customer repeat patterns?',
      options: [
        { score: 0, label: 'No customer data', desc: 'No knowledge of who buys what or repeat frequency' },
        { score: 20, label: 'Anecdotal observation', desc: 'Noticing which flavor or SKU seems to sell out faster' },
        { score: 40, label: 'Identified top 2 selling SKUs', desc: 'Clear idea of primary revenue driver products' },
        { score: 60, label: 'Documented SKU velocity and repeat rates', desc: 'Tracking repeat purchase percentage and average order value (AOV)' },
        { score: 80, label: 'Customer cohort analysis', desc: 'Understanding customer lifetime value (LTV) and re-order intervals' },
        { score: 100, label: 'Data-driven inventory and bundling', desc: 'Using purchase affinities to drive bundles, up-sells, and production schedules' }
      ]
    }
  ],

  product: [
    {
      id: 'prd_q1',
      factor: 'product',
      title: 'Product Specification & Standardization',
      prompt: 'Is your product clearly defined, standardized, and recipe-locked?',
      options: [
        { score: 0, label: 'Concept only', desc: 'Idea stage without a finalized sample or recipe' },
        { score: 20, label: 'Home kitchen experiments', desc: 'Batch quality varies between runs' },
        { score: 40, label: 'Standard recipe / craft spec established', desc: 'Fixed ingredient ratios, cooking times, or weaving patterns' },
        { score: 60, label: 'Commercial batch standardization', desc: 'Standardized SOPs ensuring uniform taste, weight, and shelf life' },
        { score: 80, label: 'Certified and lab-tested specification', desc: 'FSSAI certified, nutritional analysis completed, and batch-tested' },
        { score: 100, label: 'Scalable production-grade standard', desc: 'Contract manufacturing or clean dedicated facility with QA benchmarks' }
      ]
    },
    {
      id: 'prd_q2',
      factor: 'product',
      title: 'Customer Purchase Validation',
      prompt: 'Have unbiased paying customers purchased your product repeatedly?',
      options: [
        { score: 0, label: 'No customer purchases', desc: 'Product has not yet been bought by real market customers' },
        { score: 20, label: 'Only friends & family purchased', desc: 'Purchases limited to personal circle for goodwill support' },
        { score: 40, label: 'First 50+ stranger purchases', desc: 'Validated by real buyers at local pop-ups, farmer markets, or online' },
        { score: 60, label: 'Consistent customer purchases (500+ units)', desc: 'Strong initial validation with spontaneous unsolicited orders' },
        { score: 80, label: 'Significant volume with high repeat rate', desc: 'Over 2,000+ units sold with > 25% repeat purchase rate' },
        { score: 100, label: 'Category-validated product-market fit', desc: 'Over 10,000+ units sold with stellar organic re-orders and 4.8+ ratings' }
      ]
    },
    {
      id: 'prd_q3',
      factor: 'product',
      title: 'Customer Feedback Collection',
      prompt: 'Do you systematically collect customer feedback on quality and packaging?',
      options: [
        { score: 0, label: 'No feedback collected', desc: 'No mechanism for customers to share thoughts or complaints' },
        { score: 20, label: 'Passive feedback only', desc: 'Only hearing from customers when an issue or transit breakage occurs' },
        { score: 40, label: 'Occasional informal inquiries', desc: 'Asking known buyers via WhatsApp how they liked the product' },
        { score: 60, label: 'Structured post-purchase reviews', desc: 'Automated or systematic review prompts collecting ratings and taste notes' },
        { score: 80, label: 'Continuous NPS and satisfaction tracking', desc: 'Review dashboard analyzing feedback trends across taste, crunch, and pack size' },
        { score: 100, label: 'Comprehensive customer feedback loop', desc: 'Customer community actively co-testing new flavors and packaging variants' }
      ]
    },
    {
      id: 'prd_q4',
      factor: 'product',
      title: 'Feedback-Driven Iteration',
      prompt: 'Are you improving packaging, shelf-life, or formulation based on feedback?',
      options: [
        { score: 0, label: 'No improvements made', desc: 'Product and packaging have remained unchanged despite criticism' },
        { score: 20, label: 'Minor ad-hoc adjustments', desc: 'Fixing packaging seals when leaks were reported' },
        { score: 40, label: 'One major iteration completed', desc: 'Refined spice blend or upgraded pouch material based on early reactions' },
        { score: 60, label: 'Regular quality refinements', desc: 'Iterated zip-lock pouch, improved nitrogen flush, and verified 6-month shelf life' },
        { score: 80, label: 'Systematic product enhancement', desc: 'Multiple validated product version updates improving taste, transit safety, and unboxing' },
        { score: 100, label: 'World-class continuous R&D loop', desc: 'Rapid innovation pipeline with superior customer delight metrics' }
      ]
    }
  ],

  reach: [
    {
      id: 'rch_q1',
      factor: 'reach',
      title: 'Audience Access & Presence',
      prompt: 'Do you have direct access to your target audience without paying intermediaries?',
      options: [
        { score: 0, label: 'No direct access', desc: 'Zero followers, subscriber list, or direct customer contacts' },
        { score: 20, label: 'Very small personal circle', desc: 'A personal WhatsApp status or private social account (<200 people)' },
        { score: 40, label: 'Growing brand social presence', desc: 'Brand account with 500–2,000 relevant local followers' },
        { score: 60, label: 'Engaged community / customer database', desc: 'Over 1,000+ verified customer phone numbers and engaged followers' },
        { score: 80, label: 'Strong owned regional audience', desc: 'Active broadcast group, email list, and dedicated regional consumer following' },
        { score: 100, label: 'Thriving owned distribution channel', desc: 'Large, loyal community that eagerly anticipates every launch' }
      ]
    },
    {
      id: 'rch_q2',
      factor: 'reach',
      title: 'Active Distribution Channels',
      prompt: 'Through what channels can customers discover and buy your product?',
      options: [
        { score: 0, label: 'No active distribution', desc: 'Product cannot be purchased anywhere currently' },
        { score: 20, label: 'Single manual channel', desc: 'Only via direct WhatsApp message or personal phone call' },
        { score: 40, label: 'Functional D2C online store', desc: 'Own website or marketplace listing accepting digital payments' },
        { score: 60, label: 'Multi-channel presence', desc: 'Own D2C site plus 3–5 local gourmet retail outlets or community stalls' },
        { score: 80, label: 'Established regional distribution network', desc: 'D2C online store, quick-commerce presence, and 20+ regional retail stockists' },
        { score: 100, label: 'Omnichannel national distribution', desc: 'Strong online presence, modern trade retail partnerships, and institutional supply' }
      ]
    },
    {
      id: 'rch_q3',
      factor: 'reach',
      title: 'Organic Discovery & Word of Mouth',
      prompt: 'Are people discovering your brand organically without paid ads?',
      options: [
        { score: 0, label: 'Zero organic discovery', desc: 'Nobody finds the brand unless personally contacted' },
        { score: 20, label: 'Rare organic referral', desc: 'An occasional recommendation from an enthusiastic acquaintance' },
        { score: 40, label: 'Occasional social discovery', desc: 'Reels or posts occasionally bring in 2–5 new followers weekly' },
        { score: 60, label: 'Consistent word-of-mouth referrals', desc: 'Satisfied customers regularly tag the brand and recommend to friends' },
        { score: 80, label: 'Strong organic inbound velocity', desc: 'Steady stream of organic search visits, influencer mentions, and local food blogger tags' },
        { score: 100, label: 'Viral word-of-mouth momentum', desc: 'High organic viral coefficient with robust regional brand recognition' }
      ]
    },
    {
      id: 'rch_q4',
      factor: 'reach',
      title: 'Scalable Outreach Methods',
      prompt: 'Do you have repeatable methods to reach new regional customer cohorts?',
      options: [
        { score: 0, label: 'No outreach methods', desc: 'Waiting passively for customers to find the brand' },
        { score: 20, label: 'Irregular cold messages', desc: 'Occasionally reaching out to local retailers or food groups' },
        { score: 40, label: 'Event and pop-up presence', desc: 'Participating in weekend flea markets and agricultural trade fairs' },
        { score: 60, label: 'Targeted short video / Launch Reels', desc: 'Using structured D2C micro-campaigns and regional creator collaborations' },
        { score: 80, label: 'Institutional and cross-promotional partnerships', desc: 'Joint promotions with complementary brands, gyms, and organic supermarkets' },
        { score: 100, label: 'Systematic scalable outreach flywheel', desc: 'Multi-tiered partnership engine and structured regional distributor network' }
      ]
    }
  ],

  funding: [
    {
      id: 'fnd_q1',
      factor: 'funding',
      title: 'Capital Requirement Clarity',
      prompt: 'Do you know exactly how much funding you need and why?',
      options: [
        { score: 0, label: 'No estimate of capital needed', desc: 'Unsure how much money is required to reach the next milestone' },
        { score: 20, label: 'Vague lump sum figure', desc: 'Asking for "₹5L or ₹10L" without unit breakdown' },
        { score: 40, label: 'Basic expense breakdown', desc: 'Rough estimates for machinery (₹3L), raw material (₹2L), packaging (₹1L)' },
        { score: 60, label: 'Clear 12-month budget', desc: 'Itemized operational budget with working capital and marketing split' },
        { score: 80, label: 'Detailed 18-month financial projection', desc: 'Comprehensive financial model tied to specific milestone deliverables' },
        { score: 100, label: 'Audited budget and sensitivity model', desc: 'Thorough, stress-tested capital plan showing exact runway and break-even point' }
      ]
    },
    {
      id: 'fnd_q2',
      factor: 'funding',
      title: 'Financial Documentation & Bookkeeping',
      prompt: 'Is your business financially and legally documented?',
      options: [
        { score: 0, label: 'No formal documentation', desc: 'Unregistered entity with mixed personal and business accounts' },
        { score: 20, label: 'Sole proprietorship registered', desc: 'Registered enterprise with basic bank statements' },
        { score: 40, label: 'MSME registered with basic GST', desc: 'Udyam registered, active GST filing, and separate business current account' },
        { score: 60, label: 'Clean accounting records', desc: 'Tally/Zoho Books ledger with monthly GST filings and vendor receipts' },
        { score: 80, label: 'Audited annual financials', desc: 'P&L, Balance Sheet, and tax filings prepared by an accountant' },
        { score: 100, label: 'Institutional-grade data room', desc: 'Fully incorporated entity with clean cap table, MIS reports, and audited financials' }
      ]
    },
    {
      id: 'fnd_q3',
      factor: 'funding',
      title: 'Use of Funds & ROI Milestones',
      prompt: 'Can you clearly explain how funding will generate positive return?',
      options: [
        { score: 0, label: 'No clear ROI plan', desc: 'Viewing funding simply as survival cash rather than growth fuel' },
        { score: 20, label: 'General growth intention', desc: '"We will spend on marketing and hope sales increase"' },
        { score: 40, label: 'Basic milestone targets', desc: 'Plan to increase production capacity from 500 to 2,000 packs/day' },
        { score: 60, label: 'Specific ROI deliverables', desc: 'Projecting how ₹5L deployed into roasting equipment reduces unit cost by 18%' },
        { score: 80, label: 'Unit economic expansion plan', desc: 'Detailed growth milestones demonstrating how capital doubles monthly revenue' },
        { score: 100, label: 'High-conviction value creation thesis', desc: 'Proven unit economics with clear path to profitability and investor return' }
      ]
    },
    {
      id: 'fnd_q4',
      factor: 'funding',
      title: 'Funding / Grant Readiness',
      prompt: 'Are you currently ready to apply for schemes, grants, or angel capital?',
      options: [
        { score: 0, label: 'Not ready', desc: 'No pitch deck, pitch note, or scheme eligibility verification' },
        { score: 20, label: 'Basic idea summary', desc: 'A short paragraph explaining the brand' },
        { score: 40, label: 'Simple pitch deck created', desc: '10-slide presentation outlining product, market, and founder background' },
        { score: 60, label: 'Eligible for regional grants and schemes', desc: 'Documents ready for Stand-Up India, PMEGP, or startup seed funds' },
        { score: 80, label: 'Pitch deck with traction metrics', desc: 'Compelling deck with customer proof, revenue history, and clear grant application' },
        { score: 100, label: 'Fully investment-ready docket', desc: 'Dossier ready with pitch deck, video demo, cap table, and term sheet readiness' }
      ]
    }
  ]
};
