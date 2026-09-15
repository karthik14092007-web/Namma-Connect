import React from 'react';
import {
  X,
  TrendingUp,
  Target,
  Users,
  Eye,
  MousePointer,
  ShoppingBag,
  ArrowDownRight,
  Download,
  RotateCcw,
  Sparkles,
  MapPin,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { DEMO_KAVYA_ANALYTICS } from '../../data/reelsData';
import { useToast } from '../../context/ToastContext';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

export default function ReelAnalyticsModal({
  reel,
  isOpen,
  onClose,
  onBoostAgain
}) {
  const { addToast } = useToast();
  const analytics = DEMO_KAVYA_ANALYTICS;

  if (!isOpen) return null;

  const handleDownloadReport = () => {
    addToast('📄 Campaign report generated! Downloading summary PDF/CSV...');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden relative">
        {/* Modal Top Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between shrink-0 bg-slate-50">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-black tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                Campaign Performance Funnel
              </span>
              <span className="text-xs text-slate-500 font-mono">
                {reel?.campaignId || analytics.campaignId}
              </span>
            </div>
            <h2 className="text-lg font-extrabold text-slate-900 tracking-tight mt-0.5">
              Launch Reel Analytics: {reel?.title || 'Millet Crunch Launch'}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadReport}
              className="hidden sm:flex text-xs font-bold gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Report</span>
            </Button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/60 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Reach</span>
              <span className="text-xl font-black text-slate-900 block mt-0.5">
                {analytics.totalReach.toLocaleString()}
              </span>
              <span className="text-[10px] text-emerald-700 font-bold block mt-0.5">
                {analytics.relevantPercent}% Pre-Qualified
              </span>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Video Views</span>
              <span className="text-xl font-black text-slate-900 block mt-0.5">
                {analytics.views.toLocaleString()}
              </span>
              <span className="text-[10px] text-brand-600 font-bold block mt-0.5">
                {analytics.viewRate} view-rate
              </span>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Product Clicks</span>
              <span className="text-xl font-black text-amber-700 block mt-0.5">
                {analytics.clicks.toLocaleString()}
              </span>
              <span className="text-[10px] text-amber-700 font-bold block mt-0.5">
                {analytics.clickRate} click-rate
              </span>
            </div>

            <div className="bg-emerald-50 p-3.5 rounded-2xl border border-emerald-200">
              <span className="text-[10px] uppercase font-bold text-emerald-700 block">Orders Generated</span>
              <span className="text-xl font-black text-emerald-800 block mt-0.5">
                {analytics.conversions} Orders
              </span>
              <span className="text-[10px] text-emerald-700 font-bold block mt-0.5">
                {analytics.roas} Verified ROAS
              </span>
            </div>
          </div>

          {/* 5-Stage Conversion Funnel */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">
                  Targeted Conversion Funnel (Zero Vanishing Metrics)
                </h3>
                <p className="text-xs text-slate-500">
                  How high-intent regional viewers moved from discovery to direct purchase.
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                18.9% Click-to-Order Conversion
              </span>
            </div>

            {/* Visual Step Funnel */}
            <div className="space-y-2.5">
              {analytics.funnelSteps.map((step, idx) => (
                <div key={step.label} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 font-bold text-[10px] flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span className="font-extrabold text-slate-800">{step.label}</span>
                      <span className="hidden sm:inline text-[11px] text-slate-400">
                        — {step.desc}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-slate-900">{step.count.toLocaleString()}</span>
                      <span className="text-[10px] font-bold text-slate-400 w-12 text-right">
                        ({step.percent}%)
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${Math.max(step.percent, 3)}%`,
                        backgroundColor: step.color
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 7-Day Performance Curve & Top Demographics */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Daily Performance Chart */}
            <div className="lg:col-span-7 bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900">
                    Daily Reach & View Engagement (6-Day Trend)
                  </h4>
                  <span className="text-[11px] text-slate-500">
                    Steady daily compounding as matching engine optimizes for Madurai & Chennai
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[10px] font-bold">
                  <span className="flex items-center gap-1 text-slate-600">
                    <span className="w-2 h-2 rounded-full bg-slate-400" /> Reach
                  </span>
                  <span className="flex items-center gap-1 text-emerald-700">
                    <span className="w-2 h-2 rounded-full bg-emerald-600" /> Views
                  </span>
                </div>
              </div>

              <div className="h-52 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={analytics.dailyPerformance}>
                    <defs>
                      <linearGradient id="colorReach" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0f766e" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#0f766e" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0f172a',
                        borderRadius: '12px',
                        border: 'none',
                        color: '#fff',
                        fontSize: '11px'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="reach"
                      stroke="#64748b"
                      fillOpacity={1}
                      fill="url(#colorReach)"
                    />
                    <Area
                      type="monotone"
                      dataKey="views"
                      stroke="#0f766e"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorViews)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Right: Demographics & Regional Distribution */}
            <div className="lg:col-span-5 bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <h4 className="text-xs font-extrabold text-slate-900">
                Audience Demographics Breakdown
              </h4>

              {/* Geographic Share */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Top Regional Buyers
                </span>
                {analytics.topLocations.map((loc) => (
                  <div key={loc.name} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-slate-700">{loc.name}</span>
                      <span className="font-bold text-slate-900">{loc.share}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${loc.share}%`, backgroundColor: loc.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Age Group Share */}
              <div className="pt-2 border-t border-slate-100 space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Top Age Demographic
                </span>
                <div className="flex gap-2">
                  {analytics.topAgeGroups.map((age) => (
                    <div
                      key={age.group}
                      className="flex-1 bg-slate-50 p-2 rounded-xl text-center border border-slate-200"
                    >
                      <span className="text-xs font-extrabold text-slate-900 block">
                        {age.share}%
                      </span>
                      <span className="text-[9px] text-slate-500 block leading-tight mt-0.5">
                        {age.group}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Interests */}
              <div className="pt-2 border-t border-slate-100 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Highest Purchase Intent Triggers
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {analytics.topInterests.map((interest) => (
                    <span
                      key={interest.name}
                      className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200"
                    >
                      {interest.name} ({interest.match})
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 bg-slate-50">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Targeting is dynamically optimizing daily based on purchase intent.</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="text-xs font-bold w-full sm:w-auto"
            >
              Close
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                onClose();
                onBoostAgain?.();
              }}
              className="text-xs font-bold gap-1.5 w-full sm:w-auto shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Boost Reel Again (₹500)</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
