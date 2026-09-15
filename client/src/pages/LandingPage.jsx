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
  ShoppingBag,
  Megaphone,
  Check
} from 'lucide-react';
import { useFounder } from '../context/FounderContext';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Card } from '../components/ui/Card';

export default function LandingPage({ setCurrentView }) {
  const { loadDemoKavya } = useFounder();

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
    <div className="space-y-20 sm:space-y-28 pb-20 overflow-x-hidden">
      {/* ---------------------------------------------------- */}
      {/* HERO SECTION */}
      {/* ---------------------------------------------------- */}
      <section className="relative pt-10 pb-6 sm:pt-16 sm:pb-12 overflow-hidden">
        {/* Subtle ambient light */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-brand-100/40 via-emerald-100/20 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <Badge variant="brand" size="md" className="shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-brand-600 animate-pulse" />
                <span>The D2C Growth Operating System</span>
              </Badge>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12] font-sans">
                Your product is ready.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-700 via-brand-600 to-emerald-700 block mt-1 sm:mt-2">
                  Is your growth strategy?
                </span>
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Namma-Connect helps early-stage D2C founders identify growth gaps, build personalized roadmaps and connect with the right mentors, funding opportunities and customers.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleStartOnboarding}
                  icon={Sparkles}
                  iconPosition="left"
                >
                  Build My Growth Plan
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setCurrentView('dashboard')}
                >
                  Explore Platform
                </Button>

                <Button
                  variant="amber"
                  size="lg"
                  onClick={handleLoadDemo}
                >
                  ⚡ 1-Click Demo (Kavya)
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-500">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Rural & Small-Town Friendly
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Explainable Matching
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  30-Day Actionable Sprint
                </span>
              </div>
            </div>

            {/* Right Hero: Visually Impressive Dashboard Mockup */}
            <div className="lg:col-span-5 relative w-full">
              <div className="relative rounded-2xl bg-white p-6 sm:p-7 shadow-premium border border-slate-200/90 max-w-md mx-auto lg:max-w-none">
                {/* Mockup Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span className="text-[11px] font-bold text-slate-600 ml-1">
                      Namma-Connect OS
                    </span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">
                    Live Diagnostics
                  </span>
                </div>

                {/* Score Card Header */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/70 mb-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-500 block">
                        Brand Growth Score
                      </span>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className="text-3xl sm:text-4xl font-black text-slate-900 font-sans">
                          72
                        </span>
                        <span className="text-slate-400 font-semibold text-sm">/ 100</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200 inline-block">
                        High Potential
                      </span>
                      <p className="text-[10px] text-slate-500 mt-1">30-Day Plan Ready</p>
                    </div>
                  </div>
                </div>

                {/* Mini Metrics List */}
                <div className="space-y-3">
                  {[
                    { name: 'Marketing', score: 48, bar: 'bg-amber-500', note: 'Top Gap' },
                    { name: 'Branding', score: 55, bar: 'bg-rose-500', note: 'Unclear' },
                    { name: 'Sales', score: 61, bar: 'bg-orange-500', note: 'Irregular' },
                    { name: 'Funding', score: 72, bar: 'bg-emerald-500', note: 'Eligible' }
                  ].map((item) => (
                    <div key={item.name} className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                          {item.name}
                          <span className="text-[10px] text-slate-400 font-normal">({item.note})</span>
                        </span>
                        <span className="font-bold text-slate-900 font-sans">{item.score} / 100</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div className={`h-2 rounded-full ${item.bar}`} style={{ width: `${item.score}%` }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer preview pill */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-brand-700 font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    Top Match: Priya Sharma (94%)
                  </span>
                  <span className="text-[11px] text-slate-400">12 Tasks</span>
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
          <Badge variant="rose" size="md" className="mb-2">
            The Early D2C Bottleneck
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Great products don't always build great brands.
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            Most early-stage D2C founders make fantastic products, but hit severe roadblocks when attempting to structure acquisition, build strong positioning, or access credible mentors and stage capital.
          </p>
        </div>

        {/* 4 Problem Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {[
            {
              title: 'Slow Sales Growth',
              desc: 'Good products with organic loyalty, but unpredictable month-on-month sales and no repeatable re-order funnels.',
              tag: 'Sales Disconnect',
              border: 'border-orange-200/80 bg-orange-50/10'
            },
            {
              title: 'Weak Branding',
              desc: 'Authentic product exists, but the brand packaging and digital storytelling fail to clearly convey differentiation.',
              tag: 'Positioning Gap',
              border: 'border-rose-200/80 bg-rose-50/10'
            },
            {
              title: 'Scattered Marketing',
              desc: 'Founders burn budget on unfocused ads without knowing their ideal customer persona or core messaging pillars.',
              tag: 'Customer Acquisition',
              border: 'border-amber-200/80 bg-amber-50/10'
            },
            {
              title: 'Limited Access to Mentors & Funding',
              desc: 'Isolated outside metro tech hubs, making it nearly impossible to find honest mentors, angel capital, or grants.',
              tag: 'Network Isolation',
              border: 'border-blue-200/80 bg-blue-50/10'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl border ${item.border} bg-white shadow-xs hover:shadow-md transition-all flex flex-col justify-between`}
            >
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1.5">
                  {item.tag}
                </span>
                <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-brand-700 font-bold">
                Addressed in Roadmap →
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* HOW NAMMA-CONNECT WORKS (4-Step Workflow) */}
      {/* ---------------------------------------------------- */}
      <section id="how-it-works" className="bg-slate-100/70 border-y border-slate-200/70 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="brand" size="md" className="mb-2">
              Structured Methodology
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              How Namma-Connect works
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              A continuous flywheel: <strong className="text-slate-800">Founder Profile → Growth Diagnosis → Growth Plan → Opportunities</strong>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Assess',
                desc: 'Tell us about your business, current monthly revenue, challenges, and target customer.',
                icon: Layers,
                subtext: '4-minute intuitive wizard'
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
                title: 'Plan',
                desc: 'Receive a personalized 30-Day Growth Plan with prioritized weekly deliverables and checklists.',
                icon: Target,
                subtext: 'High-impact 4-week sprint'
              },
              {
                step: '04',
                title: 'Connect & Grow',
                desc: 'Meet vetted mentors, match with stage-appropriate grants and angel schemes, and reach targeted customers.',
                icon: Users,
                subtext: 'Explainable matching & retail'
              }
            ].map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between group hover:border-brand-300 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-black text-brand-700 font-sans">
                        {step.step}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-1.5">
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-bold text-brand-700">
                    {step.subtext}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Button
              variant="primary"
              size="lg"
              onClick={handleStartOnboarding}
              icon={ArrowRight}
              iconPosition="right"
            >
              Assess My Business Now
            </Button>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* VALUE PROPOSITION CALLOUT BANNER */}
      {/* ---------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-teal-900 via-teal-950 to-slate-900 text-white p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-400">
              Our Core Promise
            </span>
            <blockquote className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white leading-snug">
              "Turn your business data into a clear growth plan, the right connections, and a path to market."
            </blockquote>
            <p className="text-xs sm:text-sm text-teal-200">
              Not a generic e-commerce portal or corporate banking tool. A growth operating system built to turn ambitious regional creators into iconic national consumer brands.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={handleStartOnboarding}
                className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs sm:text-sm transition-all shadow-md cursor-pointer"
              >
                Build My Growth Plan
              </button>
              <button
                onClick={handleLoadDemo}
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-all cursor-pointer"
              >
                Test with Kavya (Namma Crunch)
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
