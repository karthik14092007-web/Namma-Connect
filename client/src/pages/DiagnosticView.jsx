// client/src/pages/DiagnosticView.jsx
import React, { useState } from 'react';
import {
  Target,
  ShieldCheck,
  Zap,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Package,
  Megaphone,
  Share2,
  Coins
} from 'lucide-react';
import { useFounder } from '../context/FounderContext';
import { useToast } from '../context/ToastContext';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { DIAGNOSTIC_FACTORS, DIAGNOSTIC_QUESTIONS } from '../scoring/diagnosticQuestions';
import { calculateGrowthDiagnostic, getMaturityColor, getMaturityLabel } from '../scoring/scoringEngine';
import { detectBottlenecksAndActions } from '../scoring/recommendationEngine';

export default function DiagnosticView({ setCurrentView }) {
  const { activeFounder, updateDiagnosticAnswer, loadDemoKavya } = useFounder();
  const { addToast } = useToast();
  const [activeFactorId, setActiveFactorId] = useState('marketing');

  const answers = activeFounder?.diagnosticAnswers || {};
  const stage = activeFounder?.businessStage || 'Early traction';
  const diagnostic = calculateGrowthDiagnostic(answers, stage);
  const bottlenecks = detectBottlenecksAndActions(diagnostic.factors);

  const activeFactor = diagnostic.factors[activeFactorId] || diagnostic.factors.marketing;
  const questions = DIAGNOSTIC_QUESTIONS[activeFactorId] || [];

  const handleSelectOption = (questionId, score) => {
    updateDiagnosticAnswer(questionId, score);
    addToast(`⚡ Answer updated (+${score} pts). Recalculated factor & overall scores!`);
  };

  const getFactorIcon = (id) => {
    switch (id) {
      case 'product': return <Package className="w-4 h-4" />;
      case 'sales': return <TrendingUp className="w-4 h-4" />;
      case 'branding': return <Sparkles className="w-4 h-4" />;
      case 'marketing': return <Megaphone className="w-4 h-4" />;
      case 'reach': return <Share2 className="w-4 h-4" />;
      case 'funding': return <Coins className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
      {/* ---------------- Header ---------------- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <Badge variant="brand" size="md" className="mb-1.5">
            Deterministic Diagnostic Engine • 24 Observable Signals
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Growth Readiness Diagnostic
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Every score is derived from your 24 observable business signals. Select an option below to test real-time score updates (50 → 100 → 50 test).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={loadDemoKavya}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 font-bold text-xs transition-all shadow-2xs cursor-pointer"
            title="Reset to benchmark demo persona (Marketing: 52, Overall: 65)"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
            <span>⚡ Reset Benchmark (52 / 65)</span>
          </button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setCurrentView('roadmap')}
            icon={ArrowRight}
            iconPosition="right"
          >
            View Growth Plan
          </Button>
        </div>
      </div>

      {/* ---------------- Top Summary Score Strip ---------------- */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {DIAGNOSTIC_FACTORS.map((f) => {
          const factor = diagnostic.factors[f.id];
          const isSelected = activeFactorId === f.id;
          const isBottleneck = factor?.score <= 60;
          const color = getMaturityColor(factor?.score || 0);

          return (
            <button
              key={f.id}
              type="button"
              onClick={() => setActiveFactorId(f.id)}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-102 ring-2 ring-brand-500/50'
                  : isBottleneck
                  ? 'bg-amber-50/50 hover:bg-amber-50 border-amber-200 text-slate-900'
                  : 'bg-white hover:bg-slate-50 border-slate-200/80 text-slate-900'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className={`p-1.5 rounded-lg ${isSelected ? 'bg-slate-800 text-brand-300' : 'bg-slate-100 text-slate-700'}`}>
                  {getFactorIcon(f.id)}
                </span>
                <span className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded ${
                  isSelected
                    ? 'bg-slate-800 text-slate-300'
                    : `${color.bg} ${color.text}`
                }`}>
                  {f.id === bottlenecks.primaryBottleneck?.id ? 'Bottleneck' : factor?.maturity}
                </span>
              </div>

              <div className="mt-3">
                <span className={`text-xs font-bold block ${isSelected ? 'text-slate-200' : 'text-slate-700'}`}>
                  {f.label}
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className={`text-2xl font-black font-sans ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                    {factor?.score ?? 0}
                  </span>
                  <span className={`text-[10px] ${isSelected ? 'text-slate-400' : 'text-slate-400'}`}>/ 100</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* ---------------- Active Factor Workspace & 4 Signals ---------------- */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-soft p-6 sm:p-8 space-y-6">
        {/* Factor Header & Formula */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-extrabold tracking-wider text-brand-600">
                Factor 0{DIAGNOSTIC_FACTORS.findIndex(f => f.id === activeFactorId) + 1}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs font-semibold text-slate-500">Stage Weight: {activeFactor.weightPercent}%</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-0.5 flex items-center gap-3">
              <span>{activeFactor.label} Diagnostic</span>
              <span className="text-sm font-bold text-slate-400">—</span>
              <span className="text-2xl font-black text-slate-900 font-sans">{activeFactor.score} / 100</span>
            </h2>
          </div>

          <div className="bg-slate-900 text-white px-4 py-2.5 rounded-2xl text-xs flex items-center gap-3 shadow-xs">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-bold">
                Transparent Arithmetic Formula:
              </span>
              <span className="font-mono text-sm font-black text-emerald-300">
                {activeFactor.formula}
              </span>
            </div>
          </div>
        </div>

        {/* 4 Diagnostic Questions */}
        <div className="space-y-6">
          {questions.map((q, qIndex) => {
            const currentSelectedScore = answers[q.id];
            return (
              <div
                key={q.id}
                className="p-4 sm:p-5 rounded-2xl border border-slate-200/80 bg-slate-50/50 space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase font-black tracking-wider text-slate-400 block">
                      Signal 0{qIndex + 1} • {q.title}
                    </span>
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                      {q.prompt}
                    </h3>
                  </div>
                  <span className="text-xs font-mono font-black px-2.5 py-1 rounded-xl bg-white border border-slate-200 text-slate-800 shrink-0 shadow-2xs">
                    Current: +{currentSelectedScore ?? 0} pts
                  </span>
                </div>

                {/* Option Ladder (Radio Buttons) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 pt-1">
                  {q.options.map((opt) => {
                    const isSelected = currentSelectedScore === opt.score;
                    return (
                      <button
                        key={opt.score}
                        type="button"
                        onClick={() => handleSelectOption(q.id, opt.score)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-emerald-50 border-emerald-500 shadow-xs ring-1 ring-emerald-500/50'
                            : 'bg-white hover:bg-slate-100 border-slate-200/80 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                            isSelected ? 'bg-emerald-200/70 text-emerald-900' : 'bg-slate-100 text-slate-600'
                          }`}>
                            +{opt.score} pts
                          </span>
                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          )}
                        </div>
                        <span className="text-xs font-bold text-slate-900 block leading-snug">
                          {opt.label}
                        </span>
                        <span className="text-[11px] text-slate-500 mt-1 block leading-tight">
                          {opt.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA to Growth Plan */}
        <div className="p-4 bg-linear-to-r from-teal-50 to-emerald-50 rounded-2xl border border-teal-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">
                Primary Bottleneck: {bottlenecks.primaryBottleneck?.label} ({bottlenecks.primaryBottleneck?.score}/100)
              </h4>
              <p className="text-xs text-slate-600">
                Your 30-Day Growth Plan dynamically adapts milestones based on these diagnostic responses.
              </p>
            </div>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setCurrentView('roadmap')}
            className="shrink-0 text-xs font-bold self-start sm:self-auto"
          >
            Review 30-Day Growth Plan →
          </Button>
        </div>
      </div>
    </div>
  );
}
