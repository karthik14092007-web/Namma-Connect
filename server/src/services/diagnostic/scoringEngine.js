// server/src/services/diagnostic/scoringEngine.js
// Authoritative calculation engine for Namma-Connect Growth Diagnostic

const { DIAGNOSTIC_QUESTIONS, resolveScoreFromAnswer } = require("./diagnosticQuestions");
const { getWeightsForStage, normalizeStage, SCORING_VERSION } = require("./stageWeights");
const { evaluateBottlenecks, deriveNextBestAction } = require("./recommendationEngine");

/**
 * Maturity tier mapping:
 * 0–19: NOT_STARTED
 * 20–39: AWARENESS
 * 40–59: EARLY_STAGE
 * 60–79: DEVELOPING
 * 80–94: ESTABLISHED
 * 95–100: STRONG
 */
function getMaturityLevel(score) {
  if (score >= 95) return { tier: "STRONG", label: "Strong & Optimized", color: "emerald" };
  if (score >= 80) return { tier: "ESTABLISHED", label: "Established & Predictable", color: "emerald" };
  if (score >= 60) return { tier: "DEVELOPING", label: "Developing Stage", color: "brand" };
  if (score >= 40) return { tier: "EARLY_STAGE", label: "Early Stage", color: "amber" };
  if (score >= 20) return { tier: "AWARENESS", label: "Awareness Stage", color: "amber" };
  return { tier: "NOT_STARTED", label: "Not Started", color: "rose" };
}

/**
 * Computes authoritative diagnostic assessment
 * NEVER trusts frontend scores. Calculates mathematically from response answers.
 *
 * @param {Array} rawResponses - array of { factor, questionKey, answerKey, [score] }
 * @param {string} stage - startup stage (e.g. 'EARLY_TRACTION')
 * @param {string} brandName - optional brand name for tailoring advice
 */
function calculateDiagnostic({ responses = [], stage = 'EARLY_TRACTION', brandName = 'Your Brand' }) {
  const normalizedStage = normalizeStage(stage);
  const weights = getWeightsForStage(normalizedStage);

  // Map incoming responses by key or question ID
  const responseMap = {};
  responses.forEach(r => {
    const key = r.questionKey || r.id;
    responseMap[key] = r;
  });

  const factorResults = {};
  const processedResponses = [];
  let totalAnsweredCount = 0;
  const factors = ['PRODUCT', 'SALES', 'BRANDING', 'MARKETING', 'REACH', 'FUNDING'];

  factors.forEach(factor => {
    const factorLower = factor.toLowerCase();
    const questions = DIAGNOSTIC_QUESTIONS[factorLower] || [];
    let sumScore = 0;
    let factorAnswered = 0;

    questions.forEach(q => {
      const userResp = responseMap[q.key] || responseMap[q.id];
      let scoreVal = 0;

      if (userResp) {
        factorAnswered++;
        totalAnsweredCount++;
        scoreVal = resolveScoreFromAnswer(q, userResp.answerKey !== undefined ? userResp.answerKey : userResp.score);
        processedResponses.push({
          factor,
          questionKey: q.key,
          answerKey: userResp.answerKey !== undefined ? String(userResp.answerKey) : `opt_${scoreVal}`,
          score: scoreVal
        });
      } else {
        processedResponses.push({
          factor,
          questionKey: q.key,
          answerKey: 'opt_0',
          score: 0
        });
      }
      sumScore += scoreVal;
    });

    const factorScore = questions.length > 0 ? Math.round(sumScore / questions.length) : 0;
    const factorWeight = weights[factor] || 0;
    const contribution = Number((factorScore * factorWeight).toFixed(2));

    factorResults[factor] = {
      score: factorScore,
      weight: factorWeight,
      contribution,
      status: getMaturityLevel(factorScore).label,
      questionsCount: questions.length,
      answeredCount: factorAnswered
    };
  });

  // Calculate overall weighted score
  const overallScoreFloat = Object.values(factorResults).reduce((acc, curr) => acc + curr.contribution, 0);
  const overallScore = Math.min(100, Math.max(0, Math.round(overallScoreFloat)));

  // Confidence assessment
  const isFullyAnswered = totalAnsweredCount >= 24;
  const confidence = isFullyAnswered ? "MEDIUM" : (totalAnsweredCount >= 12 ? "MEDIUM" : "LOW");
  const confidenceReason = isFullyAnswered
    ? "Based on founder-provided diagnostic responses across all 24 observable readiness signals."
    : "Based on partial diagnostic responses. Complete all questions for enhanced confidence.";

  // Maturity
  const maturity = getMaturityLevel(overallScore);

  // Bottleneck detection & Next Best Action
  const factorScoresMap = {};
  Object.keys(factorResults).forEach(f => {
    factorScoresMap[f] = factorResults[f].score;
  });

  const { ranked, topGaps } = evaluateBottlenecks(factorScoresMap);
  const nextBestAction = deriveNextBestAction(factorScoresMap, topGaps, brandName);

  return {
    scoringVersion: SCORING_VERSION,
    stage: normalizedStage,
    overallScore,
    status: overallScore >= 60 ? "Ready for Focused Growth" : "Critical Bottlenecks Detected",
    maturity: maturity.tier,
    maturityLabel: maturity.label,
    confidence,
    confidenceReason,
    factorScores: factorResults,
    bottlenecks: ranked,
    topGaps,
    nextBestAction,
    processedResponses
  };
}

module.exports = {
  calculateDiagnostic,
  getMaturityLevel
};
