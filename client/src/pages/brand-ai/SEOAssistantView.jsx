// client/src/pages/brand-ai/SEOAssistantView.jsx
import React, { useState } from 'react';
import {
  Search,
  Key,
  Copy,
  Check,
  TrendingUp,
  FileText,
  Video,
  ShoppingBag,
  ExternalLink,
  Sparkles,
  ArrowRight,
  Filter,
  Layers,
  HelpCircle,
  Eye,
  MousePointerClick
} from 'lucide-react';
import {
  SEO_KEYWORDS_DATA,
  SEARCH_INTENT_CATEGORIES,
  SEO_CONTENT_IDEAS,
  SEO_PRODUCT_PAGE_DATA
} from '../../services/brandAIService';
import { useToast } from '../../context/ToastContext';

export default function SEOAssistantView({ setCurrentView, onSelectContentIdea }) {
  const { addToast } = useToast();
  const [keywordFilter, setKeywordFilter] = useState('all');
  const [copiedKey, setCopiedKey] = useState(null);

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    addToast('Copied to clipboard!', 'success');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const filteredKeywords = keywordFilter === 'all'
    ? SEO_KEYWORDS_DATA
    : SEO_KEYWORDS_DATA.filter((k) => k.category === keywordFilter);

  const handleCopyAllProductPage = () => {
    const fullText = `PRODUCT TITLE:\n${SEO_PRODUCT_PAGE_DATA.productTitle}\n\nMETA DESCRIPTION:\n${SEO_PRODUCT_PAGE_DATA.metaDescription}\n\nSHORT DESCRIPTION:\n${SEO_PRODUCT_PAGE_DATA.shortDescription}\n\nLONG DESCRIPTION:\n${SEO_PRODUCT_PAGE_DATA.longDescription}\n\nPRIMARY KEYWORD:\n${SEO_PRODUCT_PAGE_DATA.primaryKeyword}\n\nSECONDARY KEYWORDS:\n${SEO_PRODUCT_PAGE_DATA.secondaryKeywords.join(', ')}`;
    copyToClipboard(fullText, 'product-all');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. SEO Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-50 rounded-full blur-3xl -z-10 -mr-20 -mt-20 opacity-60" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                Search Engine Optimization
              </span>
              <span className="text-xs text-slate-400 font-semibold">•</span>
              <span className="text-xs font-bold text-slate-600">Organic Discovery Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Make your brand easier to discover.
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
              Turn your product positioning into search-friendly content, rank for high-intent buyer keywords, and capture organic demand across South India.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/70 shrink-0">
            <div className="text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Tracked Keywords
              </span>
              <span className="text-2xl font-black text-slate-900">
                13
              </span>
            </div>
            <div className="h-8 w-px bg-slate-200" />
            <div className="text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Est. Monthly Search
              </span>
              <span className="text-2xl font-black text-brand-600">
                180K+
              </span>
            </div>
          </div>
        </div>

        {/* Keyword Filter Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-6">
          <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1 rounded-2xl">
            {[
              { id: 'all', label: 'All Keywords (13)' },
              { id: 'primary', label: 'Primary (3)' },
              { id: 'secondary', label: 'Secondary (4)' },
              { id: 'long-tail', label: 'Long-Tail (3)' },
              { id: 'local', label: 'Local TN (3)' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setKeywordFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  keywordFilter === tab.id
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <span className="text-[11px] text-slate-400 font-semibold">
            Showing high-relevance terms with commercial buyer intent
          </span>
        </div>

        {/* Keywords Table */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200/80 text-slate-400 text-[10px] uppercase font-black tracking-wider">
                <th className="py-3 px-3">Keyword</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Search Intent</th>
                <th className="py-3 px-3">Relevance</th>
                <th className="py-3 px-3">Difficulty</th>
                <th className="py-3 px-3">Priority</th>
                <th className="py-3 px-3 text-right">Est. Volume</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredKeywords.map((kw) => (
                <tr key={kw.id} className="hover:bg-slate-50/70 transition-colors group">
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-slate-900 group-hover:text-brand-600 transition-colors">
                        {kw.keyword}
                      </span>
                      <button
                        onClick={() => copyToClipboard(kw.keyword, kw.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-slate-700 transition-opacity"
                        title="Copy keyword"
                      >
                        {copiedKey === kw.id ? (
                          <Check className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-bold text-[10px] uppercase">
                      {kw.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      kw.intent === 'Commercial'
                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                        : kw.intent === 'Transactional'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : kw.intent === 'Local'
                        ? 'bg-indigo-50 text-indigo-800 border-indigo-200'
                        : 'bg-blue-50 text-blue-800 border-blue-200'
                    }`}>
                      {kw.intent}
                    </span>
                  </td>
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-brand-500 rounded-full"
                          style={{ width: `${kw.relevance}%` }}
                        />
                      </div>
                      <span className="font-black text-slate-700">{kw.relevance}%</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 font-semibold text-slate-600">
                    {kw.difficulty}
                  </td>
                  <td className="py-3.5 px-3">
                    <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${
                      kw.priority === 'HIGH'
                        ? 'bg-emerald-100 text-emerald-900'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {kw.priority}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right font-mono font-bold text-slate-700">
                    {kw.volume}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Search Intent Breakdown: "What are people searching for?" */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="mb-6 pb-4 border-b border-slate-100">
          <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400 block">
            Buyer Behavior
          </span>
          <h3 className="text-lg font-black text-slate-900">
            What are people searching for?
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Understanding search intent helps you build the right content for every stage of the customer journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {SEARCH_INTENT_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full border border-brand-200/60 inline-block mb-2">
                  {cat.badge}
                </span>
                <h4 className="font-bold text-slate-900 text-xs mb-1.5">
                  {cat.name}
                </h4>
                <div className="p-2.5 rounded-xl bg-white border border-slate-200/60 mb-3 text-[11px] font-medium text-slate-700 italic">
                  {cat.sampleQuery}
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed mb-3">
                  <strong className="text-slate-700">Why it matters:</strong> {cat.whyItMatters}
                </p>
              </div>

              <div className="pt-2.5 border-t border-slate-200/60 text-[10px] text-brand-800 font-bold">
                → {cat.conversionAction}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. SEO Content Ideas: "Content Opportunities" */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
          <div>
            <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400 block">
              Organic Reach Engine
            </span>
            <h3 className="text-lg font-black text-slate-900">
              Content Opportunities
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              High-performing hooks and formats ready to record as Launch Reels or founder blog posts.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SEO_CONTENT_IDEAS.map((idea) => (
            <div
              key={idea.id}
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between hover:shadow-xs transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-brand-50 text-brand-700 border border-brand-200/60">
                    {idea.primaryKeyword}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400">
                    {idea.estimatedReach}
                  </span>
                </div>

                <h4 className="font-extrabold text-slate-900 text-sm mb-2 leading-snug">
                  {idea.title}
                </h4>

                <div className="p-3 rounded-xl bg-white border border-slate-200/80 mb-3">
                  <span className="text-[10px] font-black uppercase text-amber-600 tracking-wider block mb-1">
                    Opening Hook (First 3s):
                  </span>
                  <p className="text-xs font-semibold text-slate-800 italic">
                    {idea.hook}
                  </p>
                </div>

                <p className="text-[11px] text-slate-500 leading-relaxed mb-4">
                  <strong className="text-slate-700">Outline:</strong> {idea.outline}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400">
                  {idea.suggestedFormat}
                </span>

                <button
                  onClick={() => {
                    if (idea.ctaAction === 'launch-reels') {
                      setCurrentView('launch-reels');
                    } else if (onSelectContentIdea) {
                      onSelectContentIdea(idea);
                    }
                  }}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs shadow-2xs transition-colors cursor-pointer"
                >
                  <Video className="w-3 h-3 text-emerald-200" />
                  <span>Create Content →</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. SEO Product Page Description: "Optimize My Product Page" */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
          <div>
            <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400 block">
              Storefront Optimization
            </span>
            <h3 className="text-lg font-black text-slate-900">
              Optimize My Product Page
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Copy-paste ready meta tags and product copy designed to rank high on Google & D2C marketplaces.
            </p>
          </div>

          <button
            onClick={handleCopyAllProductPage}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer shrink-0"
          >
            {copiedKey === 'product-all' ? (
              <Check className="w-3.5 h-3.5 text-emerald-200" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            <span>{copiedKey === 'product-all' ? 'All Copied!' : 'Copy All Copy'}</span>
          </button>
        </div>

        <div className="space-y-4 text-xs">
          {/* SEO Title */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                SEO-Friendly Product Title (H1)
              </span>
              <button
                onClick={() => copyToClipboard(SEO_PRODUCT_PAGE_DATA.productTitle, 'p-title')}
                className="text-slate-400 hover:text-slate-700 font-bold inline-flex items-center gap-1"
              >
                {copiedKey === 'p-title' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copiedKey === 'p-title' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <p className="font-extrabold text-slate-900 text-sm">
              {SEO_PRODUCT_PAGE_DATA.productTitle}
            </p>
          </div>

          {/* Meta Description */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Search Engine Meta Description (155 Characters)
              </span>
              <button
                onClick={() => copyToClipboard(SEO_PRODUCT_PAGE_DATA.metaDescription, 'p-meta')}
                className="text-slate-400 hover:text-slate-700 font-bold inline-flex items-center gap-1"
              >
                {copiedKey === 'p-meta' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copiedKey === 'p-meta' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <p className="font-semibold text-slate-800">
              {SEO_PRODUCT_PAGE_DATA.metaDescription}
            </p>
          </div>

          {/* Short & Long Description Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Short Product Description (Above the fold)
                  </span>
                  <button
                    onClick={() => copyToClipboard(SEO_PRODUCT_PAGE_DATA.shortDescription, 'p-short')}
                    className="text-slate-400 hover:text-slate-700 font-bold inline-flex items-center gap-1"
                  >
                    {copiedKey === 'p-short' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === 'p-short' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <p className="font-medium text-slate-700 leading-relaxed">
                  {SEO_PRODUCT_PAGE_DATA.shortDescription}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-200/60 text-[10px] text-slate-400">
                Optimized for quick mobile checkout skimming
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Long SEO Description (Bullet Features)
                  </span>
                  <button
                    onClick={() => copyToClipboard(SEO_PRODUCT_PAGE_DATA.longDescription, 'p-long')}
                    className="text-slate-400 hover:text-slate-700 font-bold inline-flex items-center gap-1"
                  >
                    {copiedKey === 'p-long' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === 'p-long' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="font-sans font-medium text-slate-700 whitespace-pre-line leading-relaxed text-xs">
                  {SEO_PRODUCT_PAGE_DATA.longDescription}
                </pre>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-200/60 text-[10px] text-slate-400">
                Structured for Google rich snippets & customer trust
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
