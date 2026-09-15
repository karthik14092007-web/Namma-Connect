import React from 'react';
import { X, CheckCircle2, Sparkles, HelpCircle, ShieldCheck, ArrowRight } from 'lucide-react';

export default function ExplainableMatchModal({ isOpen, onClose, entity, type = "mentor", onPrimaryAction }) {
  if (!isOpen || !entity) return null;

  const matchPercentage = entity.matchPercentage || 94;
  const breakdown = entity.matchBreakdown || entity.breakdown || {};
  const reasons = entity.matchReasons || entity.reasons || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden transform transition-all">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-900 to-emerald-900 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-emerald-300">
                Explainable Recommendation Engine
              </span>
              <h3 className="text-lg font-bold text-white">
                {type === "mentor" ? `Why ${entity.name} is a Match` : `Why ${entity.provider || entity.title} Fits Your Stage`}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Top Score Banner */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-brand-50/70 border border-brand-200/80">
            <div>
              <span className="text-xs font-semibold text-brand-800 uppercase tracking-wider block">
                Overall Compatibility
              </span>
              <p className="text-xs text-slate-600 mt-0.5">
                Calculated against your stage, challenges, and regional focus
              </p>
            </div>
            <div className="text-right">
              <div className="inline-flex items-baseline gap-1">
                <span className="text-3xl font-black text-brand-700 font-sans">
                  {matchPercentage}%
                </span>
              </div>
              <span className="block text-[11px] font-semibold text-emerald-700">
                Exceptional Fit
              </span>
            </div>
          </div>

          {/* Detailed Score Breakdown */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <span>Match Breakdown</span>
              <span className="text-[11px] font-normal text-slate-400">(Weighted Algorithm)</span>
            </h4>

            <div className="space-y-3 bg-slate-50 rounded-xl p-4 border border-slate-200/80">
              {Object.entries(breakdown).map(([key, item]) => {
                if (typeof item !== 'object' || item === null) return null;
                const score = item.score ?? 0;
                const max = item.max ?? 100;
                const label = item.label || key.charAt(0).toUpperCase() + key.slice(1);
                const pct = Math.round((score / max) * 100);

                return (
                  <div key={key} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium text-slate-700">
                      <span>{label}</span>
                      <span className="font-bold text-slate-900">
                        {score} / {max} <span className="text-slate-400 font-normal">({pct}%)</span>
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-brand-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}

              <div className="pt-2 border-t border-slate-200 flex justify-between text-xs font-bold text-slate-800">
                <span>Total Score</span>
                <span className="text-brand-700 text-sm">{matchPercentage}% Match</span>
              </div>
            </div>
          </div>

          {/* Why We Recommended This (Explainable reasoning) */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              Why We Recommended This
            </h4>
            <ul className="space-y-2.5">
              {reasons.map((reason, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              if (onPrimaryAction) onPrimaryAction();
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-xs font-semibold shadow-xs hover:shadow transition-all cursor-pointer"
          >
            <span>{type === "mentor" ? "Book Consultation" : "Check Eligibility"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
