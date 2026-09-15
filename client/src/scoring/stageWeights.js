// client/src/scoring/stageWeights.js
// Stage-based weightings for the Growth Diagnostic
// Startup stage determines which factors receive higher weight and what progress means.

export const STAGE_WEIGHTS = {
  'Idea / Pre-revenue': {
    label: 'Idea / Pre-revenue',
    description: 'Prioritizes Product validation, Brand differentiation, and Initial Reach before scaling sales.',
    weights: {
      product: 0.30,
      branding: 0.20,
      reach: 0.20,
      marketing: 0.15,
      sales: 0.10,
      funding: 0.05
    }
  },
  'Early traction': {
    label: 'Early Traction',
    description: 'Balances Product quality with go-to-market execution across Sales, Marketing, and Brand positioning.',
    weights: {
      product: 0.20,
      sales: 0.20,
      marketing: 0.20,
      branding: 0.15,
      reach: 0.15,
      funding: 0.10
    }
  },
  'Growing': {
    label: 'Growing',
    description: 'Focuses heavily on Sales velocity, repeatable Marketing channels, and wider distribution Reach.',
    weights: {
      sales: 0.25,
      marketing: 0.25,
      reach: 0.20,
      product: 0.15,
      branding: 0.10,
      funding: 0.05
    }
  },
  'Established': {
    label: 'Established / Scaling',
    description: 'Prioritizes multi-channel Sales, capital Funding readiness, and high-volume distribution Reach.',
    weights: {
      sales: 0.25,
      reach: 0.20,
      funding: 0.20,
      marketing: 0.15,
      product: 0.10,
      branding: 0.10
    }
  }
};

export function getStageWeights(stage) {
  if (!stage) return STAGE_WEIGHTS['Early traction'];
  const normalized = stage.toLowerCase();
  if (normalized.includes('idea') || normalized.includes('pre-revenue') || normalized.includes('concept')) {
    return STAGE_WEIGHTS['Idea / Pre-revenue'];
  }
  if (normalized.includes('growing') || normalized.includes('expansion')) {
    return STAGE_WEIGHTS['Growing'];
  }
  if (normalized.includes('established') || normalized.includes('scaling') || normalized.includes('scale')) {
    return STAGE_WEIGHTS['Established'];
  }
  return STAGE_WEIGHTS['Early traction'];
}
