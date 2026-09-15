import React, { useState } from 'react';
import {
  Coins,
  Sparkles,
  CheckCircle2,
  Building,
  ArrowRight,
  ShieldCheck,
  Filter,
  ExternalLink,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { useFounder } from '../context/FounderContext';
import ExplainableMatchModal from '../components/ExplainableMatchModal';

export default function FundingPage({ setCurrentView }) {
  const { activeFounder, fundingOpportunities } = useFounder();
  const [selectedFundingForExplain, setSelectedFundingForExplain] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [applicationModal, setApplicationModal] = useState(null);

  const categories = [
    'All',
    'Government Schemes',
    'Grants & Seed Funds',
    'Grants',
    'Angel Investors',
    'Business Loans'
  ];

  const filteredOpportunities = fundingOpportunities.filter((opp) => {
    return selectedCategory === 'All' || opp.category.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* ---------------- Header ---------------- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            Capital Fit Engine (Who Can Fund Me?)
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Find funding that fits your stage.
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Not all capital is venture equity. Explore subsidized government facilities, non-dilutive innovation grants, regional angel syndicates, and micro-working capital.
          </p>
        </div>

        {/* Founder Funding Requirement Pill */}
        <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs text-slate-600 shadow-2xs self-start md:self-auto">
          <span>Target Requirement: </span>
          <strong className="text-slate-900">{activeFounder.actualFundingRequirement || activeFounder.fundingRequirement}</strong> •{' '}
          <span className="text-emerald-700 font-bold">{activeFounder.businessStage}</span>
        </div>
      </div>

      {/* ---------------- Category Filter Tabs ---------------- */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-brand-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ---------------- Funding Cards Grid ---------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredOpportunities.map((opp) => {
          const isHighFit = opp.matchPercentage >= 85;

          return (
            <div
              key={opp.id}
              className={`bg-white rounded-2xl border p-6 shadow-soft flex flex-col justify-between transition-all hover:shadow-md ${
                isHighFit ? 'border-brand-300 ring-1 ring-brand-400/20' : 'border-slate-200/80'
              }`}
            >
              <div>
                {/* Header Row: Provider, Category & Fit */}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded mb-1">
                      {opp.category}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 leading-tight">
                      {opp.provider}
                    </h3>
                    <p className="text-xs text-slate-500">{opp.organization}</p>
                  </div>

                  {/* Fit Percentage Badge */}
                  <div className="text-right shrink-0">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black font-sans border ${
                        isHighFit
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : 'bg-brand-50 text-brand-800 border-brand-200'
                      }`}
                    >
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                      {opp.matchPercentage}% Fit
                    </span>
                    <button
                      onClick={() => setSelectedFundingForExplain(opp)}
                      className="block text-[10px] text-brand-700 font-bold hover:underline mt-1 text-right"
                    >
                      Why this fit? →
                    </button>
                  </div>
                </div>

                {/* Key Specs */}
                <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50/80 rounded-xl border border-slate-200/60 text-xs mb-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Funding Range
                    </span>
                    <span className="font-extrabold text-slate-900 font-sans">
                      {opp.fundingRange}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Capital Type
                    </span>
                    <span className="font-bold text-slate-700 truncate block">
                      {opp.type}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Preferred Stage
                    </span>
                    <span className="font-semibold text-emerald-700">
                      {(opp.eligibleStages || []).join(', ')}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Target Focus
                    </span>
                    <span className="text-slate-600 truncate block">
                      {opp.targetFocus}
                    </span>
                  </div>
                </div>

                {/* Why Aligned (Bullet Checklist) */}
                <div className="space-y-1.5 mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                    Why Recommended for {activeFounder.brandName}
                  </span>
                  {(opp.reasons || []).map((reason, i) => (
                    <p key={i} className="text-xs text-slate-700 flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{reason}</span>
                    </p>
                  ))}
                </div>
              </div>

              {/* Card Footer: Deadline & Action */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {opp.deadline}
                </span>

                <button
                  onClick={() => setApplicationModal(opp)}
                  className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Check Eligibility</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ---------------- Explainable Match Modal ---------------- */}
      <ExplainableMatchModal
        isOpen={!!selectedFundingForExplain}
        onClose={() => setSelectedFundingForExplain(null)}
        entity={selectedFundingForExplain}
        type="funding"
        onPrimaryAction={() => {
          setApplicationModal(selectedFundingForExplain);
          setSelectedFundingForExplain(null);
        }}
      />

      {/* ---------------- Eligibility Checklist Dialog ---------------- */}
      {applicationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-teal-900 to-emerald-900 p-5 text-white flex justify-between items-center">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                  Eligibility Evaluation
                </span>
                <h3 className="text-base font-bold text-white">{applicationModal.provider}</h3>
              </div>
              <button
                onClick={() => setApplicationModal(null)}
                className="text-slate-300 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <p className="font-bold">{activeFounder.brandName} is Pre-Qualified!</p>
                  <p className="text-[11px] text-emerald-700">Matches Stage, Industry, and Ticket Size requirements.</p>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-700">
                <p className="font-bold text-slate-900">Required Documents Docket:</p>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="accent-brand-600" />
                    <span>Udyam Aadhar Registration (MSME)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="accent-brand-600" />
                    <span>FSSAI / Industry Registration Certificate</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="accent-brand-600" />
                    <span>Last 6 Months Current Account Bank Statement</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="accent-brand-600" />
                    <span>Estimated Equipment / Expansion Quotation</span>
                  </label>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setApplicationModal(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600"
                >
                  Close
                </button>
                <a
                  href={applicationModal.actionUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold"
                >
                  <span>Proceed to Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
