// client/src/components/HowCalculatedModal.jsx
import React from 'react';
import { X, Calculator, ShieldCheck, CheckCircle2, HelpCircle, Layers, TrendingUp, Info } from 'lucide-react';
import Button from './ui/Button';
import Badge from './ui/Badge';

export default function HowCalculatedModal({ diagnosticData, isOpen, onClose }) {
  if (!isOpen || !diagnosticData) return null;

  const { overallScore, stageProfile, factors, maturity } = diagnosticData;

  const maturityTiers = [
    { range: '0–19', label: 'Not Started', desc: 'No structured business processes in place' },
    { range: '20–39', label: 'Awareness', desc: 'Identified needs, but ad-hoc execution' },
    { range: '40–59', label: 'Early Stage', desc: 'Initial implementations showing early validation' },
    { range: '60–79', label: 'Developing', desc: 'Consistent operational processes taking hold' },
    { range: '80–94', label: 'Established', desc: 'High-performing, repeatable business systems' },
    { range: '95–100', label: 'Strong', desc: 'Industry-benchmark category leadership' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden relative">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-black tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                Methodology & Mathematics
              </span>
              <span className="text-xs text-slate-400">• Rule-Based V1</span>
            </div>
            <h2 className="text-lg font-extrabold text-slate-900 tracking-tight mt-0.5">
              How is Your Growth Diagnostic Calculated?
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Important Philosophy Callout */}
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-950 space-y-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
              <h3 className="text-xs font-black uppercase tracking-wider text-emerald-900">
                Rule-Based Diagnostic, Not an ML Prediction
              </h3>
            </div>
            <p className="text-xs text-emerald-800 leading-relaxed">
              We intentionally avoid black-box Machine Learning claims. Early-stage D2C startups need transparent, observable feedback. Every score is mathematically derived from your 24 assessment answers across a 6-level evidence ladder (0 / 20 / 40 / 60 / 80 / 100).
            </p>
          </div>

          {/* 4-Step Mathematical Architecture */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-500">
              The 4-Step Calculation Pipeline
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="font-extrabold text-slate-900 block mb-1">
                  1. Six Business Factors
                </span>
                <p className="text-slate-500 text-[11px] leading-snug">
                  Evaluates Product, Sales, Branding, Marketing, Reach, and Funding readiness.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="font-extrabold text-slate-900 block mb-1">
                  2. 4 Observable Signals / Factor
                </span>
                <p className="text-slate-500 text-[11px] leading-snug">
                  Each answer maps to 0, 20, 40, 60, 80, or 100 points based on real business evidence.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="font-extrabold text-slate-900 block mb-1">
                  3. Arithmetic Factor Average
                </span>
                <p className="text-slate-500 text-[11px] leading-snug">
                  Factor Score = (Q1 + Q2 + Q3 + Q4) ÷ 4. No arbitrary curve adjustments.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="font-extrabold text-slate-900 block mb-1">
                  4. Stage-Weighted Overall Score
                </span>
                <p className="text-slate-500 text-[11px] leading-snug">
                  Stage ({stageProfile?.label}) assigns strategic weights to determine the final composite score.
                </p>
              </div>
            </div>
          </div>

          {/* Live Mathematical Proof Table for Active Founder */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-500">
                Live Factor Weighting Breakdown ({stageProfile?.label})
              </h4>
              <span className="text-xs font-mono font-bold text-slate-500">
                Total = {overallScore} / 100
              </span>
            </div>

            <div className="bg-slate-900 text-white rounded-2xl p-4 overflow-x-auto shadow-md">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase">
                    <th className="pb-2 font-bold">Factor</th>
                    <th className="pb-2 font-bold">Raw Score</th>
                    <th className="pb-2 font-bold">Stage Weight</th>
                    <th className="pb-2 font-bold text-right">Contribution</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {Object.values(factors || {}).map((f) => (
                    <tr key={f.id} className="text-slate-200">
                      <td className="py-2 font-sans font-bold flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                        {f.label}
                      </td>
                      <td className="py-2">{f.score} / 100</td>
                      <td className="py-2 text-slate-400">× {f.weightPercent}%</td>
                      <td className="py-2 text-right font-black text-emerald-400">
                        +{f.contribution}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-slate-700 text-sm font-black text-white">
                    <td colSpan={3} className="pt-2.5 font-sans font-black">
                      Overall Growth Diagnostic Score:
                    </td>
                    <td className="pt-2.5 text-right font-mono text-emerald-300">
                      {overallScore} / 100
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Maturity Tiers Reference */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-500">
              Maturity Tiers Rubric
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              {maturityTiers.map((tier) => (
                <div
                  key={tier.range}
                  className={`p-2.5 rounded-xl border ${
                    maturity === tier.label
                      ? 'bg-brand-50/80 border-brand-300 shadow-2xs'
                      : 'bg-slate-50 border-slate-200/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-slate-900">{tier.label}</span>
                    <span className="font-mono text-[10px] text-slate-500 font-bold">
                      {tier.range}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 block mt-0.5 leading-tight">
                    {tier.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50 shrink-0">
          <span className="text-xs text-slate-500">
            100% transparent arithmetic scoring.
          </span>
          <Button variant="primary" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
