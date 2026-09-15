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
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useFounder } from '../context/FounderContext';
import ExplainableMatchModal from '../components/ExplainableMatchModal';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import MatchScoreBadge from '../components/ui/MatchScoreBadge';

export default function FundingPage({ setCurrentView }) {
  const { activeFounder, fundingOpportunities } = useFounder();
  const [selectedFundingForExplain, setSelectedFundingForExplain] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedId, setExpandedId] = useState(null);
  const [applicationModal, setApplicationModal] = useState(null);

  const categories = [
    'All',
    'Investors',
    'Grants',
    'Government Schemes',
    'Business Loans',
    'Microfinance'
  ];

  const filteredOpportunities = fundingOpportunities.filter((opp) => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Investors') return opp.category.toLowerCase().includes('angel') || opp.category.toLowerCase().includes('investor') || opp.category.toLowerCase().includes('seed');
    return opp.category.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
      {/* ---------------- Header (Prompt Section 9) ---------------- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <Badge variant="success" size="md" className="mb-1.5">
            Capital Fit Engine (Who can fund me?)
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Funding opportunities that fit your stage.
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Match with subsidized government credit lines, non-dilutive innovation grants, regional angel syndicates, and microfinance facilities.
          </p>
        </div>

        {/* Founder Funding Requirement Pill */}
        <div className="bg-white p-3 px-4 rounded-xl border border-slate-200/80 text-xs text-slate-600 shadow-2xs self-start md:self-auto">
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
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-brand-600 text-white shadow-2xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ---------------- Funding Cards Grid ---------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredOpportunities.map((opp) => {
          const isExpanded = expandedId === opp.id;

          return (
            <div
              key={opp.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-soft flex flex-col justify-between transition-all hover:shadow-md hover:border-brand-200/80"
            >
              <div>
                {/* Header Row: Provider, Opportunity Name, Category, Match Badge */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="min-w-0">
                    <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded mb-1">
                      {opp.category}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 leading-snug truncate">
                      {opp.provider}
                    </h3>
                    <p className="text-xs text-slate-500 truncate">{opp.organization}</p>
                  </div>

                  {/* Match Score Badge */}
                  <div className="text-right shrink-0">
                    <MatchScoreBadge score={opp.matchPercentage} label="MATCH" size="md" />
                    <button
                      onClick={() => toggleExpand(opp.id)}
                      className="flex items-center justify-end gap-1 text-[11px] font-bold text-brand-700 hover:text-brand-800 mt-1.5 ml-auto cursor-pointer"
                    >
                      <span>Why this match?</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Key Specs Matrix */}
                <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50/80 rounded-xl border border-slate-200/70 text-xs mb-4">
                  <div>
                    <span className="text-[10px] uppercase font-extrabold text-slate-400 block">
                      Funding Range
                    </span>
                    <span className="font-extrabold text-slate-900 font-sans">
                      {opp.fundingRange}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-extrabold text-slate-400 block">
                      Capital Type
                    </span>
                    <span className="font-semibold text-slate-700 truncate block">
                      {opp.type}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-extrabold text-slate-400 block">
                      Preferred Stage
                    </span>
                    <span className="font-bold text-emerald-700 truncate block">
                      {(opp.eligibleStages || []).join(', ')}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-extrabold text-slate-400 block">
                      Industry Focus
                    </span>
                    <span className="text-slate-600 truncate block">
                      {(opp.industryScope || []).join(', ')}
                    </span>
                  </div>
                </div>

                {/* Why This Matches You (Prompt Section 9) */}
                <div className="space-y-1.5 mb-4">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                    Why this matches you:
                  </span>
                  {(opp.reasons || []).slice(0, 3).map((reason, i) => (
                    <p key={i} className="text-xs text-slate-700 flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{reason}</span>
                    </p>
                  ))}
                </div>

                {/* Expandable Breakdown Drawer */}
                {isExpanded && (
                  <div className="mb-4 p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2 animate-in fade-in duration-200">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                      Stage & Capital Compatibility Breakdown
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex justify-between p-1.5 bg-white rounded border border-slate-200/60">
                        <span>Stage Fit</span>
                        <strong>28 / 30</strong>
                      </div>
                      <div className="flex justify-between p-1.5 bg-white rounded border border-slate-200/60">
                        <span>Industry Fit</span>
                        <strong>20 / 20</strong>
                      </div>
                      <div className="flex justify-between p-1.5 bg-white rounded border border-slate-200/60">
                        <span>Ticket Size</span>
                        <strong>15 / 15</strong>
                      </div>
                      <div className="flex justify-between p-1.5 bg-white rounded border border-slate-200/60">
                        <span>Location Quota</span>
                        <strong>10 / 15</strong>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer: Deadline & Action */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {opp.deadline}
                </span>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setApplicationModal(opp)}
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Check Eligibility
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ---------------- Eligibility Checklist Dialog ---------------- */}
      {applicationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 p-5 text-white flex justify-between items-center">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                  Eligibility Evaluation
                </span>
                <h3 className="text-base font-bold text-white">{applicationModal.provider}</h3>
              </div>
              <button
                onClick={() => setApplicationModal(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <p className="font-bold">{activeFounder.brandName} is Pre-Qualified!</p>
                  <p className="text-[11px] text-emerald-700">Meets Stage, Sector, and Ticket Size requirements.</p>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-700">
                <p className="font-bold text-slate-900">Required Application Documents:</p>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="accent-brand-600 rounded" />
                    <span>Udyam Aadhar Registration (MSME)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="accent-brand-600 rounded" />
                    <span>FSSAI / Business Registration Certificate</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="accent-brand-600 rounded" />
                    <span>Last 6 Months Current Account Bank Statement</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="accent-brand-600 rounded" />
                    <span>Equipment / Raw Material Procurement Quotation</span>
                  </label>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setApplicationModal(null)}
                >
                  Close
                </Button>
                <a
                  href={applicationModal.actionUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-xs"
                >
                  <span>Open Official Portal</span>
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
