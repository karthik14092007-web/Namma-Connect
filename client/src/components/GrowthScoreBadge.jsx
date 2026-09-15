// client/src/components/GrowthScoreBadge.jsx
import React, { useState } from 'react';
import {
  TrendingUp,
  Sparkles,
  Zap,
  HelpCircle,
  Calculator,
  ShieldCheck,
  ChevronRight,
  Info
} from 'lucide-react';
import Badge from './ui/Badge';
import Button from './ui/Button';
import WhyThisScoreModal from './WhyThisScoreModal';
import HowCalculatedModal from './HowCalculatedModal';
import { calculateGrowthDiagnostic, getMaturityColor } from '../scoring/scoringEngine';
import { KAVYA_DEMO_ANSWERS } from '../scoring/demoAnswers';

export default function GrowthScoreBadge({
  score,
  status,
  categoryScores,
  founderAnswers,
  businessStage = 'Early traction'
}) {
  const [selectedFactor, setSelectedFactor] = useState(null);
  const [isHowCalculatedOpen, setIsHowCalculatedOpen] = useState(false);

  // Compute full rule-based diagnostic dynamically
  const answersToUse = founderAnswers || KAVYA_DEMO_ANSWERS;
  const diagnostic = calculateGrowthDiagnostic(answersToUse, businessStage);

  const displayScore = score !== undefined ? score : diagnostic.overallScore;
  const maturityLabel = diagnostic.maturity;

  // SVG circular gauge calculation
  const radius = 62;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  const factorKeys = ['product', 'sales', 'branding', 'marketing', 'reach', 'funding'];

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-soft p-6 sm:p-8 space-y-6">
      {/* Top Meta Bar: Methodology Badge & Explainability Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-white text-[11px] font-extrabold shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>RULE-BASED DIAGNOSTIC • V1</span>
          </div>

          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            Evidence Confidence: {diagnostic.confidence}
          </span>
        </div>

        <button
          onClick={() => setIsHowCalculatedOpen(true)}
          className="text-xs font-extrabold text-brand-700 hover:text-brand-900 bg-brand-50 hover:bg-brand-100 border border-brand-200 px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <Calculator className="w-3.5 h-3.5 text-brand-600" />
          <span>How is this score calculated?</span>
        </button>
      </div>

      {/* Main Diagnostic Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Circular Progress Gauge */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center text-center lg:border-r lg:border-slate-100 lg:pr-8">
          <div className="relative flex items-center justify-center w-52 h-52">
            {/* SVG Circle Gauge */}
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
              {/* Background Track */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="text-slate-100"
                strokeWidth={strokeWidth}
                stroke="currentColor"
                fill="transparent"
              />
              {/* Progress Stroke */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="text-brand-600 transition-all duration-1000 ease-out"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
              />
            </svg>

            {/* Inner Ring Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-4">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                GROWTH DIAGNOSTIC
              </span>
              <div className="flex items-baseline justify-center mt-0.5">
                <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight font-sans">
                  {displayScore}
                </span>
                <span className="text-slate-400 font-bold text-base ml-1">/ 100</span>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-800 bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-200 mt-1">
                <TrendingUp className="w-3 h-3 text-brand-600" />
                {maturityLabel} Stage
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-500 mt-2 max-w-xs leading-relaxed">
            Rule-based assessment of your current growth readiness. Derived from 24 observable business signals.
          </p>
          <span className="text-[10px] text-slate-400 mt-0.5">
            Stage Weighting: {diagnostic.stageProfile?.label}
          </span>
        </div>

        {/* Right Column: 6-Dimension Score Breakdown with "Why this score?" */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-slate-700 block">
                Six Diagnostic Factors
              </span>
              <span className="text-[11px] text-slate-400">
                Click any factor to inspect the 4 underlying signals and mathematical formula.
              </span>
            </div>
            <Badge variant="brand" size="sm" className="hidden sm:inline-flex">
              <Zap className="w-3 h-3" />
              Stage-Weighted
            </Badge>
          </div>

          {/* 6 Category Factor Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {factorKeys.map((key) => {
              const factor = diagnostic.factors[key];
              if (!factor) return null;

              const isBottleneck = factor.score <= 60;
              const color = getMaturityColor(factor.score);

              return (
                <div
                  key={key}
                  className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between ${
                    isBottleneck
                      ? 'bg-amber-50/30 border-amber-200/90 shadow-2xs hover:border-amber-400'
                      : 'bg-slate-50/70 border-slate-200/80 hover:border-slate-300'
                  }`}
                >
                  <div>
                    {/* Header Row */}
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                        {factor.label}
                        <span className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded border ${color.bg} ${color.text} ${color.border}`}>
                          {factor.maturity}
                        </span>
                      </span>

                      <span className="font-black text-slate-900 font-mono text-sm">
                        {factor.score}{' '}
                        <span className="text-slate-400 font-normal text-[10px]">/ 100</span>
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-200/80 rounded-full h-2 overflow-hidden my-1.5">
                      <div
                        className={`h-2 rounded-full transition-all duration-700 ${
                          factor.score < 60
                            ? 'bg-amber-500'
                            : factor.score < 80
                            ? 'bg-teal-500'
                            : 'bg-emerald-500'
                        }`}
                        style={{ width: `${factor.score}%` }}
                      />
                    </div>

                    <span className="text-[10px] text-slate-400 block mb-2">
                      Based on 4 diagnostic signals • Weight: {factor.weightPercent}%
                    </span>
                  </div>

                  {/* "Why this score?" Clickable Drawer Trigger */}
                  <button
                    type="button"
                    onClick={() => setSelectedFactor(factor)}
                    className="self-start text-[11px] font-extrabold text-brand-700 hover:text-brand-900 hover:underline flex items-center gap-1 cursor-pointer pt-1 border-t border-slate-200/40 w-full"
                  >
                    <span>Why this score?</span>
                    <ChevronRight className="w-3 h-3 text-brand-500" />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 gap-2">
            <span className="flex items-center gap-1.5 text-[11px]">
              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
              Primary bottlenecks ({diagnostic.factors.marketing?.score}/100 and {diagnostic.factors.branding?.score}/100) are targeted in Week 1–2
            </span>
          </div>
        </div>
      </div>

      {/* Modals */}
      <WhyThisScoreModal
        factorData={selectedFactor}
        isOpen={!!selectedFactor}
        onClose={() => setSelectedFactor(null)}
      />

      <HowCalculatedModal
        diagnosticData={diagnostic}
        isOpen={isHowCalculatedOpen}
        onClose={() => setIsHowCalculatedOpen(false)}
      />
    </div>
  );
}
