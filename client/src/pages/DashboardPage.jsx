import React from 'react';
import {
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Target,
  Users,
  Coins,
  Megaphone,
  ShoppingBag,
  CheckCircle2,
  Calendar,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { useFounder } from '../context/FounderContext';
import GrowthScoreBadge from '../components/GrowthScoreBadge';

export default function DashboardPage({ setCurrentView }) {
  const { activeFounder, roadmapTasks, mentors, fundingOpportunities } = useFounder();

  // Completed tasks count
  const completedTasks = roadmapTasks.filter((t) => t.status === 'Completed').length;
  const totalTasks = roadmapTasks.length || 12;
  const progressPercent = Math.round((completedTasks / totalTasks) * 100);

  // Top matched mentor
  const topMentor = mentors[0];
  // Top matched funding
  const topFunding = fundingOpportunities[0];

  const greetingFounder = activeFounder.founderName || 'Founder';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* ---------------- Top Greeting & Orientation ---------------- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full border border-brand-200/60">
              Founder Dashboard • Phase: {activeFounder.businessStage}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Good morning, {greetingFounder}. Let's grow your brand.
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Here's what your business should focus on next.
          </p>
        </div>

        {/* Brand Summary Pill */}
        <div className="flex items-center gap-3 bg-white p-2.5 px-4 rounded-xl border border-slate-200 shadow-2xs self-start md:self-auto">
          <div className="w-8 h-8 rounded-lg bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-sm">
            {activeFounder.brandName ? activeFounder.brandName[0] : 'N'}
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900">{activeFounder.brandName}</p>
            <p className="text-[11px] text-slate-500">
              📍 {activeFounder.location} • {activeFounder.monthlyRevenue} / mo
            </p>
          </div>
        </div>
      </div>

      {/* ---------------- 1. GROWTH SCORE (Hero Card) ---------------- */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Target className="w-4 h-4 text-brand-600" />
            <span>Diagnosis Overview (Where Am I?)</span>
          </h2>
          <span className="text-xs text-slate-400">Evaluated on 6 Growth Factors</span>
        </div>

        <GrowthScoreBadge
          score={activeFounder.growthScore}
          status={activeFounder.scoreStatus}
          categoryScores={activeFounder.categoryScores}
          onFixGap={() => setCurrentView('marketing')}
        />
      </div>

      {/* ---------------- 2. YOUR BIGGEST GROWTH GAPS ---------------- */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-700">
              Prioritized Bottlenecks (What's Wrong?)
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Your top 3 growth gaps
            </h2>
          </div>
          <button
            onClick={() => setCurrentView('roadmap')}
            className="text-xs font-bold text-brand-700 hover:text-brand-800 flex items-center gap-1"
          >
            <span>See 30-Day Fix Plan</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(activeFounder.topGaps || []).map((gap, index) => {
            const gapNumber = `0${index + 1}`;
            let borderAccent = 'border-amber-200 bg-amber-50/20';
            let badgeBg = 'bg-amber-100 text-amber-800 border-amber-300';

            if (index === 0) {
              borderAccent = 'border-amber-300 bg-amber-50/40 shadow-xs ring-1 ring-amber-400/20';
              badgeBg = 'bg-amber-100 text-amber-900 border-amber-300 font-extrabold';
            } else if (index === 1) {
              borderAccent = 'border-rose-200 bg-rose-50/20';
              badgeBg = 'bg-rose-100 text-rose-800 border-rose-200';
            } else {
              borderAccent = 'border-orange-200 bg-orange-50/20';
              badgeBg = 'bg-orange-100 text-orange-800 border-orange-200';
            }

            return (
              <div
                key={gap.id || index}
                className={`p-6 rounded-2xl border ${borderAccent} bg-white shadow-soft flex flex-col justify-between transition-all hover:-translate-y-0.5`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-black text-slate-400 font-sans tracking-wider">
                      {gapNumber} — {gap.dimension.toUpperCase()}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-bold ${badgeBg}`}>
                      {gap.score}/100
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {gap.dimension}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {gap.diagnosis}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <button
                    onClick={() => {
                      if (gap.dimension.toLowerCase().includes('marketing')) {
                        setCurrentView('marketing');
                      } else {
                        setCurrentView('roadmap');
                      }
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
                  >
                    <span>{gap.actionText || 'Fix this'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ---------------- 3. WHAT SHOULD I DO NEXT? (Roadmap & Ecosystem Previews) ---------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 cols: 30-Day Growth Roadmap Snapshot */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 shadow-soft p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
                  Action Engine (What Should I Do?)
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  30-Day Growth Plan Progress
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-slate-800">
                  {completedTasks} of {totalTasks} Done
                </span>
                <span className="text-xs text-brand-600 block font-semibold">
                  {progressPercent}% Complete
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 rounded-full h-2 my-4 overflow-hidden">
              <div
                className="bg-brand-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Next 3 Upcoming Tasks */}
            <div className="space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Recommended Next Steps
              </span>
              {roadmapTasks.slice(0, 3).map((task) => (
                <div
                  key={task.id}
                  onClick={() => setCurrentView('roadmap')}
                  className="p-3 rounded-xl border border-slate-200/70 hover:border-brand-300 hover:bg-brand-50/30 transition-all cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                        task.status === 'Completed'
                          ? 'bg-emerald-500 border-emerald-500 text-white'
                          : 'border-slate-300'
                      }`}
                    >
                      {task.status === 'Completed' && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">{task.title}</p>
                      <p className="text-[11px] text-slate-500">
                        {task.weekTitle} • Effort: {task.estimatedEffort}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      task.priority === 'High'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {task.priority} Priority
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Tasks adapt dynamically to your growth score updates
            </span>
            <button
              onClick={() => setCurrentView('roadmap')}
              className="inline-flex items-center gap-1 text-xs font-bold text-brand-700 hover:text-brand-800"
            >
              <span>View Full 4-Week Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right 5 cols: Ecosystem Recommendations (Mentor + Funding shortcuts) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Top Mentor Card */}
          {topMentor && (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Top Matched Mentor
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
                  {topMentor.matchPercentage}% Match
                </span>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <img
                  src={topMentor.avatarUrl}
                  alt={topMentor.name}
                  className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{topMentor.name}</h4>
                  <p className="text-xs text-slate-500">{topMentor.title}</p>
                  <p className="text-[11px] text-emerald-700 font-medium">
                    ✓ Matches your #1 gap: Marketing
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                <span className="font-bold text-slate-900">{topMentor.consultationFee}</span>
                <button
                  onClick={() => setCurrentView('mentors')}
                  className="text-brand-700 font-bold hover:underline flex items-center gap-1"
                >
                  <span>View Profile & Book</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}

          {/* Top Funding Match Card */}
          {topFunding && (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Top Funding Fit
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
                  {topFunding.matchPercentage}% Fit
                </span>
              </div>

              <div className="mb-3">
                <h4 className="text-sm font-bold text-slate-900">{topFunding.provider}</h4>
                <p className="text-xs text-slate-500">{topFunding.category} • Range: {topFunding.fundingRange}</p>
                <p className="text-[11px] text-emerald-700 font-medium mt-1">
                  ✓ Aligned with your ₹7L requirement & early traction stage
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                <span className="text-slate-500 text-[11px]">Eligible: Food & Women-Led</span>
                <button
                  onClick={() => setCurrentView('funding')}
                  className="text-brand-700 font-bold hover:underline flex items-center gap-1"
                >
                  <span>Check Eligibility</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ---------------- 4. QUICK ACTION ECOSYSTEM LAUNCHERS ---------------- */}
      <div className="pt-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
          Direct Growth Tools
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            {
              view: 'marketing',
              title: 'Marketing Hub',
              desc: 'Targeted ad campaigns',
              icon: Megaphone,
              color: 'text-amber-600 bg-amber-50'
            },
            {
              view: 'mentors',
              title: 'Mentor Directory',
              desc: '45-min growth sessions',
              icon: Users,
              color: 'text-brand-600 bg-brand-50'
            },
            {
              view: 'funding',
              title: 'Funding Grants',
              desc: 'Govt schemes & angels',
              icon: Coins,
              color: 'text-emerald-600 bg-emerald-50'
            },
            {
              view: 'marketplace',
              title: 'D2C Marketplace',
              desc: 'Discover & list products',
              icon: ShoppingBag,
              color: 'text-purple-600 bg-purple-50'
            }
          ].map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.view}
                onClick={() => setCurrentView(tool.view)}
                className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-brand-300 transition-all text-left flex flex-col justify-between group cursor-pointer"
              >
                <div className={`w-9 h-9 rounded-lg ${tool.color} flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-brand-700 transition-colors">
                    {tool.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">{tool.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
