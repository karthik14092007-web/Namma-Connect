import React, { useState } from 'react';
import { Sparkles, Filter, Play, CheckCircle2, TrendingUp, Search } from 'lucide-react';
import ReelCard from './ReelCard';

export default function ReelsFeed({
  reels = [],
  onOpenDetail,
  onOpenSupport,
  onCreateReel
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Healthy Snacks', 'Agri-Tech', 'Handloom & Craft'];

  const filteredReels = reels.filter((reel) => {
    const matchesCategory =
      selectedCategory === 'All' || reel.category === selectedCategory;
    const matchesSearch =
      reel.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reel.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reel.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reel.product?.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Category Pills & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Discovery Context Note & Search */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products or brands..."
              className="w-full pl-8 pr-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
            />
          </div>
        </div>
      </div>

      {/* Discovery Philosophy Sub-Banner */}
      <div className="p-3.5 bg-gradient-to-r from-emerald-50 via-teal-50 to-slate-50 rounded-2xl border border-emerald-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-extrabold text-slate-900 block leading-tight">
              Targeted Discovery Feed (No Virality Guesswork)
            </span>
            <span className="text-[11px] text-slate-600 block">
              Reels are served directly to regional buyers matching product categories, dietary preferences, and local origin.
            </span>
          </div>
        </div>

        <button
          onClick={onCreateReel}
          className="self-start sm:self-auto text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-100 hover:bg-emerald-200 px-3 py-1.5 rounded-xl border border-emerald-300 transition-colors shrink-0 cursor-pointer"
        >
          + Promote Your Product
        </button>
      </div>

      {/* 9:16 Vertical Video Cards Grid */}
      {filteredReels.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
          {filteredReels.map((reel) => (
            <ReelCard
              key={reel.id}
              reel={reel}
              onOpenDetail={onOpenDetail}
              onOpenSupport={onOpenSupport}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300 p-8 space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Filter className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-slate-800">No reels found in this category</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try switching to another category or be the first founder to publish a reel in{' '}
            <span className="font-bold text-slate-700">{selectedCategory}</span>.
          </p>
          <button
            onClick={() => setSelectedCategory('All')}
            className="text-xs font-bold text-brand-600 hover:underline cursor-pointer"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
