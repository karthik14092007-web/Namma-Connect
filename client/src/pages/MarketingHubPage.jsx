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
  CheckCircle2,
  PieChart as PieChartIcon
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { useFounder } from '../context/FounderContext';

export default function MarketingHubPage() {
  const { activeFounder, campaigns, createCampaign, products } = useFounder();

  // Campaign creation form state
  const [selectedProduct, setSelectedProduct] = useState('Millet Crunch (Spiced Clusters)');
  const [goal, setGoal] = useState('Product sales');
  const [targetAudience, setTargetAudience] = useState('Health-conscious consumers & Parents');
  const [location, setLocation] = useState('Tamil Nadu & South India');
  const [budget, setBudget] = useState(500);
  const [isLaunching, setIsLaunching] = useState(false);
  const [activeTab, setActiveTab] = useState('analytics'); // 'analytics' | 'create'

  const activeCampaign = campaigns[0] || {
    productName: 'Millet Crunch (Spiced Clusters)',
    goal: 'Product sales',
    targetAudience: 'Health-conscious consumers & Parents',
    location: 'Tamil Nadu & South India',
    budget: 500,
    reach: 8420,
    relevantAudiencePercent: 72,
    productViews: 684,
    clicks: 143,
    conversions: 27,
    costPerConversion: '₹18.50',
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

  const handleCreateCampaign = async (e) => {
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
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* ---------------- Header ---------------- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
            Targeted Demand Generation (Who Should I Reach?)
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Reach the right customers. Not everyone.
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Namma-Connect helps founders promote their products to relevant audiences instead of relying entirely on follower count or unpredictable social-media algorithms.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl self-start md:self-auto">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'analytics'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Campaign Performance
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'create'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            + Create Campaign
          </button>
        </div>
      </div>

      {/* ---------------- CREATE CAMPAIGN VIEW ---------------- */}
      {activeTab === 'create' && (
        <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-soft">
          <div className="border-b border-slate-100 pb-4 mb-6">
            <h2 className="text-lg font-bold text-slate-900">Launch Targeted Founder Micro-Campaign</h2>
            <p className="text-xs text-slate-500">
              Set your target audience and budget. We optimize distribution towards high-intent buyers in your target geography.
            </p>
          </div>

          <form onSubmit={handleCreateCampaign} className="space-y-5">
            {/* Product selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Product
              </label>
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              >
                <option value="Millet Crunch (Spiced Clusters)">Millet Crunch (Spiced Clusters) — by Namma Crunch</option>
                <option value="Roasted Foxtail Crisp">Roasted Foxtail Crisp (50g Pocket Pack)</option>
                <option value="Festive Healthy Snack Hamper">Festive Healthy Snack Hamper</option>
              </select>
            </div>

            {/* Campaign Goal */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Primary Goal
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {['Awareness', 'Website visits', 'Product sales', 'Leads'].map((g) => (
                  <button
                    type="button"
                    key={g}
                    onClick={() => setGoal(g)}
                    className={`py-2.5 px-2 rounded-xl text-xs font-semibold border text-center transition-all ${
                      goal === g
                        ? 'bg-brand-50 border-brand-600 text-brand-700 font-bold shadow-xs'
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
                Target Audience Cluster
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  'Health-conscious consumers',
                  'Parents',
                  'College students',
                  'Fitness enthusiasts',
                  'Retailers & Boutique Cafes'
                ].map((aud) => (
                  <button
                    type="button"
                    key={aud}
                    onClick={() => setTargetAudience(aud)}
                    className={`p-2.5 rounded-xl text-xs font-medium border text-left flex items-center justify-between transition-all ${
                      targetAudience === aud
                        ? 'bg-brand-50 border-brand-500 text-brand-800 font-bold shadow-xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{aud}</span>
                    {targetAudience === aud && <CheckCircle2 className="w-3.5 h-3.5 text-brand-600" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Location */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Target Geography
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Tamil Nadu', 'South India', 'Pan India'].map((loc) => (
                  <button
                    type="button"
                    key={loc}
                    onClick={() => setLocation(loc)}
                    className={`py-2.5 rounded-xl text-xs font-medium border text-center transition-all ${
                      location === loc
                        ? 'bg-brand-50 border-brand-600 text-brand-700 font-bold shadow-xs'
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
                  Test Budget (INR)
                </label>
                <span className="text-sm font-extrabold text-slate-900 font-sans">
                  ₹{budget}
                </span>
              </div>
              <input
                type="range"
                min="200"
                max="5000"
                step="100"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full accent-brand-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>₹200 (Micro test)</span>
                <span>₹500 (Recommended)</span>
                <span>₹5,000 (Scale)</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setActiveTab('analytics')}
                className="text-xs font-medium text-slate-500 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLaunching}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-md shadow-brand-600/20 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-emerald-200" />
                <span>{isLaunching ? 'Deploying...' : 'Launch Campaign'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ---------------- CAMPAIGN ANALYTICS DASHBOARD ---------------- */}
      {activeTab === 'analytics' && (
        <div className="space-y-8">
          {/* Prototype disclaimer pill */}
          <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-900 flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Hackathon Prototype Demo:</strong> Analytics below illustrate audience engagement and conversion metrics generated from targeted regional campaigns.
            </span>
          </div>

          {/* Core Metrics Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              {
                label: 'Reach',
                val: activeCampaign.reach.toLocaleString(),
                sub: 'Regional impressions',
                icon: Users,
                color: 'text-blue-600 bg-blue-50'
              },
              {
                label: 'Relevant Audience',
                val: `${activeCampaign.relevantAudiencePercent}%`,
                sub: 'Health snack seekers',
                icon: Target,
                color: 'text-emerald-600 bg-emerald-50'
              },
              {
                label: 'Product Views',
                val: activeCampaign.productViews.toLocaleString(),
                sub: 'Pack details viewed',
                icon: Eye,
                color: 'text-purple-600 bg-purple-50'
              },
              {
                label: 'Clicks',
                val: activeCampaign.clicks.toLocaleString(),
                sub: 'Store visits (1.7% CTR)',
                icon: MousePointer,
                color: 'text-amber-600 bg-amber-50'
              },
              {
                label: 'Conversions',
                val: activeCampaign.conversions.toLocaleString(),
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
                    <span className="text-[11px] uppercase font-bold text-slate-400">
                      {stat.label}
                    </span>
                    <div className={`p-1.5 rounded-lg ${stat.color}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold text-slate-900 font-sans tracking-tight">
                      {stat.val}
                    </div>
                    <span className="text-[11px] text-slate-500">{stat.sub}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Daily trend area chart */}
            <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Campaign Velocity: Reach vs Clicks
                  </h3>
                  <p className="text-xs text-slate-500">
                    Active campaign: {activeCampaign.productName} (Budget: ₹{activeCampaign.budget})
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  ROAS: {activeCampaign.roas || '3.4x'}
                </span>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={activeCampaign.dailyPerformance || []}>
                    <defs>
                      <linearGradient id="colorReach" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0f766e" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#0f766e" stopOpacity={0.0} />
                      </linearGradient>
                      <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
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
                        fontSize: '12px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="reach"
                      name="Reach"
                      stroke="#0f766e"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorReach)"
                    />
                    <Area
                      type="monotone"
                      dataKey="clicks"
                      name="Clicks"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorClicks)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Right 4 cols: Audience Breakdown */}
            <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft space-y-4">
              <div className="pb-3 border-b border-slate-100">
                <h3 className="text-sm font-bold text-slate-900">
                  Target Audience Fit
                </h3>
                <p className="text-xs text-slate-500">Distribution by customer cluster</p>
              </div>

              <div className="space-y-4">
                {[
                  { name: 'Health-Conscious Families', pct: 52, color: 'bg-emerald-500' },
                  { name: 'Young Working Parents', pct: 31, color: 'bg-brand-600' },
                  { name: 'College / Fitness Enthusiasts', pct: 17, color: 'bg-amber-500' }
                ].map((aud, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-slate-700">{aud.name}</span>
                      <span className="font-bold text-slate-900 font-sans">{aud.pct}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div className={`h-2 rounded-full ${aud.color}`} style={{ width: `${aud.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
                  <p className="font-bold text-slate-900">Founder Growth Insight:</p>
                  <p>
                    Health-conscious families in Tier-2 Tamil Nadu show 2.8x higher repeat reorder rates compared to generic social traffic.
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
