import React, { useState } from 'react';
import {
  Megaphone,
  Sparkles,
  Target,
  BarChart3,
  TrendingUp,
  Users,
  Eye,
  MousePointer,
  ShoppingBag,
  ArrowRight,
  Info,
  CheckCircle2
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
import { useFounder } from '../context/FounderContext';
import { useToast } from '../context/ToastContext';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export default function MarketingHubPage() {
  const { activeFounder, campaigns, createCampaign } = useFounder();
  const { addToast } = useToast();

  // Campaign builder state
  const [selectedProduct, setSelectedProduct] = useState('Millet Crunch (Spiced Clusters)');
  const [goal, setGoal] = useState('Product Sales');
  const [targetAudience, setTargetAudience] = useState('Health-conscious consumers');
  const [location, setLocation] = useState('Tamil Nadu & South India');
  const [budget, setBudget] = useState(500);
  const [isLaunching, setIsLaunching] = useState(false);
  const [activeTab, setActiveTab] = useState('analytics'); // 'analytics' | 'builder'

  const activeCampaign = campaigns[0] || {
    productName: 'Millet Crunch (Spiced Clusters)',
    goal: 'Product Sales',
    targetAudience: 'Health-conscious consumers & Parents',
    location: 'Tamil Nadu & South India',
    budget: 500,
    reach: 8420,
    relevantAudiencePercent: 72,
    productViews: 684,
    clicks: 143,
    conversions: 27,
    roas: '3.4x',
    dailyPerformance: [
      { day: 'Day 1', reach: 980, clicks: 14, conversions: 2 },
      { day: 'Day 2', reach: 1120, clicks: 19, conversions: 3 },
      { day: 'Day 3', reach: 1350, clicks: 24, conversions: 5 },
      { day: 'Day 4', reach: 1540, clicks: 28, conversions: 6 },
      { day: 'Day 5', reach: 1680, clicks: 31, conversions: 6 },
      { day: 'Day 6', reach: 1750, clicks: 27, conversions: 5 }
    ]
  };

  const handleLaunchCampaign = async (e) => {
    e.preventDefault();
    setIsLaunching(true);
    await createCampaign({
      productName: selectedProduct,
      goal,
      targetAudience,
      location,
      budget: Number(budget)
    });
    setIsLaunching(false);
    setActiveTab('analytics');
    addToast(`🚀 Targeted campaign for "${selectedProduct}" launched!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
      {/* ---------------- Header (Prompt Section 11) ---------------- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <Badge variant="warning" size="md" className="mb-1.5">
            Demand Generation (Who should I reach?)
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Reach the right customers. Not everyone.
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Namma-Connect helps founders promote products toward relevant audiences instead of relying entirely on follower count or unpredictable social-media algorithms.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl self-start md:self-auto">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'analytics'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Campaign Analytics
          </button>
          <button
            onClick={() => setActiveTab('builder')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'builder'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            + Campaign Builder
          </button>
        </div>
      </div>

      {/* ---------------- CAMPAIGN BUILDER (Section 11) ---------------- */}
      {activeTab === 'builder' && (
        <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-soft">
          <div className="border-b border-slate-100 pb-4 mb-6">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Create Targeted Founder Campaign
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Target hyper-specific regional consumer clusters without burning broad ad budgets.
            </p>
          </div>

          <form onSubmit={handleLaunchCampaign} className="space-y-5">
            {/* Select Product */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Select Product
              </label>
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              >
                <option value="Millet Crunch (Spiced Clusters)">Millet Crunch (Spiced Clusters) — Namma Crunch</option>
                <option value="Roasted Foxtail Crisp">Roasted Foxtail Crisp (Pocket Pack)</option>
                <option value="Festive Snack Box">Festive Snack Hamper</option>
              </select>
            </div>

            {/* Campaign Goals */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Campaign Goal
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {['Awareness', 'Product Sales', 'Website Visits', 'Leads'].map((g) => (
                  <button
                    type="button"
                    key={g}
                    onClick={() => setGoal(g)}
                    className={`py-2.5 px-2 rounded-xl text-xs font-semibold border text-center transition-all cursor-pointer ${
                      goal === g
                        ? 'bg-brand-50 border-brand-600 text-brand-700 font-extrabold shadow-2xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Audience */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Target Audience
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  'Health-conscious consumers',
                  'Parents',
                  'College students',
                  'Fitness enthusiasts',
                  'Retailers'
                ].map((aud) => (
                  <button
                    type="button"
                    key={aud}
                    onClick={() => setTargetAudience(aud)}
                    className={`p-2.5 rounded-xl text-xs font-medium border text-left flex items-center justify-between transition-all cursor-pointer ${
                      targetAudience === aud
                        ? 'bg-brand-50 border-brand-500 text-brand-900 font-bold shadow-2xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="truncate pr-1">{aud}</span>
                    {targetAudience === aud && <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Target Location
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Tamil Nadu', 'South India', 'Pan India'].map((loc) => (
                  <button
                    type="button"
                    key={loc}
                    onClick={() => setLocation(loc)}
                    className={`py-2.5 rounded-xl text-xs font-semibold border text-center transition-all cursor-pointer ${
                      location === loc
                        ? 'bg-brand-50 border-brand-600 text-brand-700 font-extrabold shadow-2xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Test Budget
                </label>
                <span className="text-sm font-black text-slate-900 font-sans">
                  ₹{budget}
                </span>
              </div>
              <input
                type="range"
                min="200"
                max="3000"
                step="100"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full accent-brand-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>₹200 (Micro test)</span>
                <span>₹500 (Recommended)</span>
                <span>₹3,000 (Scale)</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveTab('analytics')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={isLaunching}
                icon={Sparkles}
              >
                Launch Campaign
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* ---------------- CAMPAIGN ANALYTICS (Section 12) ---------------- */}
      {activeTab === 'analytics' && (
        <div className="space-y-6 sm:space-y-8">
          {/* Prototype disclaimer pill */}
          <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-900 flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Hackathon Prototype Demo:</strong> These metrics reflect simulated audience engagement data to demonstrate campaign tracking capabilities.
            </span>
          </div>

          {/* 5 Metrics Cards (Section 12 exact figures) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              {
                label: 'Reach',
                val: '8,420',
                sub: 'Regional consumers',
                icon: Users,
                color: 'text-blue-600 bg-blue-50'
              },
              {
                label: 'Relevant Audience',
                val: '72%',
                sub: 'Health snack intent',
                icon: Target,
                color: 'text-emerald-600 bg-emerald-50'
              },
              {
                label: 'Product Views',
                val: '684',
                sub: 'Pack details viewed',
                icon: Eye,
                color: 'text-purple-600 bg-purple-50'
              },
              {
                label: 'Clicks',
                val: '143',
                sub: 'Store visits (1.7% CTR)',
                icon: MousePointer,
                color: 'text-amber-600 bg-amber-50'
              },
              {
                label: 'Conversions',
                val: '27',
                sub: 'Direct orders placed',
                icon: ShoppingBag,
                color: 'text-brand-600 bg-brand-50'
              }
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-soft flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase font-extrabold text-slate-400">
                      {stat.label}
                    </span>
                    <div className={`p-1.5 rounded-lg ${stat.color}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900 font-sans tracking-tight">
                      {stat.val}
                    </div>
                    <span className="text-[11px] text-slate-500">{stat.sub}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Area Chart: Daily Velocity */}
            <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Campaign Velocity: Impressions vs Clicks
                  </h3>
                  <p className="text-xs text-slate-500">
                    Active campaign: {activeCampaign.productName} (Budget: ₹{activeCampaign.budget})
                  </p>
                </div>
                <Badge variant="success" size="sm">
                  ROAS: {activeCampaign.roas || '3.4x'}
                </Badge>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={activeCampaign.dailyPerformance || []}>
                    <defs>
                      <linearGradient id="areaReach" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0f766e" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#0f766e" stopOpacity={0.0} />
                      </linearGradient>
                      <linearGradient id="areaClicks" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748b' }} />
                    <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        borderColor: '#e2e8f0',
                        borderRadius: '0.75rem',
                        fontSize: '12px'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="reach"
                      name="Reach"
                      stroke="#0f766e"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#areaReach)"
                    />
                    <Area
                      type="monotone"
                      dataKey="clicks"
                      name="Clicks"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#areaClicks)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Target Audience Fit Card */}
            <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft space-y-4">
              <div className="pb-3 border-b border-slate-100">
                <h3 className="text-sm font-bold text-slate-900">
                  Target Audience Fit
                </h3>
                <p className="text-xs text-slate-500">Distribution by intent segment</p>
              </div>

              <div className="space-y-4">
                {[
                  { name: 'Health-Conscious Consumers', pct: 52, bar: 'bg-emerald-500' },
                  { name: 'Parents (School Snacks)', pct: 31, bar: 'bg-brand-600' },
                  { name: 'Fitness & Gym Enthusiasts', pct: 17, bar: 'bg-amber-500' }
                ].map((item, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-slate-700">
                      <span className="truncate pr-1">{item.name}</span>
                      <span className="font-bold text-slate-900 font-sans">{item.pct}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div className={`h-2 rounded-full ${item.bar}`} style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-xs text-slate-600 space-y-1">
                  <p className="font-bold text-slate-900">Founder Strategy Note:</p>
                  <p>
                    Targeting health-conscious parents in Madurai & Coimbatore reduced CAC from ₹48 to ₹18.50 per acquisition.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
