// client/src/scoring/recommendationEngine.js
// Rule-based bottleneck detection and Next Best Action generator
// Derives actions strictly from observable factor scores with transparent citations.

export function getGapPriority(score) {
  if (score < 40) return { label: 'CRITICAL GAP', variant: 'rose' };
  if (score < 60) return { label: 'HIGH PRIORITY', variant: 'warning' };
  if (score < 80) return { label: 'DEVELOPING', variant: 'brand' };
  return { label: 'RELATIVE STRENGTH', variant: 'success' };
}

export function detectBottlenecksAndActions(factorsMap = {}) {
  // Sort factors from lowest to highest score
  const factorList = Object.values(factorsMap).sort((a, b) => a.score - b.score);
  const lowest = factorList[0] || { id: 'marketing', score: 50, label: 'Marketing' };
  const secondLowest = factorList[1] || { id: 'branding', score: 60, label: 'Branding' };

  const mktScore = factorsMap.marketing?.score ?? 50;
  const brdScore = factorsMap.branding?.score ?? 60;
  const slsScore = factorsMap.sales?.score ?? 70;
  const prdScore = factorsMap.product?.score ?? 85;
  const rchScore = factorsMap.reach?.score ?? 70;
  const fndScore = factorsMap.funding?.score ?? 75;

  // Rule-based derivation of Next Best Action
  let nextBestAction = {
    title: 'Sharpen Positioning & Systematic Customer Acquisition',
    priority: 'Fix positioning before increasing promotional spend',
    actionText: 'Execute Week 1 Roadmap',
    actionUrl: 'roadmap',
    explanation: 'Your product foundation is verified, but customer acquisition and brand clarity are currently limiting sales velocity.',
    whyRecommendation: [
      { factor: 'Marketing', score: mktScore, label: 'Marketing Score' },
      { factor: 'Branding', score: brdScore, label: 'Branding Score' },
      { factor: 'Product', score: prdScore, label: 'Product Score' }
    ]
  };

  if (mktScore <= 55 && brdScore <= 60) {
    nextBestAction = {
      title: 'Define Target Customer & Sharpen Brand Differentiation',
      priority: 'Fix positioning before increasing promotional spend',
      actionText: 'Refine Brand Positioning',
      actionUrl: 'roadmap',
      explanation: 'Promoting an unclear brand message burns budget. Lock in your core customer profile and USP before running paid campaigns.',
      whyRecommendation: [
        { factor: 'Marketing', score: mktScore, label: 'Customer acquisition needs clearer target profile' },
        { factor: 'Branding', score: brdScore, label: 'Differentiation is not yet validated by customers' },
        { factor: 'Product', score: prdScore, label: 'Product quality is established, ready for focused marketing' }
      ]
    };
  } else if (prdScore >= 75 && slsScore < 55 && mktScore < 55) {
    nextBestAction = {
      title: 'Build Predictable Go-To-Market & Order Funnels',
      priority: 'Product is ready; Go-to-market engine needs execution',
      actionText: 'Build Sales Funnel',
      actionUrl: 'marketing',
      explanation: 'Your product has strong validation, but sales generation relies on unpredictable ad-hoc channels. Focus on 1 repeatable acquisition loop.',
      whyRecommendation: [
        { factor: 'Product', score: prdScore, label: 'Strong product foundation' },
        { factor: 'Sales', score: slsScore, label: 'Inconsistent monthly order velocity' },
        { factor: 'Marketing', score: mktScore, label: 'No repeatable acquisition loop' }
      ]
    };
  } else if (slsScore < 50 && prdScore >= 70) {
    nextBestAction = {
      title: 'Standardize Sales & Fulfillment Process',
      priority: 'Streamline checkout and repeatable ordering',
      actionText: 'View Sales Strategy',
      actionUrl: 'roadmap',
      explanation: 'Your product has strong traction potential, but manual ordering and lack of repeat tracking throttle revenue.',
      whyRecommendation: [
        { factor: 'Sales', score: slsScore, label: 'Order process requires standardization' },
        { factor: 'Product', score: prdScore, label: 'Customer acceptance is validated' }
      ]
    };
  } else if (fndScore < 50 && slsScore >= 60) {
    nextBestAction = {
      title: 'Prepare Clean Bookkeeping & Funding Dossier',
      priority: 'Operational revenue is established; financials need audit readiness',
      actionText: 'Prepare Metrics Docket',
      actionUrl: 'funding',
      explanation: 'Your business has real sales momentum, but institutional schemes (e.g. Stand-Up India) require structured P&L and GST documentation.',
      whyRecommendation: [
        { factor: 'Sales', score: slsScore, label: 'Demonstrated commercial traction' },
        { factor: 'Funding', score: fndScore, label: 'Financial paperwork needs formal structuring' }
      ]
    }
  }

  // Top 3 Prioritized Growth Gaps
  const topGaps = [
    {
      id: `gap-${lowest.id}`,
      dimension: lowest.label,
      score: lowest.score,
      maturity: lowest.maturity,
      priority: getGapPriority(lowest.score),
      diagnosis:
        lowest.id === 'marketing'
          ? 'Your customer acquisition strategy relies on ad-hoc posts without a measured, repeatable channel.'
          : lowest.id === 'branding'
          ? 'Your brand positioning is unclear compared with established regional and national D2C brands.'
          : `${lowest.label} scored ${lowest.score}/100 and requires structured process improvement.`,
      actionText: lowest.id === 'marketing' ? 'Fix this' : 'Improve',
      actionUrl: lowest.id === 'marketing' ? 'marketing' : 'roadmap'
    },
    {
      id: `gap-${secondLowest.id}`,
      dimension: secondLowest.label,
      score: secondLowest.score,
      maturity: secondLowest.maturity,
      priority: getGapPriority(secondLowest.score),
      diagnosis:
        secondLowest.id === 'branding'
          ? 'Customer differentiation is not yet documented or validated through consistent messaging.'
          : secondLowest.id === 'marketing'
          ? 'Customer acquisition is lagging product readiness.'
          : `${secondLowest.label} scored ${secondLowest.score}/100 and limits growth velocity.`,
      actionText: 'Improve',
      actionUrl: 'roadmap'
    },
    {
      id: `gap-${factorList[2]?.id || 'sales'}`,
      dimension: factorList[2]?.label || 'Sales',
      score: factorList[2]?.score || 70,
      maturity: factorList[2]?.maturity || 'Developing',
      priority: getGapPriority(factorList[2]?.score || 70),
      diagnosis:
        'Revenue exists, but month-on-month velocity needs recurring retention funnels to achieve predictability.',
      actionText: 'View strategy',
      actionUrl: 'roadmap'
    }
  ];

  return {
    primaryBottleneck: lowest,
    secondaryBottleneck: secondLowest,
    summaryHeadline: `Your biggest growth constraint is ${lowest.label}.`,
    summarySubtitle: `${secondLowest.label} is also limiting customer acquisition velocity.`,
    nextBestAction: nextBestAction,
    topGaps: topGaps
  };
}
