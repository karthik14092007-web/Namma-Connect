// client/src/pages/brand-ai/CompetitorView.jsx
import React, { useState } from 'react';
import {
  ShieldAlert,
  Sparkles,
  Award,
  TrendingUp,
  Target,
  Plus,
  X,
  Compass,
  ArrowRight,
  Layers,
  ShoppingBag
} from 'lucide-react';
import { COMPETITOR_COMPARISON_DATA } from '../../services/brandAIService';

export default function CompetitorView({ setCurrentView }) {
  const [competitors, setCompetitors] = useState(COMPETITOR_COMPARISON_DATA.competitors);
  const [newCompetitorName, setNewCompetitorName] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddCompetitor = (e) => {
    e.preventDefault();
    if (!newCompetitorName.trim() || competitors.length >= 4) return;

    setCompetitors([
      ...competitors,
      {
        name: newCompetitorName.trim(),
        isUser: false,
        targetAudience: 'Local / Regional snackers',
        corePromise: 'Convenient snacking option',
        pricePosition: '₹150 – ₹300',
        brandTone: 'Commercial, standard retail',
        keyDifferentiator: 'Traditional offline retail network',
        seoFocus: 'Local snacks, packaged sweets'
      }
    ]);
    setNewCompetitorName('');
    setIsAdding(false);
  };

  const handleRemoveCompetitor = (idx) => {
    if (competitors[idx].isUser) return;
    setCompetitors(competitors.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-50 rounded-full blur-3xl -z-10 -mr-20 -mt-20 opacity-60" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                Market Intelligence
              </span>
              <span className="text-xs text-slate-400 font-semibold">•</span>
              <span className="text-xs font-bold text-slate-600">Competitive Moat Analysis</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Compare Your Brand Positioning
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
              Identify white-space positioning opportunities against mass industrial snacks and imported luxury health bars.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {!isAdding && competitors.length < 4 && (
              <button
                onClick={() => setIsAdding(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Competitor</span>
              </button>
            )}
          </div>
        </div>

        {/* Add Competitor Inline Box */}
        {isAdding && (
          <form onSubmit={handleAddCompetitor} className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
            <input
              type="text"
              autoFocus
              value={newCompetitorName}
              onChange={(e) => setNewCompetitorName(e.target.value)}
              placeholder="Competitor brand name (e.g. Too Yumm, Farmley)..."
              className="flex-1 px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs cursor-pointer"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-3 py-2 rounded-xl text-slate-500 hover:bg-slate-200 text-xs font-bold cursor-pointer"
            >
              Cancel
            </button>
          </form>
        )}

        {/* Competitor Comparison Matrix Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse min-w-[650px]">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-black uppercase text-slate-400">
                <th className="py-3 px-4 w-40">Dimension</th>
                {competitors.map((comp, idx) => (
                  <th
                    key={idx}
                    className={`py-3 px-4 ${
                      comp.isUser
                        ? 'bg-brand-50/70 text-brand-900 border-x border-brand-200/80 rounded-t-2xl'
                        : 'text-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-extrabold text-xs block truncate">
                        {comp.name}
                      </span>
                      {!comp.isUser && (
                        <button
                          onClick={() => handleRemoveCompetitor(idx)}
                          className="text-slate-400 hover:text-rose-500 p-1 rounded"
                          title="Remove competitor"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {/* Target Audience */}
              <tr className="hover:bg-slate-50/50">
                <td className="py-3.5 px-4 font-bold text-slate-400 uppercase text-[10px]">
                  Target Audience
                </td>
                {competitors.map((c, i) => (
                  <td key={i} className={`py-3.5 px-4 ${c.isUser ? 'bg-brand-50/40 border-x border-brand-200/50 font-semibold text-slate-900' : 'text-slate-600'}`}>
                    {c.targetAudience}
                  </td>
                ))}
              </tr>

              {/* Core Promise */}
              <tr className="hover:bg-slate-50/50">
                <td className="py-3.5 px-4 font-bold text-slate-400 uppercase text-[10px]">
                  Core Promise
                </td>
                {competitors.map((c, i) => (
                  <td key={i} className={`py-3.5 px-4 ${c.isUser ? 'bg-brand-50/40 border-x border-brand-200/50 font-bold text-slate-900' : 'text-slate-600'}`}>
                    {c.corePromise}
                  </td>
                ))}
              </tr>

              {/* Price Position */}
              <tr className="hover:bg-slate-50/50">
                <td className="py-3.5 px-4 font-bold text-slate-400 uppercase text-[10px]">
                  Price Position
                </td>
                {competitors.map((c, i) => (
                  <td key={i} className={`py-3.5 px-4 ${c.isUser ? 'bg-brand-50/40 border-x border-brand-200/50 font-bold text-brand-700' : 'text-slate-700 font-semibold'}`}>
                    {c.pricePosition}
                  </td>
                ))}
              </tr>

              {/* Brand Tone */}
              <tr className="hover:bg-slate-50/50">
                <td className="py-3.5 px-4 font-bold text-slate-400 uppercase text-[10px]">
                  Brand Tone
                </td>
                {competitors.map((c, i) => (
                  <td key={i} className={`py-3.5 px-4 ${c.isUser ? 'bg-brand-50/40 border-x border-brand-200/50 text-slate-800' : 'text-slate-500'}`}>
                    {c.brandTone}
                  </td>
                ))}
              </tr>

              {/* Key Differentiator */}
              <tr className="hover:bg-slate-50/50">
                <td className="py-3.5 px-4 font-bold text-slate-400 uppercase text-[10px]">
                  Key Differentiator
                </td>
                {competitors.map((c, i) => (
                  <td key={i} className={`py-3.5 px-4 ${c.isUser ? 'bg-brand-50/40 border-x border-brand-200/50 font-extrabold text-emerald-800' : 'text-slate-600'}`}>
                    {c.keyDifferentiator}
                  </td>
                ))}
              </tr>

              {/* SEO Focus */}
              <tr className="hover:bg-slate-50/50">
                <td className="py-3.5 px-4 font-bold text-slate-400 uppercase text-[10px]">
                  SEO Focus
                </td>
                {competitors.map((c, i) => (
                  <td key={i} className={`py-3.5 px-4 ${c.isUser ? 'bg-brand-50/40 border-x border-brand-200/50 font-medium text-slate-800' : 'text-slate-500'}`}>
                    {c.seoFocus}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Strategic Positioning Opportunity Highlight */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-brand-500/10 to-indigo-500/10 border border-emerald-200/80">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Sparkles className="w-5 h-5 text-emerald-200" />
          </div>
          <div className="flex-1">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-emerald-800">
              Strategic White Space Opportunity
            </span>
            <h3 className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
              {COMPETITOR_COMPARISON_DATA.strategicOpportunity.title}
            </h3>
            <p className="text-xs text-slate-700 mt-1.5 leading-relaxed">
              {COMPETITOR_COMPARISON_DATA.strategicOpportunity.description}
            </p>

            <div className="mt-4 pt-3 border-t border-emerald-200/60 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-slate-600 font-semibold">
                Recommendation: Lead with <strong>"Zero Palm Oil + Ancient Tamil Millets"</strong> across your next Reel campaign.
              </span>
              <button
                onClick={() => setCurrentView('launch-reels')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold shadow-xs cursor-pointer"
              >
                <span>Launch Competitive Reel →</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
