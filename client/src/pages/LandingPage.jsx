import React from 'react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Target,
  BarChart3,
  Users,
  Coins,
  ShieldCheck,
  Award,
  Zap,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { useFounder } from '../context/FounderContext';

export default function LandingPage({ setCurrentView }) {
  const { loadDemoKavya, activeFounder } = useFounder();

  const handleStartOnboarding = () => {
    setCurrentView('onboarding');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoadDemo = async () => {
    await loadDemoKavya();
    setCurrentView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-24 pb-20">
      {/* ---------------------------------------------------- */}
      {/* HERO SECTION */}
      {/* ---------------------------------------------------- */}
      <section className="relative pt-12 pb-8 sm:pt-16 sm:pb-12 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-brand-100/60 to-emerald-100/30 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-200/70 text-brand-800 text-xs font-semibold shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-brand-600 animate-pulse" />
                <span>The Growth OS for Early-Stage D2C Founders</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12] font-sans">
                Your product is ready.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-700 via-brand-600 to-emerald-700 block mt-1">
                  Is your growth strategy?
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Namma-Connect helps early-stage D2C founders diagnose growth gaps, build a personalized roadmap, and connect with the right mentors, funding opportunities and customers.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={handleStartOnboarding}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-bold text-sm shadow-md shadow-brand-600/25 transition-all hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-emerald-200" />
                  <span>Build My Growth Plan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setCurrentView('dashboard')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold text-sm transition-all hover:border-slate-400 cursor-pointer shadow-2xs"
                >
                  <span>Explore Namma-Connect</span>
                </button>

                <button
                  onClick={handleLoadDemo}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 font-bold text-xs transition-all shadow-2xs cursor-pointer"
                  title="Test demo persona Kavya (Namma Crunch)"
                >
                  <span>⚡ 1-Click Demo (Kavya)</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Rural & Small-town Friendly
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Explainable Weighted Matching
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 30-Day Actionable Roadmap
                </span>
              </div>
            </div>

            {/* Right Hero: Dashboard Mockup */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl bg-white p-6 shadow-premium border border-slate-200/90 transform hover:-rotate-1 transition-transform duration-300">
                {/* Mockup Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                    <span className="text-[11px] font-semibold text-slate-500 ml-2">
                      Namma-Connect Diagnostics
                    </span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                    Live Analysis
                  </span>
                </div>

                {/* Score Card Header */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/60 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500">
                        Brand Growth Score
                      </span>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className="text-3xl font-extrabold text-slate-900 font-sans">
                          72
                        </span>
                        <span className="text-slate-400 font-medium text-sm">/100</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 inline-block">
                        High Potential
                      </span>
                      <p className="text-[10px] text-slate-500 mt-1">Ready for 30-Day Sprint</p>
                    </div>
                  </div>
                </div>

                {/* Mini Metrics List */}
                <div className="space-y-2.5">
                  {[
                    { name: 'Product', val: 84, color: 'bg-teal-500' },
                    { name: 'Sales Growth', val: 61, color: 'bg-orange-500' },
                    { name: 'Branding', val: 55, color: 'bg-rose-500' },
                    { name: 'Marketing', val: 48, color: 'bg-amber-500' },
                    { name: 'Customer Reach', val: 67, color: 'bg-blue-500' },
                    { name: 'Funding Readiness', val: 72, color: 'bg-emerald-500' }
                  ].map((m) => (
                    <div key={m.name} className="flex items-center justify-between text-xs">
                      <span className="text-slate-600 font-medium w-36 truncate">{m.name}</span>
                      <div className="flex-1 mx-3 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div className={`h-1.5 rounded-full ${m.color}`} style={{ width: `${m.val}%` }} />
                      </div>
                      <span className="font-bold text-slate-800 w-8 text-right font-sans">{m.val}</span>
                    </div>
                  ))}
                </div>

                {/* Callout in Mockup */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-amber-700 font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                    Top Gap: Marketing (48/100)
                  </span>
                  <span className="text-brand-700 font-bold">12 Tasks Queued →</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* PROBLEM SECTION */}
      {/* ---------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-wider font-bold text-brand-700">
            The Early D2C Bottleneck
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
            Great products don't always build great brands.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Most early-stage D2C founders have mastered product making, but hit a wall trying to scale sales, access capital, and find mentors who truly understand regional realities.
          </p>
        </div>

        {/* 4 Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Slow Sales Growth',
              desc: 'Good products with organic loyalty, but unpredictable month-on-month revenue and no repeatable re-order funnels.',
              tag: 'Sales Disconnect',
              color: 'border-orange-200/80 bg-orange-50/20'
            },
            {
              title: 'Weak Branding',
              desc: 'Authentic product exists, but the brand packaging and digital storytelling fail to clearly convey differentiation.',
              tag: 'Positioning Gap',
              color: 'border-rose-200/80 bg-rose-50/20'
            },
            {
              title: 'Scattered Marketing',
              desc: 'Founders burn budget on unfocused ads without knowing their ideal customer persona or core messaging pillars.',
              tag: 'Customer Acquisition',
              color: 'border-amber-200/80 bg-amber-50/20'
            },
            {
              title: 'No Growth Network',
              desc: 'Isolated outside metro tech hubs, making it nearly impossible to find honest mentors, angel capital, or grants.',
              tag: 'Network Isolation',
              color: 'border-blue-200/80 bg-blue-50/20'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl border ${item.color} bg-white shadow-xs hover:shadow-md transition-all hover:-translate-y-1 flex flex-col justify-between`}
            >
              <div>
                <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                  {item.tag}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>Identified in Diagnosis</span>
                <span className="text-brand-600 font-semibold">Solved in Plan</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* HOW NAMMA-CONNECT WORKS (4-Step Horizontal Workflow) */}
      {/* ---------------------------------------------------- */}
      <section className="bg-slate-100/70 border-y border-slate-200/70 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-wider font-bold text-brand-700">
              Structured Methodology
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
              How Namma-Connect Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              The continuous founder journey: <strong className="text-slate-800">Founder Profile → Growth Diagnosis → Growth Plan → Opportunities</strong>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {[
              {
                step: '01',
                title: 'Assess',
                desc: 'Tell us about your business, current monthly revenue, challenges, and target customer.',
                icon: Layers,
                subtext: '4-minute intuitive onboarding'
              },
              {
                step: '02',
                title: 'Diagnose',
                desc: 'We calculate your Brand Growth Score and identify your top 3 growth bottlenecks with complete transparency.',
                icon: BarChart3,
                subtext: '6-dimension gap analysis'
              },
              {
                step: '03',
                title: 'Build',
                desc: 'Receive a personalized 30-Day Growth Plan with prioritized weekly deliverables and checklists.',
                icon: Target,
                subtext: 'High-impact 4-week sprint'
              },
              {
                step: '04',
                title: 'Connect',
                desc: 'Meet vetted mentors, match with stage-appropriate grants and angel schemes, and reach targeted customers.',
                icon: Users,
                subtext: 'Explainable weighted matching'
              }
            ].map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs relative flex flex-col justify-between group hover:border-brand-300 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-black text-brand-700 font-sans">
                        {step.step}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-semibold text-brand-700">
                    {step.subtext}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={handleStartOnboarding}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              <span>Get Started: Assess My Business Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* VALUE PROPOSITION CALLOUT BANNER */}
      {/* ---------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-teal-900 via-teal-950 to-slate-900 text-white p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">
              Our Core Mission
            </span>
            <blockquote className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white leading-snug">
              "Namma-Connect helps early-stage D2C founders understand what's holding their brand back and connects them with the right resources to grow."
            </blockquote>
            <p className="text-xs sm:text-sm text-teal-200">
              Not another generic e-commerce store. A full-cycle growth acceleration platform for ambitious creators building Bharat's next iconic brands.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={handleStartOnboarding}
                className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-md cursor-pointer"
              >
                Build My Growth Plan
              </button>
              <button
                onClick={handleLoadDemo}
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all cursor-pointer"
              >
                Experience Demo as Kavya
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
