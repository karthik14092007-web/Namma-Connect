// server/src/services/diagnostic/stageWeights.js
// Stage-specific heuristic weights for Namma-Connect Diagnostic Engine (Version v1)

const SCORING_VERSION = "v1";

const STAGE_WEIGHTS = {
  IDEA: {
    PRODUCT: 0.30,
    BRANDING: 0.20,
    REACH: 0.20,
    MARKETING: 0.10,
    SALES: 0.10,
    FUNDING: 0.10
  },
  PRE_REVENUE: {
    PRODUCT: 0.30,
    BRANDING: 0.20,
    REACH: 0.20,
    MARKETING: 0.10,
    SALES: 0.10,
    FUNDING: 0.10
  },
  EARLY_TRACTION: {
    PRODUCT: 0.20,
    SALES: 0.20,
    MARKETING: 0.20,
    BRANDING: 0.15,
    REACH: 0.15,
    FUNDING: 0.10
  },
  GROWING: {
    PRODUCT: 0.15,
    SALES: 0.25,
    MARKETING: 0.20,
    BRANDING: 0.10,
    REACH: 0.20,
    FUNDING: 0.10
  },
  ESTABLISHED: {
    PRODUCT: 0.10,
    SALES: 0.25,
    MARKETING: 0.20,
    BRANDING: 0.10,
    REACH: 0.20,
    FUNDING: 0.15
  }
};

/**
 * Normalizes stage string to valid enum key
 */
function normalizeStage(stageStr) {
  if (!stageStr) return 'EARLY_TRACTION';
  const clean = stageStr.toString().trim().toUpperCase().replace(/[-\s]/g, '_');
  if (STAGE_WEIGHTS[clean]) return clean;
  if (clean.includes('IDEA')) return 'IDEA';
  if (clean.includes('PRE')) return 'PRE_REVENUE';
  if (clean.includes('EARLY') || clean.includes('TRACTION')) return 'EARLY_TRACTION';
  if (clean.includes('GROW')) return 'GROWING';
  if (clean.includes('ESTABLISH')) return 'ESTABLISHED';
  return 'EARLY_TRACTION';
}

function getWeightsForStage(stageStr) {
  const stage = normalizeStage(stageStr);
  return STAGE_WEIGHTS[stage] || STAGE_WEIGHTS.EARLY_TRACTION;
}

module.exports = {
  SCORING_VERSION,
  STAGE_WEIGHTS,
  normalizeStage,
  getWeightsForStage
};
