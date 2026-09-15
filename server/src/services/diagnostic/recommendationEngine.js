// server/src/services/diagnostic/recommendationEngine.js
// Rule-based bottleneck detection and Next Best Action generator

/**
 * Determine bottleneck priorities from factor scores
 * < 40 = CRITICAL GAP
 * 40–59 = HIGH PRIORITY
 * 60–79 = DEVELOPING
 * 80+ = RELATIVE STRENGTH
 */
function evaluateBottlenecks(factorScores) {
  const ranked = Object.entries(factorScores).map(([factor, score]) => {
    let priority = 'RELATIVE_STRENGTH';
    let label = 'Relative Strength';
    let urgency = 4;

    if (score < 40) {
      priority = 'CRITICAL_GAP';
      label = 'Critical Gap';
      urgency = 1;
    } else if (score < 60) {
      priority = 'HIGH_PRIORITY';
      label = 'High Priority Gap';
      urgency = 2;
    } else if (score < 80) {
      priority = 'DEVELOPING';
      label = 'Developing Stage';
      urgency = 3;
    }

    return {
      factor,
      score,
      priority,
      label,
      urgency
    };
  });

  // Sort by urgency ascending (1 = Critical first), then by score ascending
  ranked.sort((a, b) => a.urgency - b.urgency || a.score - b.score);

  // Return top 2 lowest factors as top gaps
  const topGaps = ranked.slice(0, 2).map(g => ({
    factor: g.factor,
    score: g.score,
    priority: g.priority,
    label: g.label
  }));

  return {
    ranked,
    topGaps
  };
}

/**
 * Derives authoritative Next Best Action and 30-Day Growth Plan from diagnostic bottlenecks
 */
function deriveNextBestAction(factorScores, topGaps, brandName = "Your Brand") {
  const mkt = factorScores.MARKETING || 0;
  const brd = factorScores.BRANDING || 0;
  const sls = factorScores.SALES || 0;
  const prd = factorScores.PRODUCT || 0;
  const rch = factorScores.REACH || 0;
  const fnd = factorScores.FUNDING || 0;

  // Rule 1: Marketing & Branding Bottleneck
  if (mkt < 55 && brd < 65) {
    return {
      priority: "Fix positioning before increasing promotional spend",
      title: "Define Target Customer & Sharpen Brand Differentiation",
      action: "Narrow your core messaging to a distinct regional niche (e.g., young professionals) before deploying ad budgets.",
      reason: `Marketing readiness is at ${mkt}/100 and branding is limiting customer acquisition at ${brd}/100.`,
      citations: [
        { factor: "MARKETING", score: mkt, threshold: 50 },
        { factor: "BRANDING", score: brd, threshold: 60 }
      ],
      recommendedPlan: [
        { week: 1, title: "Define Target Customer & Audit ICP", factor: "MARKETING", priority: "HIGH" },
        { week: 2, title: "Sharpen Positioning & Packaging Message", factor: "BRANDING", priority: "HIGH" },
        { week: 3, title: "Launch 3 Targeted Video Reels to Validate", factor: "REACH", priority: "MEDIUM" },
        { week: 4, title: "Measure ROAS & Track Retention Metrics", factor: "SALES", priority: "MEDIUM" }
      ]
    };
  }

  // Rule 2: Sales & Funnel Conversion Bottleneck
  if (sls < 50) {
    return {
      priority: "Optimize repeat orders and sales conversion",
      title: "Streamline Checkout & Unit Economics",
      action: "Audit the customer drop-off path from discovery to checkout. Implement 1-click WhatsApp orders and bundle incentives.",
      reason: `Sales consistency and conversion readiness is at ${sls}/100.`,
      citations: [{ factor: "SALES", score: sls, threshold: 50 }],
      recommendedPlan: [
        { week: 1, title: "Audit Abandoned Carts & Friction Points", factor: "SALES", priority: "HIGH" },
        { week: 2, title: "Set Up 1-Click Order Follow-ups on WhatsApp", factor: "SALES", priority: "HIGH" },
        { week: 3, title: "Test 2-Pack Tasting Bundle for Higher AOV", factor: "PRODUCT", priority: "MEDIUM" },
        { week: 4, title: "Review Weekly Unit Economics & Margins", factor: "SALES", priority: "HIGH" }
      ]
    };
  }

  // Rule 3: Reach & Distribution Bottleneck
  if (rch < 50) {
    return {
      priority: "Expand organic discovery and digital distribution",
      title: "Activate Digital Distribution & Creator Partnerships",
      action: "Launch short-form video content and list on regional D2C marketplaces to unlock non-local traffic.",
      reason: `Audience reach is at ${rch}/100, limiting revenue scale despite good product foundation.`,
      citations: [{ factor: "REACH", score: rch, threshold: 50 }],
      recommendedPlan: [
        { week: 1, title: "Identify Top 3 Regional Micro-Influencers", factor: "REACH", priority: "HIGH" },
        { week: 2, title: "Produce 5 Product Benefit Launch Reels", factor: "REACH", priority: "HIGH" },
        { week: 3, title: "List on Namma-Connect Regional Marketplace", factor: "REACH", priority: "MEDIUM" },
        { week: 4, title: "Analyze Organic Inbound Channels & Traffic", factor: "REACH", priority: "MEDIUM" }
      ]
    };
  }

  // Rule 4: Funding & Bookkeeping Readiness
  if (fnd < 50) {
    return {
      priority: "Prepare financial books and statutory documentation",
      title: "Establish GST Invoicing & Scheme Eligibility Pitch",
      action: "Standardize monthly P&L statements and register under Udyam / Stand-Up India for low-interest collateral-free capital.",
      reason: `Financial record-keeping and funding readiness is at ${fnd}/100.`,
      citations: [{ factor: "FUNDING", score: fnd, threshold: 50 }],
      recommendedPlan: [
        { week: 1, title: "Organize 6-Month Invoices & Bank Statements", factor: "FUNDING", priority: "HIGH" },
        { week: 2, title: "Apply for Udyam / MSME Registration Certificate", factor: "FUNDING", priority: "HIGH" },
        { week: 3, title: "Draft 5-Slide Grant Pitch Deck", factor: "FUNDING", priority: "MEDIUM" },
        { week: 4, title: "Submit Stand-Up India / SISFS Application", factor: "FUNDING", priority: "HIGH" }
      ]
    };
  }

  // Default balanced growth rule
  return {
    priority: "Scale consistent multichannel acquisition",
    title: "Accelerate Customer Acquisition & Community Building",
    action: `Expand ${brandName}'s product line and double down on proven high-performing customer acquisition channels.`,
    reason: "Core foundation is developing steadily across all readiness dimensions.",
    citations: [{ factor: "OVERALL", score: Math.round((mkt + brd + sls + prd + rch + fnd) / 6), threshold: 70 }],
    recommendedPlan: [
      { week: 1, title: "Review Top 20% Repeat Customers", factor: "SALES", priority: "HIGH" },
      { week: 2, title: "Launch Retargeting Campaign on Active Channels", factor: "MARKETING", priority: "MEDIUM" },
      { week: 3, title: "Introduce Seasonal Product Flavor / Variant", factor: "PRODUCT", priority: "MEDIUM" },
      { week: 4, title: "Consult Mentor on Supply Chain Expansion", factor: "REACH", priority: "HIGH" }
    ]
  };
}

module.exports = {
  evaluateBottlenecks,
  deriveNextBestAction
};
