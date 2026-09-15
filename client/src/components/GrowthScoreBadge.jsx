import React from 'react';
import { TrendingUp, Sparkles, Zap, AlertCircle } from 'lucide-react';
import Badge from './ui/Badge';

export default function GrowthScoreBadge({
  score = 68,
  status = "Growth Potential: High",
  categoryScores = {
    product: 84,
    sales: 61,
    branding: 55,
    marketing: 48,
    customerReach: 67,
    fundingReadiness: 72
  }
}) {
  // SVG circular gauge calculation
  const radius = 62;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const categories = [
    {
      key: 'product',
      label: 'Product',
      score: categoryScores?.product ?? 84,
      bar: 'bg-teal-500',
      tag: 'Strong'
    },
    {
      key: 'sales',
      label: 'Sales',
      score: categoryScores?.sales ?? 61,
      bar: 'bg-orange-500',
      tag: 'Gap'
    },
    {
      key: 'branding',
      label: 'Branding',
      score: categoryScores?.branding ?? 55,
      bar: 'bg-rose-500',
      tag: 'Gap'
    },
    {
      key: 'marketing',
      label: 'Marketing',
      score: categoryScores?.marketing ?? 48,
      bar: 'bg-amber-500',
      tag: 'Top Gap'
    },
    {
      key: 'customerReach',
      label: 'Reach',
      score: categoryScores?.customerReach ?? 67,
      bar: 'bg-blue-500',
      tag: 'Moderate'
    },
    {
      key: 'fundingReadiness',
      label: 'Funding',
      score: categoryScores?.fundingReadiness ?? 72,
      bar: 'bg-emerald-500',
      tag: 'Eligible'
    }
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft p-6 sm:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Circular Progress Gauge */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center text-center lg:border-r lg:border-slate-100 lg:pr-8">
          <div className="relative flex items-center justify-center w-48 h-48 sm:w-52 sm:h-52">
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

            {/* Inner Ring Text (Guaranteed No Overlap) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-4">
              <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                BRAND GROWTH SCORE
              </span>
              <div className="flex items-baseline justify-center mt-0.5">
                <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight font-sans">
                  {score}
                </span>
                <span className="text-slate-400 font-bold text-base ml-1">/ 100</span>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 mt-1">
                <TrendingUp className="w-3 h-3 text-emerald-600" />
                Growth Potential: High
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-500 mt-3 max-w-xs leading-relaxed">
            Diagnosed across product-market fit, acquisition velocity, unit margins, and stage capital readiness.
          </p>
        </div>

        {/* Right Column: 6-Dimension Score Breakdown */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
              Growth Score Breakdown
            </span>
            <Badge variant="brand" size="sm">
              <Zap className="w-3 h-3" />
              Stage-Weighted
            </Badge>
          </div>

          {/* 6 Category Bars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {categories.map((cat) => {
              const isGap = cat.score < 65;

              return (
                <div
                  key={cat.key}
                  className={`p-3 rounded-xl border transition-all ${
                    isGap
                      ? 'bg-amber-50/30 border-amber-200/80 shadow-2xs'
                      : 'bg-slate-50/70 border-slate-200/60'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-bold text-slate-800 flex items-center gap-1.5">
                      {cat.label}
                      {isGap && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded font-extrabold bg-amber-100 text-amber-900 border border-amber-300">
                          {cat.tag}
                        </span>
                      )}
                    </span>
                    <span className="font-extrabold text-slate-900 font-sans">
                      {cat.score} <span className="text-slate-400 font-normal text-[11px]">/ 100</span>
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
            <span className="flex items-center gap-1.5 text-[11px]">
              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
              Top bottlenecks (Marketing & Branding) are prioritized in Week 1-2 of your plan
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
