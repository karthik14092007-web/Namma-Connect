// client/src/scoring/scoringEngine.js
// Centralized, transparent rule-based scoring engine for Namma-Connect
// No ML, no arbitrary scores, 100% arithmetic explainability.

import { DIAGNOSTIC_QUESTIONS, DIAGNOSTIC_FACTORS } from './diagnosticQuestions';
import { getStageWeights } from './stageWeights';

export function getMaturityLabel(score) {
  if (score === null || score === undefined) return 'Not Evaluated';
  if (score < 20) return 'Not Started';
  if (score < 40) return 'Awareness';
  if (score < 60) return 'Early Stage';
  if (score < 80) return 'Developing';
  if (score < 95) return 'Established';
  return 'Strong';
}

export function getMaturityColor(score) {
  if (score < 40) return { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' };
  if (score < 60) return { bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200' };
  if (score < 80) return { bg: 'bg-teal-50', text: 'text-teal-800', border: 'border-teal-200' };
  return { bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-200' };
}

/**
 * Calculates the complete Growth Diagnostic from structured founder answers.
 * @param {Object} answersMap - Dictionary of questionId -> selected numeric score (0, 20, 40, 60, 80, 100)
 * @param {string} stage - Business stage (e.g. 'Early traction')
 */
export function calculateGrowthDiagnostic(answersMap = {}, stage = 'Early traction') {
  const stageProfile = getStageWeights(stage);
  const factorResults = {};
  let totalAnsweredCount = 0;
  let weightedScoreSum = 0;

  DIAGNOSTIC_FACTORS.forEach((factor) => {
    const factorId = factor.id;
    const questions = DIAGNOSTIC_QUESTIONS[factorId] || [];
    const questionScores = [];
    const evidenceList = [];

    questions.forEach((q) => {
      const chosenScore = answersMap[q.id];
      if (chosenScore !== undefined && chosenScore !== null) {
        totalAnsweredCount += 1;
        const scoreVal = Number(chosenScore);
        questionScores.push(scoreVal);
        const matchingOpt = q.options.find((o) => o.score === scoreVal) || q.options[0];
        evidenceList.push({
          questionId: q.id,
          title: q.title,
          prompt: q.prompt,
          answerLabel: matchingOpt.label,
          answerDesc: matchingOpt.desc,
          score: scoreVal
        });
      } else {
        // Unanswered fallback
        evidenceList.push({
          questionId: q.id,
          title: q.title,
          prompt: q.prompt,
          answerLabel: 'Unanswered',
          answerDesc: 'Not yet answered by founder',
          score: 0
        });
        questionScores.push(0);
      }
    });

    // Factor Score = Average of the 4 diagnostic questions
    const sum = questionScores.reduce((acc, curr) => acc + curr, 0);
    const rawAverage = questionScores.length > 0 ? sum / questionScores.length : 0;
    const factorScore = Math.round(rawAverage);

    const weight = stageProfile.weights[factorId] || (1 / 6);
    const contribution = Number((factorScore * weight).toFixed(2));
    weightedScoreSum += factorScore * weight;

    factorResults[factorId] = {
      id: factorId,
      label: factor.label,
      description: factor.description,
      score: factorScore,
      maturity: getMaturityLabel(factorScore),
      weight: weight,
      weightPercent: Math.round(weight * 100),
      contribution: contribution,
      questionScores: questionScores,
      formula: `(${questionScores.join(' + ')}) ÷ 4 = ${factorScore} / 100`,
      evidence: evidenceList
    };
  });

  // Final Overall Score: Rounded weighted sum
  const finalOverallScore = Math.round(weightedScoreSum);

  // Confidence assessment
  let confidence = 'High';
  if (totalAnsweredCount < 12) confidence = 'Insufficient Evidence';
  else if (totalAnsweredCount < 24) confidence = 'Medium';

  return {
    overallScore: finalOverallScore,
    maturity: getMaturityLabel(finalOverallScore),
    confidence: confidence,
    totalAnswered: totalAnsweredCount,
    totalQuestions: 24,
    stageProfile: stageProfile,
    factors: factorResults
  };
}
