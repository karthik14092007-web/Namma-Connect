// client/src/pages/brand-ai/BrandPositioningView.jsx
import React, { useState } from 'react';
import {
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Copy,
  Check,
  RefreshCw,
  TrendingUp,
  UserCheck,
  Target,
  ArrowRight,
  ShieldCheck,
  Flame,
  Award,
  Zap,
  Edit3,
  Video,
  Users
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export default function BrandPositioningView({
  brandProfile,
  analysisData,
  isSharpened,
  setIsSharpened,
  onOpenEditProfile,
  setCurrentView
}) {
  const { addToast } = useToast();
  const [copiedKey, setCopiedKey] = useState(null);
  const [activeTone, setActiveTone] = useState('original');

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    addToast('Copied to clipboard!', 'success');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const currentVpText = analysisData.valuePropositions[activeTone] || analysisData.valuePropositions.original;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. Score Overview & Diagnostic Summary Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-50 rounded-full blur-3xl -z-10 -mr-20 -mt-20 opacity-60" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-brand-50 text-brand-700 border border-brand-200/60">
                Brand Positioning Analysis
              </span>
              <span className="text-xs text-slate-400 font-semibold">•</span>
              <span className="text-xs font-bold text-slate-600">
                {brandProfile.brandName} ({brandProfile.category})
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {isSharpened ? 'Sharpened Brand Positioning' : 'Current Brand Positioning'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
              {isSharpened
                ? 'Your positioning is now highly specific, differentiated, and tuned for high-intent customer search discovery.'
                : 'Evaluated against category benchmarks for clarity, differentiation, and customer acquisition readiness.'}
            </p>
          </div>

          {/* Positioning Score Card */}
          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/70 shrink-0">
            <div className="text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Positioning Score
              </span>
              <div className="flex items-baseline justify-center gap-1">
                <span className={`text-4xl font-black ${isSharpened ? 'text-emerald-600' : 'text-slate-800'}`}>
                  {analysisData.score}
                </span>
                <span className="text-xs font-extrabold text-slate-400">/100</span>
              </div>
            </div>

            <div className="h-10 w-px bg-slate-200" />

            <div>
              <span className={`text-xs font-black block ${isSharpened ? 'text-emerald-700' : 'text-amber-700'}`}>
                {isSharpened ? '✓ High Clarity' : '⚠ Broad Audience'}
              </span>
              <button
                onClick={() => setIsSharpened(!isSharpened)}
                className={`mt-1 inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-[11px] font-extrabold transition-all cursor-pointer ${
                  isSharpened
                    ? 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                    : 'bg-brand-600 hover:bg-brand-700 text-white shadow-xs'
                }`}
              >
                <Zap className="w-3 h-3 text-emerald-200" />
                <span>{isSharpened ? 'View Original (68)' : 'Apply Sharper AI (84) →'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* 5 Factor Progress Bars */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 pt-6">
          {analysisData.factors.map((factor) => {
            const pct = factor.score;
            const barColor =
              pct >= 80 ? 'bg-emerald-500' : pct >= 65 ? 'bg-brand-500' : pct >= 50 ? 'bg-amber-500' : 'bg-rose-500';
            const badgeColor =
              pct >= 80
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : pct >= 65
                ? 'bg-brand-50 text-brand-700 border-brand-200'
                : 'bg-amber-50 text-amber-700 border-amber-200';

            return (
              <div key={factor.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-700 truncate" title={factor.name}>
                      {factor.name}
                    </span>
                    <span className={`text-[10px] font-black px-1.5 py-0.5 rounded border ${badgeColor}`}>
                      {factor.score}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden mb-2">
                    <div
                      className={`h-full ${barColor} rounded-full transition-all duration-700`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
                <p className="text-[10px] text-slate-500 leading-tight">
                  {factor.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Positioning Diagnosis: "What We Found" */}
      <div className={`p-6 rounded-3xl border transition-all ${
        isSharpened
          ? 'bg-emerald-50/50 border-emerald-200/80'
          : 'bg-amber-50/50 border-amber-200/80'
      }`}>
        <div className="flex items-start gap-3.5 mb-4">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
            isSharpened ? 'bg-emerald-600 text-white' : 'bg-amber-500 text-white'
          }`}>
            {isSharpened ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-500">
              Positioning Diagnosis
            </span>
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              {isSharpened
                ? 'Your positioning is now specific and customer-centric'
                : 'What we found: Your current positioning is too broad'}
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3 text-xs">
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500 block mb-1">
              Current (Diluted)
            </span>
            <p className="font-semibold text-slate-700 italic">
              {analysisData.diagnosis.currentText}
            </p>
            <span className="text-[11px] text-slate-400 block mt-2">
              Targets everyone ➔ weak incentive for any single buyer to switch.
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-emerald-200 shadow-2xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block mb-1">
              AI Recommended (Sharp Focus)
            </span>
            <p className="font-bold text-slate-900">
              {analysisData.diagnosis.recommendedText}
            </p>
            <span className="text-[11px] text-emerald-700 font-medium block mt-2">
              Specific audience + clear functional benefit + higher willingness to pay.
            </span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <span className="font-extrabold text-slate-800">WHY? </span>
            <span className="text-slate-600">{analysisData.diagnosis.why}</span>
          </div>
          {!isSharpened && (
            <button
              onClick={() => setIsSharpened(true)}
              className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold shrink-0 transition-colors shadow-2xs cursor-pointer"
            >
              <span>Apply Recommended →</span>
            </button>
          )}
        </div>
      </div>

      {/* 3. Ideal Customer Profile (ICP) Persona Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400 block">
                Target Persona
              </span>
              <h3 className="text-lg font-black text-slate-900">
                Your Ideal Customer Profile (ICP)
              </h3>
            </div>
          </div>
          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            High-Value Segment
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs">
          {/* Persona Header Pill & Details */}
          <div className="lg:col-span-1 p-5 rounded-2xl bg-slate-50 border border-slate-200/70 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-full bg-brand-600 text-white font-black text-lg flex items-center justify-center mb-3 shadow-xs">
                AP
              </div>
              <h4 className="font-extrabold text-slate-900 text-sm">
                {analysisData.idealCustomer.title}
              </h4>
              <p className="text-[11px] text-slate-500 mb-4">
                {analysisData.idealCustomer.tagline}
              </p>

              <div className="space-y-2 pt-3 border-t border-slate-200/60">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-medium">Age Bracket:</span>
                  <span className="font-bold text-slate-800">{analysisData.idealCustomer.age}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-medium">Income Level:</span>
                  <span className="font-bold text-slate-800">{analysisData.idealCustomer.income}</span>
                </div>
                <div className="flex items-start justify-between">
                  <span className="text-slate-400 font-medium">Geography:</span>
                  <span className="font-bold text-slate-800 text-right max-w-[140px] truncate" title={analysisData.idealCustomer.location}>
                    {analysisData.idealCustomer.location}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200/60">
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1.5">
                Core Interests:
              </span>
              <div className="flex flex-wrap gap-1">
                {analysisData.idealCustomer.interests.map((interest, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] font-semibold text-slate-700">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Pain Points & Motivations */}
          <div className="lg:col-span-2 space-y-4">
            <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200/70">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-700 block mb-1">
                Primary Everyday Pain Point
              </span>
              <p className="font-semibold text-slate-800 text-xs sm:text-sm">
                "{analysisData.idealCustomer.primaryPainPoint}"
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/70">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 block mb-1">
                Buying Motivation & Trigger
              </span>
              <p className="font-semibold text-slate-800 text-xs sm:text-sm">
                "{analysisData.idealCustomer.buyingMotivation}"
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Best Discovery Channels
                </span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {analysisData.idealCustomer.preferredChannels.map((ch, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-white text-slate-800 font-bold text-[11px] border border-slate-200 shadow-2xs">
                      {ch}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setCurrentView('launch-reels')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shrink-0 transition-colors shadow-xs cursor-pointer"
              >
                <Video className="w-3.5 h-3.5" />
                <span>Launch Reel for ICP →</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Value Proposition Generator */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-100">
          <div>
            <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400 block">
              Offer Statement
            </span>
            <h3 className="text-lg font-black text-slate-900">
              Your New Value Proposition
            </h3>
          </div>

          {/* Tone Selector Chips */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            {[
              { id: 'original', label: 'Standard' },
              { id: 'shorter', label: 'Shorter' },
              { id: 'premium', label: 'Premium' },
              { id: 'casual', label: 'Casual' }
            ].map((tone) => (
              <button
                key={tone.id}
                onClick={() => setActiveTone(tone.id)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTone === tone.id
                    ? 'bg-white text-brand-700 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {tone.label}
              </button>
            ))}
          </div>
        </div>

        {/* Display Box */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-brand-50/50 via-emerald-50/30 to-slate-50 border border-brand-200/70 relative group">
          <p className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed pr-10">
            "{currentVpText}"
          </p>

          <div className="mt-4 pt-3 border-t border-brand-200/50 flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500">
              Tone: <strong className="capitalize text-brand-700">{activeTone}</strong> • Ready for website headline & packaging
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => copyToClipboard(currentVpText, 'vp')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold border border-slate-200 shadow-2xs transition-colors cursor-pointer"
              >
                {copiedKey === 'vp' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                <span>{copiedKey === 'vp' ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Structured Positioning Statement Framework */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
          <div>
            <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400 block">
              Strategic Foundation
            </span>
            <h3 className="text-lg font-black text-slate-900">
              Structured Positioning Statement
            </h3>
          </div>
          <button
            onClick={() => {
              const fullStatement = `FOR: ${analysisData.positioningStatement.for}\nWHO: ${analysisData.positioningStatement.who}\nOUR BRAND: ${analysisData.positioningStatement.ourBrand}\nIS: ${analysisData.positioningStatement.is}\nTHAT: ${analysisData.positioningStatement.that}\nUNLIKE: ${analysisData.positioningStatement.unlike}\nBECAUSE: ${analysisData.positioningStatement.because}`;
              copyToClipboard(fullStatement, 'full-pos');
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 transition-colors cursor-pointer"
          >
            {copiedKey === 'full-pos' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
            <span>Copy Framework</span>
          </button>
        </div>

        <div className="space-y-2.5 text-xs font-medium">
          {[
            { tag: 'FOR', content: analysisData.positioningStatement.for, bg: 'bg-indigo-50/70 text-indigo-900' },
            { tag: 'WHO', content: analysisData.positioningStatement.who, bg: 'bg-slate-50 text-slate-800' },
            { tag: 'OUR BRAND', content: analysisData.positioningStatement.ourBrand, bg: 'bg-brand-50 text-brand-900 font-extrabold' },
            { tag: 'IS', content: analysisData.positioningStatement.is, bg: 'bg-slate-50 text-slate-800' },
            { tag: 'THAT', content: analysisData.positioningStatement.that, bg: 'bg-emerald-50/70 text-emerald-900 font-bold' },
            { tag: 'UNLIKE', content: analysisData.positioningStatement.unlike, bg: 'bg-rose-50/60 text-rose-900' },
            { tag: 'BECAUSE', content: analysisData.positioningStatement.because, bg: 'bg-amber-50/60 text-amber-900' }
          ].map((item, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border border-slate-200/70 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 ${item.bg}`}
            >
              <span className="w-28 text-[11px] font-black tracking-wider uppercase text-slate-500 shrink-0">
                {item.tag}:
              </span>
              <span className="flex-1 text-slate-800 font-semibold leading-relaxed">
                {item.content}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Brand Messaging Framework */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="mb-6 pb-4 border-b border-slate-100">
          <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400 block">
            Communication Blueprint
          </span>
          <h3 className="text-lg font-black text-slate-900">
            Brand Messaging Framework
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-2xl bg-brand-50/60 border border-brand-200/70">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-700 block mb-1">
              Brand Promise
            </span>
            <p className="font-extrabold text-slate-900 text-sm">
              "{analysisData.messagingFramework.promise}"
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block mb-1.5">
              Brand Personality
            </span>
            <div className="flex flex-wrap gap-1">
              {analysisData.messagingFramework.personality.map((p, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded bg-white text-[11px] font-bold text-slate-700 border border-slate-200">
                  {p}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block mb-1.5">
              Tone of Voice
            </span>
            <div className="flex flex-wrap gap-1">
              {analysisData.messagingFramework.tone.map((t, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded bg-white text-[11px] font-bold text-slate-700 border border-slate-200">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 4 Core Messaging Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {analysisData.messagingFramework.pillars.map((pillar, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70">
              <span className="text-[10px] font-black text-brand-600 uppercase tracking-wider block mb-1">
                Pillar 0{idx + 1}
              </span>
              <h4 className="font-bold text-slate-900 mb-1">
                {pillar.title}
              </h4>
              <p className="text-slate-500 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        {/* Navigation Bridges */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={onOpenEditProfile}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5 text-slate-400" />
            <span>Edit Brand Profile Input</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentView('roadmap')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
            >
              <Target className="w-3.5 h-3.5 text-slate-500" />
              <span>Create Growth Plan →</span>
            </button>

            <button
              onClick={() => setCurrentView('mentors')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-700 border border-brand-200 text-xs font-bold transition-colors cursor-pointer"
            >
              <Users className="w-3.5 h-3.5 text-brand-600" />
              <span>Find a Mentor →</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
