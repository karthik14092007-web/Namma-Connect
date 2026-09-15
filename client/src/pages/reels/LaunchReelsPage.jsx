import React, { useState } from 'react';
import {
  Video,
  Sparkles,
  Plus,
  Play,
  TrendingUp,
  Target,
  Users,
  ShieldCheck,
  CheckCircle2,
  BarChart3,
  Layers,
  Zap,
  ArrowRight,
  Info
} from 'lucide-react';
import { INITIAL_REELS } from '../../data/reelsData';
import { useFounder } from '../../context/FounderContext';
import { useToast } from '../../context/ToastContext';
import ReelsFeed from './ReelsFeed';
import MyReelsView from './MyReelsView';
import CreateReelWizard from './CreateReelWizard';
import ReelAnalyticsModal from './ReelAnalyticsModal';
import ReelDetailModal from './ReelDetailModal';
import SupportFounderModal from './SupportFounderModal';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

export default function LaunchReelsPage() {
  const { activeFounder } = useFounder();
  const { addToast } = useToast();

  // Tab State
  const [activeTab, setActiveTab] = useState('feed'); // 'feed' | 'my-reels'

  // Reels State
  const [reels, setReels] = useState(INITIAL_REELS);

  // Modal States
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [selectedAnalyticsReel, setSelectedAnalyticsReel] = useState(null);
  const [selectedDetailReel, setSelectedDetailReel] = useState(null);
  const [selectedSupportReel, setSelectedSupportReel] = useState(null);

  // Filter founder's own reels
  const myReels = reels.filter(
    (r) => r.founderId === activeFounder.id || r.founderId === 'founder-kavya-1'
  );

  // Handler for new reel creation
  const handleReelCreated = (newReel) => {
    setReels((prev) => [newReel, ...prev]);
  };

  // Handler for opening analytics modal directly
  const handleOpenAnalytics = (reel) => {
    setSelectedAnalyticsReel(reel || myReels[0] || reels[0]);
  };

  // Handler for boost again
  const handleBoostAgain = () => {
    addToast('⚡ Boost renewed! Matched with additional 8,000 regional buyers.');
  };

  // Handler for founder support cheer
  const handleCheerSuccess = (type, message) => {
    addToast('🎉 Support message delivered to founder!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
      {/* ---------------- 1. PAGE HEADER & VALUE PROPOSITION ---------------- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Badge variant="brand" size="md">
              Targeted D2C Video Discovery
            </Badge>
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              Right Product → Right Audience → Right Context
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Promote your product through video. Target the right audience, not just algorithms.
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl leading-relaxed">
            Namma-Connect is not an entertainment app or viral lottery. We help early-stage D2C founders
            serve short-form product videos directly to verified regional consumers, mentors, and buyers who match
            your product category.
          </p>
        </div>

        {/* Primary Action Button */}
        <div className="flex items-center gap-2 shrink-0 self-start md:self-center">
          <Button
            variant="primary"
            size="md"
            onClick={() => setIsWizardOpen(true)}
            className="gap-2 text-xs sm:text-sm font-bold shadow-sm bg-emerald-600 hover:bg-emerald-700"
          >
            <Plus className="w-4 h-4" />
            <span>+ Create Launch Reel</span>
          </Button>
        </div>
      </div>

      {/* ---------------- 2. THREE QUICK METRIC CARDS ---------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Card 1: Reels Published */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 shrink-0">
            <Video className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Reels Published
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-black text-slate-900">{reels.length}</span>
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                Active in Feed
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Relevant Audience Matches */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Audience-Fit Matches
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-black text-emerald-700">91%</span>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                High Synergy
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: Product Views Generated */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Targeted Views Delivered
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-black text-slate-900">8,420</span>
              <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded">
                27 Orders
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- 3. DIFFERENTIATOR CALLOUT BANNER ---------------- */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 rounded-3xl p-6 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-black tracking-wider text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/40">
                The Namma-Connect Difference
              </span>
              <span className="text-xs text-slate-300">Why this is not Instagram</span>
            </div>
            <h3 className="text-base sm:text-lg font-black tracking-tight">
              Instagram viral algorithms require follower bases. Namma-Connect matches your product directly with buyers.
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every reel you upload is scored for audience resonance (e.g. 91% fit) and distributed to people actively looking for healthy food, handloom textiles, or organic daily essentials in your region.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 shrink-0">
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Typical Social</span>
              <span className="text-xs font-bold text-rose-300 block mt-0.5">Vanity Likes</span>
              <span className="text-[10px] text-slate-300 block">Random viral reach</span>
            </div>
            <div className="bg-emerald-900/50 backdrop-blur-md p-3 rounded-2xl border border-emerald-500/30">
              <span className="text-[10px] uppercase font-bold text-emerald-400 block">Launch Reels</span>
              <span className="text-xs font-bold text-emerald-300 block mt-0.5">Direct Orders</span>
              <span className="text-[10px] text-slate-300 block">Targeted buyer fit</span>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- 4. TAB CONTROLS ---------------- */}
      <div className="flex items-center justify-between border-b border-slate-200">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setActiveTab('feed')}
            className={`pb-3.5 text-xs sm:text-sm font-extrabold transition-all border-b-2 cursor-pointer ${
              activeTab === 'feed'
                ? 'border-brand-600 text-brand-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Discovery Feed ({reels.length} Reels)
          </button>

          <button
            onClick={() => setActiveTab('my-reels')}
            className={`pb-3.5 text-xs sm:text-sm font-extrabold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'my-reels'
                ? 'border-brand-600 text-brand-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <span>My Launch Reels</span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              {myReels.length} Active
            </span>
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 pb-3">
          <button
            onClick={() => handleOpenAnalytics(myReels[0])}
            className="text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition-colors cursor-pointer flex items-center gap-1"
          >
            <BarChart3 className="w-3.5 h-3.5 text-slate-500" />
            <span>View Funnel Analytics</span>
          </button>
        </div>
      </div>

      {/* ---------------- 5. TAB CONTENT ---------------- */}
      {activeTab === 'feed' ? (
        <ReelsFeed
          reels={reels}
          onOpenDetail={(reel) => setSelectedDetailReel(reel)}
          onOpenSupport={(reel) => setSelectedSupportReel(reel)}
          onCreateReel={() => setIsWizardOpen(true)}
        />
      ) : (
        <MyReelsView
          reels={myReels}
          onOpenAnalytics={handleOpenAnalytics}
          onCreateReel={() => setIsWizardOpen(true)}
          onOpenDetail={(reel) => setSelectedDetailReel(reel)}
        />
      )}

      {/* ---------------- 6. MODALS ---------------- */}
      {/* 4-Step Create Reel Wizard */}
      <CreateReelWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onReelCreated={handleReelCreated}
        onViewAnalytics={() => {
          setActiveTab('my-reels');
          handleOpenAnalytics(myReels[0] || reels[0]);
        }}
      />

      {/* Detailed Analytics & Funnel Modal */}
      <ReelAnalyticsModal
        reel={selectedAnalyticsReel}
        isOpen={!!selectedAnalyticsReel}
        onClose={() => setSelectedAnalyticsReel(null)}
        onBoostAgain={handleBoostAgain}
      />

      {/* Fullscreen / Detail Modal */}
      <ReelDetailModal
        reel={selectedDetailReel}
        isOpen={!!selectedDetailReel}
        onClose={() => setSelectedDetailReel(null)}
        onOpenSupport={(reel) => {
          setSelectedDetailReel(null);
          setSelectedSupportReel(reel);
        }}
      />

      {/* Direct Founder Cheer / Support Modal */}
      <SupportFounderModal
        reel={selectedSupportReel}
        isOpen={!!selectedSupportReel}
        onClose={() => setSelectedSupportReel(null)}
        onCheerSuccess={handleCheerSuccess}
      />
    </div>
  );
}
