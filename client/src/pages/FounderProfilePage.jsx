import React from 'react';
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  MapPin,
  Globe,
  Instagram,
  Star,
  ShoppingBag,
  TrendingUp,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useFounder } from '../context/FounderContext';

export default function FounderProfilePage({ setCurrentView }) {
  const { activeFounder, products } = useFounder();

  const founderProducts = products.filter(
    (p) =>
      p.founderName?.toLowerCase() === activeFounder.founderName?.toLowerCase() ||
      p.brand?.toLowerCase() === activeFounder.brandName?.toLowerCase()
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* ---------------- Profile Header Banner ---------------- */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-soft overflow-hidden">
        {/* Cover Header */}
        <div className="h-36 bg-gradient-to-r from-teal-900 via-teal-800 to-emerald-900 relative">
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/30 text-emerald-300 text-xs font-bold border border-emerald-400/40 backdrop-blur-xs">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Founder
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/30 text-amber-300 text-xs font-bold border border-amber-400/40 backdrop-blur-xs">
              <Award className="w-3.5 h-3.5" />
              Proof of Work
            </span>
          </div>
        </div>

        {/* Profile Info Row */}
        <div className="px-6 pb-6 pt-0 relative sm:flex items-end justify-between gap-6">
          <div className="sm:flex items-end gap-5 -mt-12">
            <div className="w-24 h-24 rounded-2xl bg-white p-1 shadow-md border border-slate-200">
              <div className="w-full h-full rounded-xl bg-brand-700 text-white flex items-center justify-center text-3xl font-black font-sans shadow-inner">
                {activeFounder.founderName ? activeFounder.founderName[0] : 'K'}
              </div>
            </div>
            <div className="mt-3 sm:mt-0">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-slate-900">
                  {activeFounder.founderName}
                </h1>
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Founder at <strong className="text-slate-800">{activeFounder.brandName}</strong> • {activeFounder.industry}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {activeFounder.location}
                </span>
                <span>•</span>
                <span className="font-semibold text-emerald-700">
                  Stage: {activeFounder.businessStage}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 sm:mt-0 flex items-center gap-2">
            <button
              onClick={() => setCurrentView('roadmap')}
              className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
            >
              View Growth Plan
            </button>
            <button
              onClick={() => setCurrentView('mentors')}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
            >
              Find Mentor Match
            </button>
          </div>
        </div>
      </div>

      {/* ---------------- 2 Columns: Story & Proof of Work ---------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 cols: Brand Story & Products */}
        <div className="lg:col-span-8 space-y-6">
          {/* Brand Story */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft p-6 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              The Brand Story
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              {activeFounder.brandStory}
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <span className="bg-slate-100 px-3 py-1 rounded-lg text-slate-600">
                Primary Market: <strong>{activeFounder.primaryMarket}</strong>
              </span>
              <span className="bg-slate-100 px-3 py-1 rounded-lg text-slate-600">
                Model: <strong>{activeFounder.businessModel}</strong>
              </span>
            </div>
          </div>

          {/* Products by this founder */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Showcase Products ({founderProducts.length || 1})
              </h2>
              <button
                onClick={() => setCurrentView('marketplace')}
                className="text-xs font-bold text-brand-700 hover:underline"
              >
                Go to Marketplace →
              </button>
            </div>

            <div className="space-y-3">
              {(founderProducts.length > 0 ? founderProducts : products.slice(0, 1)).map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-200/80 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-14 h-14 rounded-xl object-cover border border-slate-200"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{p.name}</h4>
                      <p className="text-[11px] text-slate-500">{p.unit} • ₹{p.price}</p>
                      <div className="flex items-center gap-1 text-[11px] text-amber-500 font-bold mt-0.5">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{p.rating} ({p.reviewCount} reviews)</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setCurrentView('marketplace')}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Reviews */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft p-6 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Recent Customer Reviews (Proof of Demand)
            </h2>
            <div className="space-y-3">
              {[
                {
                  author: 'Dr. Meera Swaminathan',
                  city: 'Chennai',
                  text: 'The spiced ragi clusters are by far the cleanest snack we’ve bought. High crunch and zero oily aftertaste. Regular pantry essential now!',
                  rating: 5
                },
                {
                  author: 'Karthik Raja',
                  city: 'Bengaluru',
                  text: 'Great to see authentic Madurai millets packaged so well. Re-ordered 3 family packs last week.',
                  rating: 5
                }
              ].map((rev, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{rev.author} ({rev.city})</span>
                    <div className="flex text-amber-400">
                      {[...Array(rev.rating)].map((_, idx) => (
                        <Star key={idx} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-600 italic">"{rev.text}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 4 cols: Proof of Work & Certifications */}
        <div className="lg:col-span-4 space-y-6">
          {/* Growth Score Badge Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft p-5 text-center space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Verified Brand Growth Score
            </span>
            <div className="text-3xl font-extrabold text-slate-900 font-sans">
              {activeFounder.growthScore} / 100
            </div>
            <span className="inline-block text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              {activeFounder.scoreStatus}
            </span>
            <p className="text-[11px] text-slate-500 pt-1">
              Top gap: <strong className="text-amber-700">{activeFounder.topGaps?.[0]?.dimension}</strong>
            </p>
          </div>

          {/* Certifications & Compliance */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft p-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Certifications & Badges
            </h3>
            <div className="space-y-2">
              {(activeFounder.certifications || [
                'FSSAI Certified',
                '100% Roasted Not Fried',
                'Locally Sourced Millets'
              ]).map((cert, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{cert}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements & Traction Milestones */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft p-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Verified Proof of Work
            </h3>
            <div className="space-y-2.5">
              {(activeFounder.achievements || [
                'Over 12,000 packs sold across South India',
                'Selected for Madurai Agri-Tech Showcase 2025',
                '4.9/5 customer satisfaction rating across 450+ reviews'
              ]).map((ach, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                  <Award className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>{ach}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
