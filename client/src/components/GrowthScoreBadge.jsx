import React from 'react';
import { TrendingUp, ShieldCheck, Zap, AlertCircle } from 'lucide-react';

export default function GrowthScoreBadge({
  score = 68,
  status = "Growth Potential: High",
  categoryScores = {
    product: 82,
    sales: 63,
    branding: 57,
    marketing: 44,
    customerReach: 65,
    fundingReadiness: 70
  },
  onFixGap
}) {
  // SVG circular gauge calculation
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const categories = [
    { key: 'marketing', label: 'Marketing', score: categoryScores?.marketing ?? 44, color: 'text-amber-600', bar: 'bg-amber-500' },
    { key: 'branding', label: 'Branding', score: categoryScores?.branding ?? 57, color: 'text-rose-600', bar: 'bg-rose-500' },
    { key: 'sales', label: 'Sales Growth', score: categoryScores?.sales ?? 63, color: 'text-orange-600', bar: 'bg-orange-500' },
    { key: 'customerReach', label: 'Customer Reach', score: categoryScores?.customerReach ?? 65, color: 'text-blue-600', bar: 'bg-blue-500' },
    { key: 'fundingReadiness', label: 'Funding Readiness', score: categoryScores?.fundingReadiness ?? 70, color: 'text-emerald-600', bar: 'bg-emerald-500' },
    { key: 'product', label: 'Product & Packaging', score: categoryScores?.product ?? 82, color: 'text-teal-600', bar: 'bg-teal-500' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft p-6 sm:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Big Circular Gauge */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center text-center sm:border-r sm:border-slate-100 sm:pr-6">
          <div className="relative flex items-center justify-center">
            {/* SVG Circle Gauge */}
            <svg className="w-44 h-44 -rotate-90 transform" viewBox="0 0 160 160">
              {/* Background Circle */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="text-slate-100"
                strokeWidth="14"
                stroke="currentColor"
                fill="transparent"
              />
              {/* Progress Circle */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="text-brand-600 transition-all duration-1000 ease-out"
                strokeWidth="14"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
              />
            </svg>

            {/* Inner Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Growth Score
              </span>
              <div className="flex items-baseline justify-center">
                <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-sans">
                  {score}
                </span>
                <span className="text-slate-400 font-semibold text-lg ml-0.5">/100</span>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 mt-1">
                <TrendingUp className="w-3 h-3" />
                High Potential
              </span>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-base font-bold text-slate-800">
              Brand Health Diagnosis
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-xs">
              Based on your monthly revenue, sales trajectory, market positioning, and stage capital readiness.
            </p>
          </div>
        </div>

        {/* Right Column: 6 Category Breakdowns */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              6-Dimension Growth Diagnostics
            </span>
            <span className="text-xs text-brand-700 font-semibold flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" /> Stage-Weighted
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {categories.map((cat) => {
              const isLow = cat.score < 60;
              return (
                <div
                  key={cat.key}
                  className={`p-3 rounded-xl border transition-all ${
                    isLow
                      ? 'bg-amber-50/40 border-amber-200/80 shadow-xs'
                      : 'bg-slate-50 border-slate-200/70'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-semibold text-slate-700 flex items-center gap-1">
                      {cat.label}
                      {isLow && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded font-bold bg-amber-100 text-amber-800 border border-amber-300">
                          Gap
                        </span>
                      )}
                    </span>
                    <span className="font-bold text-slate-900 font-sans">
                      {cat.score}<span className="text-slate-400 font-normal">/100</span>
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-200/80 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all duration-700 ${cat.bar}`}
                      style={{ width: `${cat.score}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
              Dimensions under 65 require immediate 30-day intervention
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
