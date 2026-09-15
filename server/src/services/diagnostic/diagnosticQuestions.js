// server/src/services/diagnostic/diagnosticQuestions.js
// Centralized authoritative 24 diagnostic questions and 0-100 rubric mapping

const DIAGNOSTIC_FACTORS = [
  { id: 'PRODUCT', key: 'product', label: 'Product', description: 'Product readiness, standardization & iteration speed' },
  { id: 'SALES', key: 'sales', label: 'Sales', description: 'Revenue predictability, sales process & customer economics' },
  { id: 'BRANDING', key: 'branding', label: 'Branding', description: 'Positioning clarity, differentiation & visual identity' },
  { id: 'MARKETING', key: 'marketing', label: 'Marketing', description: 'Customer acquisition, campaign execution & performance tracking' },
  { id: 'REACH', key: 'reach', label: 'Reach', description: 'Audience access, distribution channels & organic discovery' },
  { id: 'FUNDING', key: 'funding', label: 'Funding', description: 'Financial documentation, capital budgeting & investment readiness' }
];

const DIAGNOSTIC_QUESTIONS = {
  marketing: [
    {
      id: 'mkt_q1',
      factor: 'MARKETING',
      key: 'marketing.target_customer',
      title: 'Target Customer Definition',
      prompt: 'Do you have a clearly defined target customer profile?',
      rubric: {
        'opt_0': 0,
        'opt_20': 20,
        'opt_40': 40,
        'opt_60': 60,
        'opt_80': 80,
        'opt_100': 100
      }
    },
    {
      id: 'mkt_q2',
      factor: 'MARKETING',
      key: 'marketing.acquisition_channel',
      title: 'Customer Acquisition Channel',
      prompt: 'Do you have a repeatable customer acquisition channel?',
      rubric: {
        'opt_0': 0,
        'opt_20': 20,
        'opt_40': 40,
        'opt_60': 60,
        'opt_80': 80,
        'opt_100': 100
      }
    },
    {
      id: 'mkt_q3',
      factor: 'MARKETING',
      key: 'marketing.performance_tracking',
      title: 'Marketing Performance Tracking',
      prompt: 'Do you track marketing performance and conversion metrics?',
      rubric: {
        'opt_0': 0,
        'opt_20': 20,
        'opt_40': 40,
        'opt_60': 60,
        'opt_80': 80,
        'opt_100': 100
      }
    },
    {
      id: 'mkt_q4',
      factor: 'MARKETING',
      key: 'marketing.campaign_execution',
      title: 'Campaign Execution',
      prompt: 'Do you run structured promotional campaigns regularly?',
      rubric: {
        'opt_0': 0,
        'opt_20': 20,
        'opt_40': 40,
        'opt_60': 60,
        'opt_80': 80,
        'opt_100': 100
      }
    }
  ],
  branding: [
    {
      id: 'brd_q1',
      factor: 'BRANDING',
      key: 'branding.positioning_clarity',
      title: 'Brand Positioning',
      prompt: 'Is your brand positioning clearly defined for your target customer?',
      rubric: { 'opt_0': 0, 'opt_20': 20, 'opt_40': 40, 'opt_60': 60, 'opt_80': 80, 'opt_100': 100 }
    },
    {
      id: 'brd_q2',
      factor: 'BRANDING',
      key: 'branding.differentiation',
      title: 'Customer Perception of Difference',
      prompt: 'Do customers clearly understand why your brand is different from alternatives?',
      rubric: { 'opt_0': 0, 'opt_20': 20, 'opt_40': 40, 'opt_60': 60, 'opt_80': 80, 'opt_100': 100 }
    },
    {
      id: 'brd_q3',
      factor: 'BRANDING',
      key: 'branding.visual_identity',
      title: 'Visual Identity Consistency',
      prompt: 'Is your visual identity consistent across all customer touchpoints?',
      rubric: { 'opt_0': 0, 'opt_20': 20, 'opt_40': 40, 'opt_60': 60, 'opt_80': 80, 'opt_100': 100 }
    },
    {
      id: 'brd_q4',
      factor: 'BRANDING',
      key: 'branding.messaging_story',
      title: 'Brand Messaging & Story',
      prompt: 'Do you have a clear, compelling brand story that resonates with buyers?',
      rubric: { 'opt_0': 0, 'opt_20': 20, 'opt_40': 40, 'opt_60': 60, 'opt_80': 80, 'opt_100': 100 }
    }
  ],
  product: [
    {
      id: 'prd_q1',
      factor: 'PRODUCT',
      key: 'product.standardization',
      title: 'Product Specification & Standardization',
      prompt: 'Is your product formulation, quality, and packaging standardized?',
      rubric: { 'opt_0': 0, 'opt_20': 20, 'opt_40': 40, 'opt_60': 60, 'opt_80': 80, 'opt_100': 100 }
    },
    {
      id: 'prd_q2',
      factor: 'PRODUCT',
      key: 'product.purchase_validation',
      title: 'Customer Purchase Validation',
      prompt: 'Have non-family customers purchased and repurchased your product?',
      rubric: { 'opt_0': 0, 'opt_20': 20, 'opt_40': 40, 'opt_60': 60, 'opt_80': 80, 'opt_100': 100 }
    },
    {
      id: 'prd_q3',
      factor: 'PRODUCT',
      key: 'product.feedback_collection',
      title: 'Customer Feedback Collection',
      prompt: 'Do you collect and document structured customer reviews and feedback?',
      rubric: { 'opt_0': 0, 'opt_20': 20, 'opt_40': 40, 'opt_60': 60, 'opt_80': 80, 'opt_100': 100 }
    },
    {
      id: 'prd_q4',
      factor: 'PRODUCT',
      key: 'product.feedback_iteration',
      title: 'Feedback-Driven Iteration',
      prompt: 'Have you iterated on your packaging, taste, or sizing based on user feedback?',
      rubric: { 'opt_0': 0, 'opt_20': 20, 'opt_40': 40, 'opt_60': 60, 'opt_80': 80, 'opt_100': 100 }
    }
  ],
  sales: [
    {
      id: 'sls_q1',
      factor: 'SALES',
      key: 'sales.consistency',
      title: 'Sales Consistency',
      prompt: 'Do you make sales consistently week over week?',
      rubric: { 'opt_0': 0, 'opt_20': 20, 'opt_40': 40, 'opt_60': 60, 'opt_80': 80, 'opt_100': 100 }
    },
    {
      id: 'sls_q2',
      factor: 'SALES',
      key: 'sales.revenue_tracking',
      title: 'Monthly Revenue Tracking',
      prompt: 'Do you track monthly revenue and order volume accurately?',
      rubric: { 'opt_0': 0, 'opt_20': 20, 'opt_40': 40, 'opt_60': 60, 'opt_80': 80, 'opt_100': 100 }
    },
    {
      id: 'sls_q3',
      factor: 'SALES',
      key: 'sales.defined_process',
      title: 'Defined Sales Process',
      prompt: 'Do you have a clear checkout and fulfillment process for orders?',
      rubric: { 'opt_0': 0, 'opt_20': 20, 'opt_40': 40, 'opt_60': 60, 'opt_80': 80, 'opt_100': 100 }
    },
    {
      id: 'sls_q4',
      factor: 'SALES',
      key: 'sales.analytics_economics',
      title: 'Unit Economics & Customer Value',
      prompt: 'Do you know your average order value (AOV) and gross margins?',
      rubric: { 'opt_0': 0, 'opt_20': 20, 'opt_40': 40, 'opt_60': 60, 'opt_80': 80, 'opt_100': 100 }
    }
  ],
  reach: [
    {
      id: 'rch_q1',
      factor: 'REACH',
      key: 'reach.audience_access',
      title: 'Audience Access & Presence',
      prompt: 'Do you have direct access to your audience through digital channels?',
      rubric: { 'opt_0': 0, 'opt_20': 20, 'opt_40': 40, 'opt_60': 60, 'opt_80': 80, 'opt_100': 100 }
    },
    {
      id: 'rch_q2',
      factor: 'REACH',
      key: 'reach.distribution_channels',
      title: 'Active Distribution Channels',
      prompt: 'How many active distribution channels currently sell your products?',
      rubric: { 'opt_0': 0, 'opt_20': 20, 'opt_40': 40, 'opt_60': 60, 'opt_80': 80, 'opt_100': 100 }
    },
    {
      id: 'rch_q3',
      factor: 'REACH',
      key: 'reach.organic_discovery',
      title: 'Organic Discovery & Word of Mouth',
      prompt: 'Do new customers find you organically through search, reels, or referrals?',
      rubric: { 'opt_0': 0, 'opt_20': 20, 'opt_40': 40, 'opt_60': 60, 'opt_80': 80, 'opt_100': 100 }
    },
    {
      id: 'rch_q4',
      factor: 'REACH',
      key: 'reach.geographic_expansion',
      title: 'Scalable Out-of-State / Multi-City Reach',
      prompt: 'Have you proven delivery capabilities beyond your immediate district?',
      rubric: { 'opt_0': 0, 'opt_20': 20, 'opt_40': 40, 'opt_60': 60, 'opt_80': 80, 'opt_100': 100 }
    }
  ],
  funding: [
    {
      id: 'fnd_q1',
      factor: 'FUNDING',
      key: 'funding.financial_records',
      title: 'Financial Records & Bookkeeping',
      prompt: 'Do you maintain formal financial statements (P&L, GST invoices)?',
      rubric: { 'opt_0': 0, 'opt_20': 20, 'opt_40': 40, 'opt_60': 60, 'opt_80': 80, 'opt_100': 100 }
    },
    {
      id: 'fnd_q2',
      factor: 'FUNDING',
      key: 'funding.capital_budgeting',
      title: 'Capital Budgeting & Funding Plan',
      prompt: 'Do you have a clear financial plan for how new capital will be used?',
      rubric: { 'opt_0': 0, 'opt_20': 20, 'opt_40': 40, 'opt_60': 60, 'opt_80': 80, 'opt_100': 100 }
    },
    {
      id: 'fnd_q3',
      factor: 'FUNDING',
      key: 'funding.compliance_readiness',
      title: 'Statutory Compliance & Registrations',
      prompt: 'Is your brand formally registered (Udyam, FSSAI, GST, Trade License)?',
      rubric: { 'opt_0': 0, 'opt_20': 20, 'opt_40': 40, 'opt_60': 60, 'opt_80': 80, 'opt_100': 100 }
    },
    {
      id: 'fnd_q4',
      factor: 'FUNDING',
      key: 'funding.pitch_materials',
      title: 'Pitch Materials & Investor Readiness',
      prompt: 'Do you have an executive summary or pitch deck ready for grant/loan evaluation?',
      rubric: { 'opt_0': 0, 'opt_20': 20, 'opt_40': 40, 'opt_60': 60, 'opt_80': 80, 'opt_100': 100 }
    }
  ]
};

/**
 * Maps an answer key or score number to authoritative integer score (0, 20, 40, 60, 80, 100)
 */
function resolveScoreFromAnswer(question, answerKeyOrVal) {
  if (typeof answerKeyOrVal === 'number') {
    const validScores = [0, 20, 40, 60, 80, 100];
    if (validScores.includes(answerKeyOrVal)) return answerKeyOrVal;
  }
  if (typeof answerKeyOrVal === 'string') {
    if (question.rubric && question.rubric[answerKeyOrVal] !== undefined) {
      return question.rubric[answerKeyOrVal];
    }
    const parsed = parseInt(answerKeyOrVal, 10);
    if (!isNaN(parsed) && [0, 20, 40, 60, 80, 100].includes(parsed)) {
      return parsed;
    }
  }
  return 0;
}

module.exports = {
  DIAGNOSTIC_FACTORS,
  DIAGNOSTIC_QUESTIONS,
  resolveScoreFromAnswer
};
