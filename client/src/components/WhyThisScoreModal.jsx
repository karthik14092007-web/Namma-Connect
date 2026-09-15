// client/src/components/WhyThisScoreModal.jsx
import React from 'react';
import { X, CheckCircle2, AlertTriangle, HelpCircle, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import Button from './ui/Button';
import Badge from './ui/Badge';
import { getMaturityColor } from '../scoring/scoringEngine';

export default function WhyThisScoreModal({ factorData, isOpen, onClose }) {
  if (!isOpen || !factorData) return null;

  const color = getMaturityColor(factorData.score);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden relative">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-black tracking-wider text-slate-500">
                Factor Evidence Breakdown
              </span>
              <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${color.bg} ${color.text} ${color.border}`}>
                {factorData.maturity}
              </span>
            </div>
            <h2 className="text-lg font-extrabold text-slate-900 tracking-tight mt-0.5 flex items-center gap-2">
              <span>{factorData.label}</span>
              <span className="text-base text-slate-400 font-normal">—</span>
              <span className="text-xl font-black text-slate-900">{factorData.score} <span className="text-xs text-slate-400 font-bold">/ 100</span></span>
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Transparent Calculation Banner */}
          <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-1.5 shadow-sm">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                Transparent Arithmetic Formula
              </span>
              <span className="text-emerald-400 font-mono font-bold text-[11px]">
                Stage Weight: {factorData.weightPercent}%
              </span>
            </div>
            <div className="font-mono text-sm sm:text-base font-black text-emerald-300">
              {factorData.formula}
            </div>
            <p className="text-[11px] text-slate-300 leading-snug">
              Every point is calculated directly from your four assessment responses below. No arbitrary grading, no black-box ML.
            </p>
          </div>

          {/* 4 Underlying Diagnostic Questions and Selected Options */}
          <div className="space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500 block">
              Observable Diagnostic Signals (4 Questions)
            </span>

            {factorData.evidence?.map((item, idx) => {
              const isHigh = item.score >= 80;
              const isMed = item.score >= 60;
              const isLow = item.score < 60;

              return (
                <div
                  key={item.questionId || idx}
                  className="p-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/60 space-y-1.5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-0.5 min-w-0">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                        Signal 0{idx + 1} • {item.title}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 leading-snug">
                        {item.prompt}
                      </h4>
                    </div>

                    <span
                      className={`text-xs font-mono font-black px-2.5 py-1 rounded-xl border shrink-0 ${
                        isHigh
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : isMed
                          ? 'bg-teal-50 text-teal-800 border-teal-300'
                          : 'bg-amber-50 text-amber-900 border-amber-300'
                      }`}
                    >
                      +{item.score} pts
                    </span>
                  </div>

                  {/* Chosen Answer */}
                  <div className="p-2 bg-white rounded-xl border border-slate-200/60 text-xs">
                    <span className="font-bold text-slate-900 block leading-tight">
                      ✓ {item.answerLabel}
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-0.5 leading-tight">
                      {item.answerDesc}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50 shrink-0">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Fully explainable rule scoring</span>
          </div>
          <Button variant="primary" size="sm" onClick={onClose}>
            Got it
          </Button>
        </div>
      </div>
    </div>
  );
}
