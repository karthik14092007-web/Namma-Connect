import React, { useState, useRef } from 'react';
import {
  X,
  Upload,
  Video,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  DollarSign,
  Users,
  Target,
  ShieldCheck,
  Zap,
  HelpCircle,
  Eye,
  AlertCircle
} from 'lucide-react';
import {
  TARGET_LOCATIONS,
  TARGET_AGE_GROUPS,
  TARGET_INTERESTS,
  TARGET_CUSTOMER_TYPES,
  GOAL_OPTIONS,
  CTA_OPTIONS,
  calculateAudienceFit
} from '../../data/reelsData';
import { useFounder } from '../../context/FounderContext';
import { useToast } from '../../context/ToastContext';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

export default function CreateReelWizard({ isOpen, onClose, onReelCreated, onViewAnalytics }) {
  const { activeFounder, products } = useFounder();
  const { addToast } = useToast();
  const fileInputRef = useRef(null);

  const [step, setStep] = useState(1); // 1: Upload, 2: Positioning, 3: Audience, 4: Fit & Launch, 5: Success

  // Form State
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState(
    'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-bowl-of-healthy-salad-41484-large.mp4'
  );
  const [title, setTitle] = useState('A Healthier Crunch is Here: Roasted Millets with Zero Palm Oil!');
  const [description, setDescription] = useState(
    '100% slow-roasted foxtail and ragi millet crunch seasoned with Salem curry leaves and black pepper. Zero palm oil, no artificial flavors.'
  );
  const [selectedProductId, setSelectedProductId] = useState('prod-millet-crunch');
  const [goal, setGoal] = useState('Product Launch');
  const [cta, setCta] = useState('Buy Product');

  // Audience Targeting State
  const [selectedLocations, setSelectedLocations] = useState([
    'Madurai & Southern TN',
    'Chennai Metro & Suburbs'
  ]);
  const [selectedAges, setSelectedAges] = useState([
    '25–34 (Young Professionals & Parents)',
    '35–44 (Families & Established Buyers)'
  ]);
  const [selectedInterests, setSelectedInterests] = useState([
    'Healthy Eating & Millets',
    'Clean Ingredients & No Preservatives'
  ]);
  const [selectedCustomerTypes, setSelectedCustomerTypes] = useState([
    'Health-conscious Parents'
  ]);

  // AI Assist / Suggestion State
  const [suggestionApplied, setSuggestionApplied] = useState(false);
  const [showAssistModal, setShowAssistModal] = useState(false);

  // Budget & Launch State
  const [budgetTier, setBudgetTier] = useState(500); // 0 | 500 | 1500
  const [durationDays, setDurationDays] = useState(7);
  const [isLaunching, setIsLaunching] = useState(false);
  const [launchedCampaignId, setLaunchedCampaignId] = useState('LR-2025-8842');

  if (!isOpen) return null;

  // Handle local video upload
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setVideoPreviewUrl(url);
      addToast(`🎥 Video uploaded: ${file.name}`);
    }
  };

  // Toggle selection helper
  const toggleItem = (list, setList, item) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  // Live Audience Fit Calculation
  const fitResult = calculateAudienceFit({
    category: activeFounder?.productCategory || 'Healthy Snacks',
    locations: selectedLocations,
    ageGroups: selectedAges,
    interests: selectedInterests,
    customerTypes: selectedCustomerTypes,
    hasParentsInterest: suggestionApplied
  });

  // Apply AI Suggestion
  const handleApplySuggestion = () => {
    setSuggestionApplied(true);
    if (!selectedInterests.includes('Healthy Eating & Millets')) {
      setSelectedInterests((prev) => [...prev, 'Healthy Eating & Millets']);
    }
    if (!selectedCustomerTypes.includes('Health-conscious Parents')) {
      setSelectedCustomerTypes((prev) => [...prev, 'Health-conscious Parents']);
    }
    if (!selectedCustomerTypes.includes('Busy Urban Professionals')) {
      setSelectedCustomerTypes((prev) => [...prev, 'Busy Urban Professionals']);
    }
    addToast('✨ AI Positioning applied! Audience-fit increased to 94%.');
  };

  // 1-Click Brand Positioning Assist
  const handleAutoFillPersona = () => {
    setSelectedLocations(['Madurai & Southern TN', 'Chennai Metro & Suburbs', 'Bangalore & Urban Karnataka']);
    setSelectedAges(['25–34 (Young Professionals & Parents)', '35–44 (Families & Established Buyers)']);
    setSelectedInterests(['Healthy Eating & Millets', 'Clean Ingredients & No Preservatives', 'Regional D2C Brands']);
    setSelectedCustomerTypes(['Health-conscious Parents', 'Busy Urban Professionals']);
    setSuggestionApplied(true);
    setShowAssistModal(false);
    addToast('🎯 Positioning auto-aligned with your D2C product profile!');
  };

  // Final Launch Action
  const handleLaunch = () => {
    setIsLaunching(true);
    const campaignId = `LR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setLaunchedCampaignId(campaignId);

    setTimeout(() => {
      const newReel = {
        id: `reel-${Date.now()}`,
        founderId: activeFounder.id,
        founderName: activeFounder.founderName || 'Kavya',
        brandName: activeFounder.brandName || 'Namma Crunch',
        brandAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        location: activeFounder.location || 'Madurai, Tamil Nadu',
        category: 'Healthy Snacks',
        title,
        description,
        videoUrl: videoPreviewUrl,
        posterUrl: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281691?auto=format&fit=crop&w=800&q=80',
        duration: '0:28',
        status: 'Live',
        campaignId,
        goal,
        cta,
        product: {
          id: selectedProductId,
          name: 'Millet Crunch (Spiced Clusters)',
          price: 120,
          originalPrice: 150,
          discount: '20% OFF',
          rating: 4.9,
          reviewsCount: 38,
          packSize: '150g pack',
          image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=400&q=80'
        },
        audienceFit: fitResult.score,
        fitBreakdown: fitResult.breakdown,
        matchedReason: `Matched to: Healthy Food • ${selectedLocations[0]?.split('&')[0] || 'Tamil Nadu'}`,
        targeting: {
          locations: selectedLocations,
          ageGroups: selectedAges,
          interests: selectedInterests,
          customerTypes: selectedCustomerTypes
        },
        metrics: {
          reach: budgetTier === 1500 ? 25400 : budgetTier === 500 ? 8420 : 1240,
          relevantReach: budgetTier === 1500 ? 19200 : budgetTier === 500 ? 6050 : 890,
          relevantPercent: 72,
          views: budgetTier === 1500 ? 2180 : budgetTier === 500 ? 684 : 110,
          productClicks: budgetTier === 1500 ? 460 : budgetTier === 500 ? 143 : 24,
          conversions: budgetTier === 1500 ? 88 : budgetTier === 500 ? 27 : 5,
          likes: 218,
          comments: 34,
          shares: 49,
          budgetSpent: budgetTier,
          roas: budgetTier > 0 ? '6.48x' : 'N/A'
        },
        createdAt: 'Just now'
      };

      onReelCreated?.(newReel);
      setIsLaunching(false);
      setStep(5); // Success step
      addToast(`🚀 Reel launched! Matched to targeted regional buyers.`);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden relative">
        {/* Top Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between shrink-0 bg-slate-50/70">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-black tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                Launch Reel Studio
              </span>
              <span className="text-xs text-slate-400">• Step {step} of 4</span>
            </div>
            <h2 className="text-lg font-extrabold text-slate-900 tracking-tight mt-0.5">
              {step === 1 && '1. Upload Product Reel'}
              {step === 2 && '2. Position Your Reel'}
              {step === 3 && '3. Define Target Audience'}
              {step === 4 && '4. Live Audience-Fit & Launch'}
              {step === 5 && '🚀 Launch Reel Live!'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Indicators (Steps 1-4) */}
        {step <= 4 && (
          <div className="grid grid-cols-4 border-b border-slate-100 text-center text-xs font-bold shrink-0 bg-white">
            <div
              className={`py-2.5 border-b-2 transition-all ${
                step === 1
                  ? 'border-brand-600 text-brand-700 bg-brand-50/40'
                  : step > 1
                  ? 'border-emerald-500 text-emerald-700'
                  : 'border-transparent text-slate-400'
              }`}
            >
              1. Upload
            </div>
            <div
              className={`py-2.5 border-b-2 transition-all ${
                step === 2
                  ? 'border-brand-600 text-brand-700 bg-brand-50/40'
                  : step > 2
                  ? 'border-emerald-500 text-emerald-700'
                  : 'border-transparent text-slate-400'
              }`}
            >
              2. Position
            </div>
            <div
              className={`py-2.5 border-b-2 transition-all ${
                step === 3
                  ? 'border-brand-600 text-brand-700 bg-brand-50/40'
                  : step > 3
                  ? 'border-emerald-500 text-emerald-700'
                  : 'border-transparent text-slate-400'
              }`}
            >
              3. Target Audience
            </div>
            <div
              className={`py-2.5 border-b-2 transition-all ${
                step === 4
                  ? 'border-brand-600 text-brand-700 bg-brand-50/40'
                  : 'border-transparent text-slate-400'
              }`}
            >
              4. Fit & Launch
            </div>
          </div>
        )}

        {/* Scrollable Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* ---------------- STEP 1: UPLOAD VIDEO ---------------- */}
          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Left Column: Video Dropzone & Live 9:16 Preview */}
              <div className="md:col-span-5 flex flex-col items-center">
                <div className="relative w-full max-w-[260px] aspect-[9/16] rounded-2xl overflow-hidden bg-slate-900 border-2 border-dashed border-slate-300 shadow-md group flex items-center justify-center">
                  {videoPreviewUrl ? (
                    <video
                      src={videoPreviewUrl}
                      className="w-full h-full object-cover"
                      controls={false}
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  ) : (
                    <div className="p-4 text-center text-slate-400 space-y-2">
                      <Video className="w-10 h-10 mx-auto text-slate-400" />
                      <span className="text-xs font-bold block">No video selected</span>
                    </div>
                  )}

                  {/* Overlay Upload Button */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-white text-center">
                    <Upload className="w-8 h-8 mb-2" />
                    <span className="text-xs font-bold">Replace Video (MP4/MOV)</span>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="mt-2 px-3 py-1 bg-white text-slate-900 rounded-lg text-xs font-bold hover:bg-slate-100"
                    >
                      Choose File
                    </button>
                  </div>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/mp4,video/quicktime"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <div className="mt-3 flex items-center gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="gap-1.5 text-xs font-bold"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Custom Video</span>
                  </Button>
                </div>
                <span className="text-[10px] text-slate-400 mt-1">
                  Supports MP4, MOV (9:16 vertical recommended)
                </span>
              </div>

              {/* Right Column: Title, Tagged Product, Description */}
              <div className="md:col-span-7 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Reel Headline / Hook <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. A Healthier Crunch is Here: Roasted Millets with Zero Palm Oil!"
                    className="w-full text-xs font-medium p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-900"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Keep it benefit-driven. Mention what makes your D2C product wholesome or unique.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Tag Product from Your Marketplace <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                    className="w-full text-xs font-semibold p-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-900"
                  >
                    <option value="prod-millet-crunch">Millet Crunch (Spiced Clusters) - ₹120</option>
                    <option value="prod-ragi-cookies">Sprouted Ragi Almond Cookies - ₹160</option>
                    <option value="prod-sesame-oil">Cold-Pressed Sesame Oil (Wood Chekku) - ₹240</option>
                    <option value="prod-cotton-saree">Chettinad Handloom Cotton Saree - ₹1,450</option>
                  </select>
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Tagged products enable instant 1-click checkout directly inside the video player.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Founder Description & Story
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    placeholder="Describe how the product was crafted, ingredients used, and what problem it solves..."
                    className="w-full text-xs font-medium p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-900 resize-none"
                  />
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2 text-slate-600 text-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    Brand: <strong className="text-slate-900">{activeFounder.brandName}</strong> •{' '}
                    {activeFounder.location}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ---------------- STEP 2: POSITION YOUR REEL ---------------- */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 mb-1">
                  What is the primary purpose of this Launch Reel?
                </h3>
                <p className="text-xs text-slate-500 mb-3">
                  Positioning sets the context for where this video appears in consumer feeds and mentor showcases.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {GOAL_OPTIONS.map((opt) => (
                    <div
                      key={opt.id}
                      onClick={() => setGoal(opt.id)}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                        goal === opt.id
                          ? 'border-brand-600 bg-brand-50/50 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold text-slate-900">{opt.label}</span>
                        {goal === opt.id && <CheckCircle2 className="w-4 h-4 text-brand-600" />}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 leading-snug">{opt.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-sm font-extrabold text-slate-900 mb-1">
                  Select Primary Call to Action (CTA)
                </h3>
                <p className="text-xs text-slate-500 mb-3">
                  This button will be pinned directly over the video for frictionless conversion.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CTA_OPTIONS.map((opt) => (
                    <div
                      key={opt.id}
                      onClick={() => setCta(opt.id)}
                      className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                        cta === opt.id
                          ? 'border-emerald-600 bg-emerald-50/60 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold text-slate-900">{opt.label}</span>
                        {cta === opt.id && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                      </div>
                      <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">{opt.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ---------------- STEP 3: DEFINE TARGET AUDIENCE ---------------- */}
          {step === 3 && (
            <div className="space-y-6">
              {/* Brand Positioning Assist Banner */}
              <div className="p-4 bg-linear-to-r from-emerald-50 via-teal-50 to-brand-50 rounded-2xl border border-emerald-200 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <Sparkles className="w-5 h-5 text-emerald-200" />
                  </div>
                  <div>
                    <span className="text-xs font-extrabold text-slate-900 block leading-tight">
                      Brand Positioning Assist
                    </span>
                    <span className="text-[11px] text-slate-600 block">
                      Not sure which audience fits best? Let Namma-Connect auto-align based on your product profile.
                    </span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleAutoFillPersona}
                  className="shrink-0 text-xs font-bold gap-1.5 shadow-xs"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Auto-Align Audience</span>
                </Button>
              </div>

              {/* 1. Geographic Location Targeting */}
              <div>
                <label className="block text-xs font-extrabold text-slate-900 mb-2">
                  1. Geographic Region Targeting
                </label>
                <div className="flex flex-wrap gap-2">
                  {TARGET_LOCATIONS.map((loc) => {
                    const selected = selectedLocations.includes(loc);
                    return (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => toggleItem(selectedLocations, setSelectedLocations, loc)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          selected
                            ? 'bg-slate-900 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {selected ? '✓ ' : '+ '}
                        {loc}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Target Age Range */}
              <div>
                <label className="block text-xs font-extrabold text-slate-900 mb-2">
                  2. Age Demographic Focus
                </label>
                <div className="flex flex-wrap gap-2">
                  {TARGET_AGE_GROUPS.map((age) => {
                    const selected = selectedAges.includes(age);
                    return (
                      <button
                        key={age}
                        type="button"
                        onClick={() => toggleItem(selectedAges, setSelectedAges, age)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          selected
                            ? 'bg-brand-700 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {selected ? '✓ ' : '+ '}
                        {age}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Consumer Interests */}
              <div>
                <label className="block text-xs font-extrabold text-slate-900 mb-2">
                  3. Consumer Interests & Dietary / Lifestyle Habits
                </label>
                <div className="flex flex-wrap gap-2">
                  {TARGET_INTERESTS.map((interest) => {
                    const selected = selectedInterests.includes(interest);
                    return (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => toggleItem(selectedInterests, setSelectedInterests, interest)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          selected
                            ? 'bg-emerald-700 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {selected ? '✓ ' : '+ '}
                        {interest}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. Customer Segment */}
              <div>
                <label className="block text-xs font-extrabold text-slate-900 mb-2">
                  4. Buyer Persona / Segment
                </label>
                <div className="flex flex-wrap gap-2">
                  {TARGET_CUSTOMER_TYPES.map((cust) => {
                    const selected = selectedCustomerTypes.includes(cust);
                    return (
                      <button
                        key={cust}
                        type="button"
                        onClick={() =>
                          toggleItem(selectedCustomerTypes, setSelectedCustomerTypes, cust)
                        }
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          selected
                            ? 'bg-amber-700 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {selected ? '✓ ' : '+ '}
                        {cust}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ---------------- STEP 4: AUDIENCE FIT & LAUNCH ---------------- */}
          {step === 4 && (
            <div className="space-y-6">
              {/* Score Meter & Breakdown */}
              <div className="p-6 bg-slate-900 text-white rounded-3xl shadow-xl border border-slate-800">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-800">
                  {/* Circular Score Gauge */}
                  <div className="flex items-center gap-4">
                    <div className="relative w-24 h-24 rounded-full bg-slate-800 flex items-center justify-center border-4 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                      <div className="text-center">
                        <span className="text-2xl font-black text-white block leading-none">
                          {fitResult.score}%
                        </span>
                        <span className="text-[9px] uppercase font-bold text-emerald-400 block tracking-wider mt-1">
                          Fit Score
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/40">
                          {fitResult.score >= 90 ? 'High Audience Fit' : 'Moderate Fit'}
                        </span>
                      </div>
                      <h3 className="text-base font-extrabold text-white mt-1">
                        High-Synergy Regional Discovery
                      </h3>
                      <p className="text-xs text-slate-400 max-w-sm">
                        This reel is strongly pre-qualified for regional D2C buyers in{' '}
                        {selectedLocations[0] || 'Tamil Nadu'}.
                      </p>
                    </div>
                  </div>

                  {/* Estimated Reach Metric Pill */}
                  <div className="text-right bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700 w-full md:w-auto">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Targeted Audience Reach
                    </span>
                    <span className="text-xl font-black text-emerald-400 block mt-0.5">
                      {budgetTier === 1500 ? '~25,400' : budgetTier === 500 ? '~8,420' : '~1,240'}{' '}
                      <span className="text-xs text-slate-300 font-semibold">Buyers</span>
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      72% pre-screened relevant
                    </span>
                  </div>
                </div>

                {/* 4 Dimension Breakdown Progress Bars */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400 font-medium">Product Relevance</span>
                      <span className="font-bold text-white">{fitResult.breakdown.productRelevance}%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${fitResult.breakdown.productRelevance}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400 font-medium">Interest Match</span>
                      <span className="font-bold text-white">{fitResult.breakdown.interestMatch}%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-teal-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${fitResult.breakdown.interestMatch}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400 font-medium">Location Fit</span>
                      <span className="font-bold text-white">{fitResult.breakdown.locationFit}%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-blue-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${fitResult.breakdown.locationFit}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400 font-medium">Customer Segment</span>
                      <span className="font-bold text-white">{fitResult.breakdown.customerFit}%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-amber-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${fitResult.breakdown.customerFit}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Positioning Suggestion Box */}
              <div
                className={`p-4 rounded-2xl border transition-all ${
                  suggestionApplied
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                    : 'bg-amber-50 border-amber-200 text-amber-950'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <Sparkles
                      className={`w-5 h-5 shrink-0 mt-0.5 ${
                        suggestionApplied ? 'text-emerald-600' : 'text-amber-600'
                      }`}
                    />
                    <div>
                      <span className="text-xs font-bold block">
                        {suggestionApplied ? 'Suggestion Active' : 'AI Positioning Recommendation'}
                      </span>
                      <p className="text-xs mt-0.5 leading-relaxed">
                        {fitResult.suggestion.text}
                      </p>
                    </div>
                  </div>

                  {!suggestionApplied ? (
                    <Button
                      variant="amber"
                      size="sm"
                      onClick={handleApplySuggestion}
                      className="shrink-0 text-xs font-bold gap-1 shadow-2xs"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>Apply Suggestion (+3%)</span>
                    </Button>
                  ) : (
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-100/80 px-3 py-1 rounded-full shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Applied (94% Fit)</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Campaign Budget Tier Selector */}
              <div>
                <label className="block text-xs font-extrabold text-slate-900 mb-2">
                  Select Launch Boost Tier (Micro-budget D2C Distribution)
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Organic Free */}
                  <div
                    onClick={() => setBudgetTier(0)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      budgetTier === 0
                        ? 'border-brand-600 bg-brand-50/50 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-extrabold text-slate-900">Organic Discovery</span>
                      <span className="text-xs font-black text-slate-900">₹0 Free</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mb-2">
                      Appears in community marketplace feed and founder roadmaps.
                    </p>
                    <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                      ~1,240 reach
                    </span>
                  </div>

                  {/* ₹500 Targeted Micro-Boost (Recommended) */}
                  <div
                    onClick={() => setBudgetTier(500)}
                    className={`p-4 rounded-2xl border-2 transition-all relative cursor-pointer ${
                      budgetTier === 500
                        ? 'border-emerald-600 bg-emerald-50/70 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="absolute -top-2.5 right-3 bg-emerald-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full shadow-xs">
                      Recommended
                    </div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-extrabold text-slate-900">Targeted Micro-Boost</span>
                      <span className="text-xs font-black text-emerald-700">₹500</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mb-2">
                      Serves directly to qualified food enthusiasts & parents across South India.
                    </p>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                      ~8,420 reach (72% targeted)
                    </span>
                  </div>

                  {/* ₹1500 Growth Boost */}
                  <div
                    onClick={() => setBudgetTier(1500)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      budgetTier === 1500
                        ? 'border-brand-600 bg-brand-50/50 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-extrabold text-slate-900">Scale Growth Boost</span>
                      <span className="text-xs font-black text-brand-700">₹1,500</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mb-2">
                      Multi-city push across Tamil Nadu, Bangalore and Hyderabad metro hubs.
                    </p>
                    <span className="text-[10px] font-bold text-brand-800 bg-brand-100 px-2 py-0.5 rounded">
                      ~25,400 reach
                    </span>
                  </div>
                </div>
              </div>

              {/* Campaign Duration */}
              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <span className="font-bold text-slate-700">Campaign Duration:</span>
                <div className="flex items-center gap-2">
                  {[7, 14, 30].map((days) => (
                    <button
                      key={days}
                      type="button"
                      onClick={() => setDurationDays(days)}
                      className={`px-3 py-1 rounded-lg font-bold text-xs cursor-pointer transition-colors ${
                        durationDays === days
                          ? 'bg-slate-900 text-white'
                          : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {days} Days
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ---------------- STEP 5: SUCCESS STATE ---------------- */}
          {step === 5 && (
            <div className="text-center py-8 space-y-6 max-w-lg mx-auto">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner animate-bounce">
                <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
              </div>

              <div>
                <span className="text-[11px] uppercase font-black tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                  Targeted Micro-Campaign Active
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-2">
                  Your Launch Reel is Live!
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Matched to <strong>{selectedLocations.length} regional zones</strong> with an{' '}
                  <strong>{fitResult.score}% audience synergy score</strong>. Buyers are discovering your{' '}
                  {activeFounder.brandName} reel now.
                </p>
              </div>

              {/* Confirmation Docket */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-left space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500 font-medium">Campaign ID:</span>
                  <span className="font-mono font-bold text-slate-900">{launchedCampaignId}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500 font-medium">Tagged Product:</span>
                  <span className="font-bold text-slate-900">Millet Crunch (Spiced Clusters)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500 font-medium">Micro-Budget:</span>
                  <span className="font-bold text-emerald-700">₹{budgetTier} ({durationDays} days)</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500 font-medium">Audience-Fit:</span>
                  <span className="font-extrabold text-emerald-700">{fitResult.score}% Match</span>
                </div>
              </div>

              {/* Navigation CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <Button
                  variant="outline"
                  size="md"
                  onClick={onClose}
                  className="w-full sm:w-auto text-xs font-bold"
                >
                  Explore Discovery Feed
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => {
                    onClose();
                    onViewAnalytics?.();
                  }}
                  className="w-full sm:w-auto text-xs font-bold gap-1.5 shadow-sm"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Reel Analytics Funnel</span>
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls (Steps 1-4) */}
        {step <= 4 && (
          <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between shrink-0 bg-slate-50/70">
            {step > 1 ? (
              <Button
                variant="outline"
                size="sm"
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="gap-1.5 text-xs font-bold"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </Button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" type="button" onClick={onClose}>
                Cancel
              </Button>

              {step < 4 ? (
                <Button
                  variant="primary"
                  size="sm"
                  type="button"
                  onClick={() => setStep((s) => s + 1)}
                  className="gap-1.5 text-xs font-bold shadow-xs"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="sm"
                  type="button"
                  disabled={isLaunching}
                  onClick={handleLaunch}
                  className="gap-1.5 text-xs font-black bg-emerald-600 hover:bg-emerald-700 shadow-sm"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>{isLaunching ? 'Launching Micro-Campaign...' : `🚀 Launch Reel (₹${budgetTier})`}</span>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
