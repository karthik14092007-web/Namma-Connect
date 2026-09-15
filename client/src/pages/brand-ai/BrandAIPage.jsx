// client/src/pages/brand-ai/BrandAIPage.jsx
import React, { useState } from 'react';
import {
  Sparkles,
  Compass,
  Search,
  Scale,
  MessageSquare,
  Edit3,
  RotateCcw,
  Zap,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Video
} from 'lucide-react';
import { useFounder } from '../../context/FounderContext';
import { useToast } from '../../context/ToastContext';
import BrandProfileForm from './BrandProfileForm';
import BrandPositioningView from './BrandPositioningView';
import SEOAssistantView from './SEOAssistantView';
import CompetitorView from './CompetitorView';
import BrandAIChatbot from './BrandAIChatbot';
import {
  DEFAULT_BRAND_PROFILE,
  INITIAL_POSITIONING_ANALYSIS,
  IMPROVED_POSITIONING_ANALYSIS
} from '../../services/brandAIService';

export default function BrandAIPage({ setCurrentView }) {
  const { activeFounder } = useFounder();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState('positioning'); // 'positioning' | 'seo' | 'competitors'
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSharpened, setIsSharpened] = useState(false);

  const [brandProfile, setBrandProfile] = useState({
    brandName: activeFounder?.brandName || DEFAULT_BRAND_PROFILE.brandName,
    productName: activeFounder?.productDescription || DEFAULT_BRAND_PROFILE.productName,
    category: activeFounder?.category || DEFAULT_BRAND_PROFILE.category,
    currentDescription: DEFAULT_BRAND_PROFILE.currentDescription,
    targetCustomer: DEFAULT_BRAND_PROFILE.targetCustomer,
    location: activeFounder?.location || DEFAULT_BRAND_PROFILE.location,
    priceRange: DEFAULT_BRAND_PROFILE.priceRange,
    usp: DEFAULT_BRAND_PROFILE.usp,
    competitors: DEFAULT_BRAND_PROFILE.competitors,
    websiteUrl: DEFAULT_BRAND_PROFILE.websiteUrl,
    marketingChallenge: DEFAULT_BRAND_PROFILE.marketingChallenge
  });

  const currentAnalysis = isSharpened ? IMPROVED_POSITIONING_ANALYSIS : INITIAL_POSITIONING_ANALYSIS;

  const handleSaveAndAnalyze = (newProfile) => {
    setBrandProfile(newProfile);
    setIsSharpened(true);
    addToast(`Brand analysis completed for ${newProfile.brandName}!`, 'success');
  };

  const handleApplyPositioning = () => {
    setIsSharpened(true);
    addToast('Sharper positioning applied! Score increased to 84/100.', 'success');
  };

  return (
    <div className="space-y-6 pb-16">
      {/* 1. Page Hero Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-50 rounded-full blur-3xl -z-10 -mr-20 -mt-20 opacity-70" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 text-xs font-black tracking-wider uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              <span>AI Brand Strategist • V1</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Meet your AI Brand Strategist.
            </h1>

            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl leading-relaxed">
              Build sharper positioning, discover the right keywords, and make your brand easier to understand — without needing a marketing degree.
            </p>
          </div>

          {/* Quick Actions & Profile Meta */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5 text-slate-500" />
              <span>Brand Profile Context</span>
            </button>

            <button
              onClick={() => setIsSharpened(!isSharpened)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-extrabold shadow-xs transition-all cursor-pointer ${
                isSharpened
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'bg-brand-600 text-white hover:bg-brand-700'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-emerald-200" />
              <span>
                {isSharpened ? '✓ Positioned (84/100)' : '⚡ Sharpen Positioning (84/100)'}
              </span>
            </button>
          </div>
        </div>

        {/* Mode Navigation Tabs */}
        <div className="flex items-center gap-2 mt-8 pt-6 border-t border-slate-100 overflow-x-auto scrollbar-none">
          {[
            { id: 'positioning', label: 'Brand Positioning', icon: Compass, count: '68 → 84' },
            { id: 'seo', label: 'SEO Assistant', icon: Search, count: '13 Keywords' },
            { id: 'competitors', label: 'Competitor Matrix', icon: Scale, count: '3 Brands' }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-300' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                  isActive ? 'bg-slate-800 text-emerald-300' : 'bg-slate-200/70 text-slate-600'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Main Two-Column Responsive Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT WORKSPACE (65% on Desktop - 8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {activeTab === 'positioning' && (
            <BrandPositioningView
              brandProfile={brandProfile}
              analysisData={currentAnalysis}
              isSharpened={isSharpened}
              setIsSharpened={setIsSharpened}
              onOpenEditProfile={() => setIsProfileModalOpen(true)}
              setCurrentView={setCurrentView}
            />
          )}

          {activeTab === 'seo' && (
            <SEOAssistantView
              setCurrentView={setCurrentView}
              onSelectContentIdea={(idea) => {
                if (idea.ctaAction === 'launch-reels') {
                  setCurrentView('launch-reels');
                }
              }}
            />
          )}

          {activeTab === 'competitors' && (
            <CompetitorView
              setCurrentView={setCurrentView}
            />
          )}
        </div>

        {/* RIGHT STRATEGIST CHATBOT (35% on Desktop - 4 cols, Persistent) */}
        <div className="lg:col-span-4 lg:sticky lg:top-20">
          <BrandAIChatbot
            setCurrentView={setCurrentView}
            onApplyPositioning={handleApplyPositioning}
            onSwitchTab={(tab) => setActiveTab(tab)}
          />
        </div>
      </div>

      {/* 3. Brand Profile Form Modal */}
      <BrandProfileForm
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        currentProfile={brandProfile}
        onSaveAndAnalyze={handleSaveAndAnalyze}
      />
    </div>
  );
}
