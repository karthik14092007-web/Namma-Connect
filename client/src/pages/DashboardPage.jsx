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
  Zap,
  Video,
  ArrowUpRight
} from 'lucide-react';
import { useFounder } from '../context/FounderContext';
import GrowthScoreBadge from '../components/GrowthScoreBadge';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { calculateGrowthDiagnostic } from '../scoring/scoringEngine';
import { detectBottlenecksAndActions } from '../scoring/recommendationEngine';
import { KAVYA_DEMO_ANSWERS } from '../scoring/demoAnswers';

export default function DashboardPage({ setCurrentView }) {
  const { activeFounder, roadmapTasks, mentors, fundingOpportunities } = useFounder();

  // Completed tasks count
  const completedTasks = roadmapTasks.filter((t) => t.status === 'Completed').length;
  const totalTasks = roadmapTasks.length || 12;
  const progressPercent = Math.round((completedTasks / totalTasks) * 100);

  // Top matched mentor & funding
  const topMentor = mentors[0];
  const topFunding = fundingOpportunities[0];
  const greetingFounder = activeFounder.founderName || 'Kavya';

  // Transparent Rule-Based Diagnostic Calculation
  const answers = activeFounder?.diagnosticAnswers || KAVYA_DEMO_ANSWERS;
  const diagnostic = calculateGrowthDiagnostic(answers, activeFounder.businessStage || 'Early traction');
  const bottleneckData = detectBottlenecksAndActions(diagnostic.factors);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 sm:space-y-10">
      {/* ---------------- Top Greeting & Orientation ---------------- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <Badge variant="brand" size="md" className="mb-1.5">
            Founder Operating System • {activeFounder.businessStage}
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Good morning, {greetingFounder}.
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Here's what your business should focus on next.
          </p>
        </div>

        {/* Brand Summary Box */}
        <div className="flex items-center gap-3 bg-white p-2.5 px-4 rounded-xl border border-slate-200/80 shadow-2xs self-start md:self-auto">
          <div className="w-8 h-8 rounded-lg bg-brand-600 text-white font-extrabold flex items-center justify-center text-xs shrink-0">
            {activeFounder.brandName ? activeFounder.brandName[0] : 'N'}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-slate-900 truncate">{activeFounder.brandName}</p>
            <p className="text-[11px] text-slate-500 truncate">
              {activeFounder.location} • {activeFounder.monthlyRevenue} / mo
            </p>
          </div>
        </div>
      </div>

      {/* ---------------- 1. GROWTH DIAGNOSTIC (Rule-Based Hero Card) ---------------- */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Target className="w-4 h-4 text-brand-600" />
            <span>Growth Readiness Diagnostic (Where is my business today?)</span>
          </h2>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 hidden sm:inline">6 Factors • 24 Observable Signals</span>
            <button
              onClick={() => setCurrentView('diagnostic')}
              className="text-xs font-bold text-brand-600 hover:text-brand-700 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Explore All 24 Questions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <GrowthScoreBadge
          score={diagnostic.overallScore}
          status={diagnostic.maturity}
          categoryScores={activeFounder.categoryScores}
          founderAnswers={answers}
          businessStage={activeFounder.businessStage}
        />
      </div>

      {/* ---------------- 2. BOTTLENECK DETECTION & NEXT BEST ACTION ---------------- */}
      <div className="space-y-4">
        {/* Dynamic Bottleneck Callout Banner */}
        <div className="p-4 sm:p-5 bg-linear-to-r from-amber-50 via-rose-50 to-slate-50 rounded-3xl border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5 sm:mt-0">
              <AlertTriangle className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
                  Primary Constraint Detected
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  {bottleneckData.primaryBottleneck.label}: {bottleneckData.primaryBottleneck.score}/100
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900 mt-0.5">
                {bottleneckData.summaryHeadline}
              </h3>
              <p className="text-xs text-slate-600">
                {bottleneckData.summarySubtitle}
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentView('roadmap')}
            icon={ArrowRight}
            iconPosition="right"
            className="shrink-0 text-xs font-bold self-start sm:self-auto"
          >
            See 30-Day Fix Plan
          </Button>
        </div>

        {/* Rule-Based Next Best Action Card */}
        <div className="bg-slate-900 text-white rounded-3xl p-5 sm:p-6 shadow-md border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
                Rule-Based Next Best Action
              </span>
              <span className="text-xs text-slate-400">• Priority Recommendation</span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              Stage: {diagnostic.stageProfile?.label}
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="space-y-1.5 max-w-2xl">
              <div className="inline-block text-[11px] font-bold text-amber-300 bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-500/40">
                Priority: {bottleneckData.nextBestAction.priority}
              </div>
              <h3 className="text-base sm:text-lg font-black text-white leading-snug">
                {bottleneckData.nextBestAction.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {bottleneckData.nextBestAction.explanation}
              </p>
            </div>

            <Button
              variant="primary"
              size="md"
              onClick={() => setCurrentView(bottleneckData.nextBestAction.actionUrl)}
              className="shrink-0 text-xs font-black gap-1.5 shadow-sm bg-emerald-600 hover:bg-emerald-700 self-start lg:self-center"
            >
              <span>{bottleneckData.nextBestAction.actionText}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Transparent Citation: Why This Recommendation? */}
          <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-slate-400">
            <span className="font-extrabold text-slate-300 shrink-0 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              Why this recommendation?
            </span>
            <div className="flex flex-wrap gap-2">
              {bottleneckData.nextBestAction.whyRecommendation.map((cite) => (
                <span
                  key={cite.factor}
                  className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md font-mono text-[10px] border border-slate-700"
                >
                  {cite.factor} = <strong className="text-emerald-400 font-bold">{cite.score}/100</strong>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 3 Prioritized Diagnostic Gap Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 pt-2">
          {bottleneckData.topGaps.map((gap, index) => {
            const gapNumber = `0${index + 1}`;
            const isTop = index === 0;

            return (
              <div
                key={gap.id || index}
                className={`p-6 rounded-2xl border bg-white shadow-soft flex flex-col justify-between transition-all hover:-translate-y-0.5 ${
                  isTop
                    ? 'border-amber-300 ring-1 ring-amber-400/20 shadow-xs'
                    : 'border-slate-200/80'
                }`}
              >
                <div>
                  {/* Top Rank + Score Row */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-black text-slate-400 font-sans tracking-wider">
                      {gapNumber} — {gap.dimension.toUpperCase()}
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full font-black font-sans bg-amber-50 text-amber-900 border border-amber-300">
                      {gap.score} / 100
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {gap.dimension}
                    </h3>
                    <Badge variant={gap.priority.variant} size="sm">
                      {gap.priority.label}
                    </Badge>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {gap.diagnosis}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      if (gap.dimension.toLowerCase().includes('marketing')) {
                        setCurrentView('marketing');
                      } else {
                        setCurrentView('roadmap');
                      }
                    }}
                    icon={ArrowRight}
                    iconPosition="right"
                  >
                    {gap.actionText || 'Fix this'}
                  </Button>
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
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-700 block">
                  Action Roadmap (What should I do next?)
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Your 30-Day Growth Plan
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-slate-900">
                  {completedTasks} of {totalTasks} Tasks Completed
                </span>
                <span className="text-xs text-brand-700 block font-extrabold">
                  {progressPercent}% Done
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

            {/* Next 3 Tasks preview */}
            <div className="space-y-2.5">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                Immediate Next Sprint Tasks
              </span>
              {roadmapTasks.slice(0, 3).map((task) => (
                <div
                  key={task.id}
                  onClick={() => setCurrentView('roadmap')}
                  className="p-3 rounded-xl border border-slate-200/70 hover:border-brand-300 hover:bg-brand-50/20 transition-all cursor-pointer flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center border shrink-0 ${
                        task.status === 'Completed'
                          ? 'bg-emerald-500 border-emerald-500 text-white'
                          : 'border-slate-300'
                      }`}
                    >
                      {task.status === 'Completed' && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-800 truncate">{task.title}</p>
                      <p className="text-[11px] text-slate-500 truncate">
                        {task.weekTitle} • Effort: {task.estimatedEffort}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={task.priority === 'High' ? 'rose' : 'neutral'}
                    size="sm"
                    className="shrink-0"
                  >
                    {task.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500 text-[11px]">
              Tasks adapt dynamically to score updates
            </span>
            <button
              onClick={() => setCurrentView('roadmap')}
              className="inline-flex items-center gap-1 font-bold text-brand-700 hover:text-brand-800 cursor-pointer"
            >
              <span>View Full 4-Week Plan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right 5 cols: Recommendations (Mentor + Funding matches) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Top Mentor Card */}
          {topMentor && (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  Recommended Mentor (Who can help me?)
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold border border-emerald-300 font-sans">
                  {topMentor.matchPercentage}% MATCH
                </span>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <img
                  src={topMentor.avatarUrl}
                  alt={topMentor.name}
                  className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0 shadow-2xs"
                />
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-slate-900 truncate">{topMentor.name}</h4>
                  <p className="text-xs text-slate-500 truncate">{topMentor.title}</p>
                  <p className="text-[11px] text-emerald-700 font-semibold truncate">
                    ✓ Matches #1 gap: Performance Marketing
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                <span className="font-extrabold text-slate-900 font-sans">{topMentor.consultationFee}</span>
                <button
                  onClick={() => setCurrentView('mentors')}
                  className="text-brand-700 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>View Match Breakdown</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}

          {/* Top Funding Fit Card */}
          {topFunding && (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  Recommended Capital (Who can fund me?)
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold border border-emerald-300 font-sans">
                  {topFunding.matchPercentage}% FIT
                </span>
              </div>

              <div className="mb-3">
                <h4 className="text-sm font-bold text-slate-900">{topFunding.provider}</h4>
                <p className="text-xs text-slate-500">{topFunding.category} • Range: {topFunding.fundingRange}</p>
                <p className="text-[11px] text-emerald-700 font-semibold mt-1">
                  ✓ Aligned with your ₹7L capital requirement
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                <span className="text-slate-500 text-[11px]">Eligible: Food & Women-Led</span>
                <button
                  onClick={() => setCurrentView('funding')}
                  className="text-brand-700 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Check Eligibility</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ---------------- 3.5. LAUNCH REELS PROMO BANNER ---------------- */}
      <div className="bg-linear-to-r from-emerald-950 via-slate-900 to-teal-950 rounded-3xl p-5 sm:p-6 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-emerald-900/60">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shrink-0 shadow-xs">
            <Video className="w-6 h-6 text-emerald-200" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/40">
                New Feature
              </span>
              <span className="text-xs text-slate-300 font-semibold">
                Targeted D2C Video Marketing
              </span>
            </div>
            <h3 className="text-base font-extrabold text-white mt-0.5">
              Promote {activeFounder.brandName} with Launch Reels
            </h3>
            <p className="text-xs text-slate-300">
              Reach ~8,420 regional buyers with 91% audience-fit scoring. No viral algorithm guessing.
            </p>
          </div>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={() => setCurrentView('launch-reels')}
          className="shrink-0 text-xs font-bold gap-1.5 shadow-sm bg-emerald-600 hover:bg-emerald-700"
        >
          <span>Explore Launch Reels</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </div>

      {/* ---------------- 4. QUICK ACTION ECOSYSTEM LAUNCHERS ---------------- */}
      <div className="pt-2">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3">
          Growth Operating System Tools
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
          {[
            {
              view: 'launch-reels',
              title: 'Launch Reels',
              desc: 'Targeted D2C Video',
              icon: Video,
              color: 'text-emerald-700 bg-emerald-50'
            },
            {
              view: 'marketing',
              title: 'Marketing Hub',
              desc: 'Who should I reach?',
              icon: Megaphone,
              color: 'text-amber-600 bg-amber-50'
            },
            {
              view: 'mentors',
              title: 'Mentors',
              desc: 'Who can help me?',
              icon: Users,
              color: 'text-brand-600 bg-brand-50'
            },
            {
              view: 'funding',
              title: 'Funding Fit',
              desc: 'Who can fund me?',
              icon: Coins,
              color: 'text-emerald-600 bg-emerald-50'
            },
            {
              view: 'marketplace',
              title: 'Marketplace',
              desc: 'Where can I sell?',
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
                <div className={`w-9 h-9 rounded-lg ${tool.color} flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform`}>
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
