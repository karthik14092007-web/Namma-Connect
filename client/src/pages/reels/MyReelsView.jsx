import React from 'react';
import {
  Video,
  Eye,
  MousePointer,
  ShoppingBag,
  TrendingUp,
  BarChart3,
  Sparkles,
  Plus,
  Play,
  RotateCcw,
  CheckCircle2,
  Calendar,
  Layers
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

export default function MyReelsView({
  reels = [],
  onOpenAnalytics,
  onCreateReel,
  onOpenDetail
}) {
  const primaryReel = reels[0];

  return (
    <div className="space-y-6">
      {/* Top Founder Summary KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Total Reach Delivered
            </span>
            <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">8,420</span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
              72% Relevant
            </span>
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">
            Pre-qualified regional buyers in South India
          </span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Reel Video Views
            </span>
            <div className="w-8 h-8 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">684</span>
            <span className="text-xs font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-md">
              11.3% View-Rate
            </span>
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">
            &gt; 5 seconds product demo watch-time
          </span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Product Clicks
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
              <MousePointer className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-amber-700">143</span>
            <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md">
              20.9% CTR
            </span>
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">
            Interactions with tagged product drawer
          </span>
        </div>

        <div className="bg-emerald-50/80 p-4 sm:p-5 rounded-3xl border border-emerald-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
              Direct Orders
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-emerald-900">27 Orders</span>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-200/70 px-2 py-0.5 rounded-md">
              6.48x ROAS
            </span>
          </div>
          <span className="text-[11px] text-emerald-800 block mt-1">
            ₹3,240 gross product sales on ₹500 spend
          </span>
        </div>
      </div>

      {/* Main Campaign List Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              Active Launch Campaigns ({reels.length})
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Track the conversion funnel and audience resonance for your published video reels.
            </p>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={onCreateReel}
            className="gap-1.5 text-xs font-bold shrink-0 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>+ Create Another Launch Reel</span>
          </Button>
        </div>

        {/* Campaign Table / Cards */}
        <div className="divide-y divide-slate-100">
          {reels.map((reel) => (
            <div
              key={reel.id}
              className="p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-5 hover:bg-slate-50/50 transition-colors"
            >
              {/* Left: Thumbnail & Details */}
              <div className="flex items-start gap-4 min-w-0">
                <div
                  onClick={() => onOpenDetail?.(reel)}
                  className="relative w-20 h-28 rounded-2xl overflow-hidden bg-slate-900 shrink-0 shadow-xs cursor-pointer group"
                >
                  <img
                    src={reel.posterUrl}
                    alt={reel.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Play className="w-6 h-6 fill-white text-white opacity-80 group-hover:opacity-100" />
                  </div>
                  <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[9px] font-bold px-1 rounded">
                    {reel.duration || '0:28'}
                  </span>
                </div>

                <div className="space-y-1.5 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                      {reel.status || 'Live'}
                    </span>
                    <span className="text-xs font-mono font-semibold text-slate-400">
                      {reel.campaignId}
                    </span>
                    <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                      {reel.goal}
                    </span>
                    <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {reel.audienceFit}% Audience Fit
                    </span>
                  </div>

                  <h4 className="text-sm font-extrabold text-slate-900 leading-snug">
                    {reel.title}
                  </h4>

                  <p className="text-xs text-slate-500 line-clamp-1 max-w-xl">
                    Tagged: <strong className="text-slate-800">{reel.product?.name}</strong> •{' '}
                    {reel.matchedReason}
                  </p>

                  <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1">
                    <span>Budget: ₹{reel.metrics?.budgetSpent || 500}</span>
                    <span>•</span>
                    <span>Duration: 7 Days</span>
                    <span>•</span>
                    <span>Created {reel.createdAt}</span>
                  </div>
                </div>
              </div>

              {/* Middle: Performance Metrics Row */}
              <div className="grid grid-cols-4 gap-4 bg-slate-50 p-3 rounded-2xl border border-slate-200/80 shrink-0 text-center">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Reach</span>
                  <span className="text-xs font-black text-slate-900 block mt-0.5">
                    {reel.metrics?.reach.toLocaleString() || '8,420'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Views</span>
                  <span className="text-xs font-black text-slate-900 block mt-0.5">
                    {reel.metrics?.views || '684'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Clicks</span>
                  <span className="text-xs font-black text-amber-700 block mt-0.5">
                    {reel.metrics?.productClicks || '143'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Orders</span>
                  <span className="text-xs font-black text-emerald-700 block mt-0.5">
                    {reel.metrics?.conversions || '27'}
                  </span>
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-2 self-start lg:self-center shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onOpenDetail?.(reel)}
                  className="text-xs font-bold"
                >
                  View Reel
                </Button>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onOpenAnalytics?.(reel)}
                  className="gap-1.5 text-xs font-bold shadow-xs bg-brand-600 hover:bg-brand-700"
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>View Funnel Analytics</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Users({ className }) {
  return <TrendingUp className={className} />;
}
