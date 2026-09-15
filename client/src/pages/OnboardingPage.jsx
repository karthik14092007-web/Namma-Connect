import React, { useState } from 'react';
import {
  Building2,
  TrendingUp,
  Coins,
  Sliders,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Check,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  Zap,
  Target
} from 'lucide-react';
import { useFounder } from '../context/FounderContext';
import { useToast } from '../context/ToastContext';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Input, Select } from '../components/ui/Input';
import LoadingScreen from '../components/ui/LoadingScreen';
import { DIAGNOSTIC_FACTORS, DIAGNOSTIC_QUESTIONS } from '../scoring/diagnosticQuestions';
import { KAVYA_DEMO_ANSWERS } from '../scoring/demoAnswers';
import { calculateGrowthDiagnostic, getMaturityColor } from '../scoring/scoringEngine';

export default function OnboardingPage({ setCurrentView }) {
  const { onboardFounder, isLoading } = useFounder();
  const { addToast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [activeDiagnosticFactor, setActiveDiagnosticFactor] = useState('marketing');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    brandName: '',
    founderName: '',
    location: '',
    industry: 'Food & Beverages',
    productCategory: '',
    websiteUrl: '',
    instagramHandle: '',
    businessModel: 'D2C Online + Regional Retail',
    businessStage: 'Early traction',
    monthlyRevenue: '₹50K–₹2L',
    salesTrend: 'Unpredictable',
    challenges: ['Marketing', 'Branding', 'Sales'],
    isSeekingFunding: true,
    fundingRequirement: '₹5L–₹10L',
    fundingPurpose: ['Marketing', 'Expansion', 'Inventory'],
    preferredLanguage: 'Tamil / English',
    preferredMentorExpertise: 'Performance Marketing & Brand Positioning',
    mentorshipMode: 'Online',
    targetCustomer: 'Health-conscious families & urban youth',
    primaryMarket: 'Tamil Nadu & South India',
    brandStory: '',
    diagnosticAnswers: { ...KAVYA_DEMO_ANSWERS }
  });

  // Autofill with the exact Kavya Demo Persona + 24 Diagnostic Answers
  const handleAutofillKavya = () => {
    setFormData({
      brandName: 'Namma Crunch',
      founderName: 'Kavya',
      location: 'Madurai, Tamil Nadu',
      industry: 'Food & Beverages',
      productCategory: 'Healthy Snacks (Roasted Millets)',
      websiteUrl: 'https://nammacrunch.in',
      instagramHandle: '@nammacrunch',
      businessModel: 'D2C Online + Regional Retail',
      businessStage: 'Early traction',
      monthlyRevenue: '₹50K–₹2L',
      salesTrend: 'Unpredictable',
      challenges: ['Marketing', 'Branding', 'Sales', 'Distribution'],
      isSeekingFunding: true,
      fundingRequirement: '₹5L–₹10L',
      fundingPurpose: ['Marketing', 'Expansion', 'Inventory'],
      preferredLanguage: 'Tamil / English',
      preferredMentorExpertise: 'Performance Marketing & Brand Positioning',
      mentorshipMode: 'Online',
      targetCustomer: 'Health-conscious families, urban professionals, college students',
      primaryMarket: 'Tamil Nadu & Tier 2/3 South India',
      brandStory: 'Reviving heirloom millet recipes into crispy, wholesome baked snacks with zero palm oil or preservatives.',
      diagnosticAnswers: { ...KAVYA_DEMO_ANSWERS }
    });
    addToast('⚡ Loaded Kavya (Namma Crunch) & 24 observable diagnostic answers!');
  };

  const handleChallengeToggle = (challenge) => {
    setFormData((prev) => {
      const exists = prev.challenges.includes(challenge);
      return {
        ...prev,
        challenges: exists
          ? prev.challenges.filter((c) => c !== challenge)
          : [...prev.challenges, challenge]
      };
    });
  };

  const handlePurposeToggle = (purpose) => {
    setFormData((prev) => {
      const exists = prev.fundingPurpose.includes(purpose);
      return {
        ...prev,
        fundingPurpose: exists
          ? prev.fundingPurpose.filter((p) => p !== purpose)
          : [...prev.fundingPurpose, purpose]
      };
    });
  };

  const handleAnswerSelect = (questionId, score) => {
    setFormData((prev) => ({
      ...prev,
      diagnosticAnswers: {
        ...prev.diagnosticAnswers,
        [questionId]: score
      }
    }));
  };

  // Live diagnostic calculation for step 4
  const liveDiagnostic = calculateGrowthDiagnostic(
    formData.diagnosticAnswers,
    formData.businessStage || 'Early traction'
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsAnalyzing(true);
    await onboardFounder({
      ...formData,
      diagnosticAnswers: formData.diagnosticAnswers,
      growthScore: liveDiagnostic.overallScore,
      scoreStatus: liveDiagnostic.maturity,
      categoryScores: {
        product: liveDiagnostic.factors.product?.score || 85,
        sales: liveDiagnostic.factors.sales?.score || 70,
        branding: liveDiagnostic.factors.branding?.score || 60,
        marketing: liveDiagnostic.factors.marketing?.score || 50,
        customerReach: liveDiagnostic.factors.reach?.score || 70,
        fundingReadiness: liveDiagnostic.factors.funding?.score || 75
      }
    });
  };

  const handleAnalysisFinished = () => {
    setIsAnalyzing(false);
    addToast('🎯 Growth Diagnostic & 30-Day Plan generated!');
    setCurrentView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigation between diagnostic factor tabs
  const factorIndex = DIAGNOSTIC_FACTORS.findIndex((f) => f.id === activeDiagnosticFactor);
  const handleNextFactor = () => {
    if (factorIndex < DIAGNOSTIC_FACTORS.length - 1) {
      setActiveDiagnosticFactor(DIAGNOSTIC_FACTORS[factorIndex + 1].id);
    }
  };
  const handlePrevFactor = () => {
    if (factorIndex > 0) {
      setActiveDiagnosticFactor(DIAGNOSTIC_FACTORS[factorIndex - 1].id);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Analyzing Transition Screen */}
      {isAnalyzing && (
        <LoadingScreen
          onComplete={handleAnalysisFinished}
          brandName={formData.brandName || 'Namma Crunch'}
        />
      )}

      {/* Header & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Badge variant="brand" size="md">
              Evidence-Based Assessment
            </Badge>
            <span className="text-[11px] font-extrabold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Rule-Based Diagnostic • V1
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Assess Your D2C Business
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Answer observable readiness questions to calculate your Growth Diagnostic and 30-Day Action Plan.
          </p>
        </div>

        <Button
          variant="amber"
          size="sm"
          onClick={handleAutofillKavya}
          icon={Sparkles}
          className="self-start sm:self-auto shrink-0 font-bold shadow-2xs"
        >
          ⚡ Autofill Demo (Kavya)
        </Button>
      </div>

      {/* Stepper Progress Bar */}
      <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="grid grid-cols-4 gap-2 text-center text-xs">
          {[
            { step: 1, label: '1 Business', icon: Building2 },
            { step: 2, label: '2 Growth', icon: TrendingUp },
            { step: 3, label: '3 Funding', icon: Coins },
            { step: 4, label: '4 Growth Diagnostic', icon: Target }
          ].map((item) => {
            const isCompleted = currentStep > item.step;
            const isCurrent = currentStep === item.step;
            const Icon = item.icon;

            return (
              <button
                type="button"
                key={item.step}
                onClick={() => setCurrentStep(item.step)}
                className={`flex flex-col items-center py-2 px-1 rounded-xl transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-brand-50 text-brand-700 font-extrabold border border-brand-200 shadow-2xs'
                    : isCompleted
                    ? 'text-emerald-700 font-bold hover:bg-slate-50'
                    : 'text-slate-400 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  {isCompleted ? (
                    <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                  <span className="hidden sm:inline">{item.label}</span>
                </div>
                <span className="sm:hidden text-[11px] font-bold">{item.step}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step Form Containers */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-soft">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ---------------- STEP 1: BUSINESS ---------------- */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Step 1 — Business Information
                </h3>
                <p className="text-xs text-slate-500">Provide the basic context of your D2C brand.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Brand Name"
                  required
                  placeholder="e.g. Namma Crunch"
                  value={formData.brandName}
                  onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                />

                <Input
                  label="Founder Name"
                  required
                  placeholder="e.g. Kavya"
                  value={formData.founderName}
                  onChange={(e) => setFormData({ ...formData, founderName: e.target.value })}
                />

                <Input
                  label="Location"
                  required
                  placeholder="e.g. Madurai, Tamil Nadu"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />

                <Select
                  label="Industry"
                  required
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                >
                  <option value="Food & Beverages">Food & Beverages</option>
                  <option value="Fashion">Fashion & Apparel</option>
                  <option value="Beauty">Beauty & Personal Care</option>
                  <option value="Handcrafted">Handcrafted & Artisanal</option>
                  <option value="Agriculture">Agriculture & Agri-Value Add</option>
                  <option value="Home & Lifestyle">Home & Lifestyle</option>
                  <option value="Local Products">Local Products</option>
                </Select>

                <Input
                  label="Product Category"
                  placeholder="e.g. Healthy snacks (Roasted Millets)"
                  value={formData.productCategory}
                  onChange={(e) => setFormData({ ...formData, productCategory: e.target.value })}
                />

                <Input
                  label="Website / Instagram"
                  placeholder="e.g. @nammacrunch or nammacrunch.in"
                  value={formData.instagramHandle || formData.websiteUrl}
                  onChange={(e) => setFormData({ ...formData, instagramHandle: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Business Stage *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {['Idea', 'Pre-revenue', 'Early traction', 'Growing', 'Scaling'].map((stage) => (
                    <button
                      type="button"
                      key={stage}
                      onClick={() => setFormData({ ...formData, businessStage: stage })}
                      className={`py-2.5 px-2 rounded-xl text-xs font-semibold border text-center transition-all cursor-pointer ${
                        formData.businessStage === stage
                          ? 'bg-brand-50 border-brand-600 text-brand-700 font-extrabold shadow-2xs'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {stage}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ---------------- STEP 2: GROWTH METRICS ---------------- */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Step 2 — Growth Metrics
                </h3>
                <p className="text-xs text-slate-500">Understand your current sales volume and friction points.</p>
              </div>

              {/* Monthly Revenue */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  What is your current monthly revenue? *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {['Pre-revenue', '₹0–50K', '₹50K–₹2L', '₹2L–₹5L', '₹5L+'].map((rev) => (
                    <button
                      type="button"
                      key={rev}
                      onClick={() => setFormData({ ...formData, monthlyRevenue: rev })}
                      className={`py-3 px-2 rounded-xl text-xs font-semibold border text-center transition-all cursor-pointer ${
                        formData.monthlyRevenue === rev
                          ? 'bg-brand-50 border-brand-600 text-brand-700 font-extrabold shadow-2xs'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {rev}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sales Change */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  What happened to your sales recently? *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['Growing', 'Stable', 'Declining', 'Unpredictable'].map((trend) => (
                    <button
                      type="button"
                      key={trend}
                      onClick={() => setFormData({ ...formData, salesTrend: trend })}
                      className={`py-3 px-2 rounded-xl text-xs font-semibold border text-center transition-all cursor-pointer ${
                        formData.salesTrend === trend
                          ? 'bg-brand-50 border-brand-600 text-brand-700 font-extrabold shadow-2xs'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {trend}
                    </button>
                  ))}
                </div>
              </div>

              {/* Biggest Growth Challenge (Multi-select) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  What is your biggest growth challenge? (Select all that apply) *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    'Marketing',
                    'Branding',
                    'Sales',
                    'Customer acquisition',
                    'Distribution',
                    'Packaging',
                    'Funding'
                  ].map((challenge) => {
                    const isSelected = formData.challenges.includes(challenge);
                    return (
                      <button
                        type="button"
                        key={challenge}
                        onClick={() => handleChallengeToggle(challenge)}
                        className={`py-3 px-3 rounded-xl text-xs font-semibold border text-left transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-amber-50 border-amber-400 text-amber-900 font-extrabold shadow-2xs'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <span>{challenge}</span>
                        {isSelected && <Check className="w-4 h-4 text-amber-600" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ---------------- STEP 3: FUNDING & PREFERENCES ---------------- */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Step 3 — Funding & Preferences
                </h3>
                <p className="text-xs text-slate-500">Define capital requirements and mentorship preferences.</p>
              </div>

              {/* Funding Amount */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  How much funding / grant support are you seeking?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['Not seeking funding', '₹1L–₹5L', '₹5L–₹10L', '₹10L–₹25L', '₹25L+'].map((amount) => (
                    <button
                      type="button"
                      key={amount}
                      onClick={() => setFormData({ ...formData, fundingRequirement: amount })}
                      className={`py-3 px-2 rounded-xl text-xs font-semibold border text-center transition-all cursor-pointer ${
                        formData.fundingRequirement === amount
                          ? 'bg-brand-50 border-brand-600 text-brand-700 font-extrabold shadow-2xs'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {amount}
                    </button>
                  ))}
                </div>
              </div>

              {/* Funding Purpose */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  What will you use the funding for?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['Marketing', 'Product development', 'Expansion', 'Inventory', 'Hiring', 'Certifications'].map(
                    (purpose) => {
                      const isSelected = formData.fundingPurpose.includes(purpose);
                      return (
                        <button
                          type="button"
                          key={purpose}
                          onClick={() => handlePurposeToggle(purpose)}
                          className={`py-3 px-3 rounded-xl text-xs font-semibold border text-left transition-all cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'bg-emerald-50 border-emerald-400 text-emerald-900 font-extrabold shadow-2xs'
                              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <span>{purpose}</span>
                          {isSelected && <Check className="w-4 h-4 text-emerald-600" />}
                        </button>
                      );
                    }
                  )}
                </div>
              </div>

              {/* Preferred Language */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="Preferred Language for Mentorship"
                  value={formData.preferredLanguage}
                  onChange={(e) => setFormData({ ...formData, preferredLanguage: e.target.value })}
                >
                  <option value="Tamil / English">Tamil / English</option>
                  <option value="English">English</option>
                  <option value="Tamil">Tamil</option>
                  <option value="Hindi / English">Hindi / English</option>
                  <option value="Kannada / English">Kannada / English</option>
                </Select>

                <Select
                  label="Mentorship Mode"
                  value={formData.mentorshipMode}
                  onChange={(e) => setFormData({ ...formData, mentorshipMode: e.target.value })}
                >
                  <option value="Online">Online (Video Call / Chat)</option>
                  <option value="In-person">In-person (Regional Meetups)</option>
                  <option value="Both">Both Online & In-person</option>
                </Select>
              </div>
            </div>
          )}

          {/* ---------------- STEP 4: GROWTH DIAGNOSTIC STUDIO ---------------- */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-black tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                      Step 4 — Growth Diagnostic
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      24 Observable Questions (4 per factor)
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 mt-1">
                    Rule-Based Business Readiness Assessment
                  </h3>
                  <p className="text-xs text-slate-500">
                    Select the option that matches your current operational reality. Numerical points are visible on every option card.
                  </p>
                </div>

                {/* Live Diagnostic Score Pill */}
                <div className="bg-slate-900 text-white p-3 rounded-2xl border border-slate-800 shrink-0 text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Diagnostic Score
                  </span>
                  <span className="text-xl font-black text-emerald-400 block font-mono">
                    {liveDiagnostic.overallScore} <span className="text-xs text-slate-400 font-normal">/ 100</span>
                  </span>
                  <span className="text-[10px] text-slate-300 block font-sans">
                    {liveDiagnostic.maturity} Stage
                  </span>
                </div>
              </div>

              {/* 6-Factor Switcher Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none border-b border-slate-100">
                {DIAGNOSTIC_FACTORS.map((factor) => {
                  const factorObj = liveDiagnostic.factors[factor.id];
                  const isCurrent = activeDiagnosticFactor === factor.id;
                  const color = getMaturityColor(factorObj?.score || 50);

                  return (
                    <button
                      type="button"
                      key={factor.id}
                      onClick={() => setActiveDiagnosticFactor(factor.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-2 ${
                        isCurrent
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      <span>{factor.label}</span>
                      <span
                        className={`text-[10px] font-mono font-black px-1.5 py-0.2 rounded-md ${
                          isCurrent
                            ? 'bg-emerald-500 text-slate-950'
                            : `${color.bg} ${color.text}`
                        }`}
                      >
                        {factorObj?.score ?? 0}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Active Factor Header */}
              {(() => {
                const activeFactorData = liveDiagnostic.factors[activeDiagnosticFactor];
                return (
                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-black text-slate-900 uppercase tracking-wider block">
                        {activeFactorData?.label} Factor
                      </span>
                      <span className="text-[11px] text-slate-500 block">
                        Formula: {activeFactorData?.formula}
                      </span>
                    </div>
                    <span className="text-xs font-black text-brand-700 bg-brand-50 px-2.5 py-1 rounded-full border border-brand-200">
                      Score: {activeFactorData?.score}/100 • {activeFactorData?.maturity}
                    </span>
                  </div>
                );
              })()}

              {/* 4 Questions for Active Factor */}
              <div className="space-y-6">
                {(DIAGNOSTIC_QUESTIONS[activeDiagnosticFactor] || []).map((q, qIndex) => {
                  const currentAnswer = formData.diagnosticAnswers[q.id];

                  return (
                    <div
                      key={q.id}
                      className="p-5 rounded-3xl border border-slate-200/90 bg-white shadow-2xs space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-brand-700 bg-brand-50 px-2 py-0.5 rounded-md border border-brand-200 inline-block mb-1">
                            Signal 0{qIndex + 1} of 04
                          </span>
                          <h4 className="text-sm font-extrabold text-slate-900 leading-snug">
                            {q.title}
                          </h4>
                          <p className="text-xs text-slate-500 mt-0.5">{q.prompt}</p>
                        </div>
                        {currentAnswer !== undefined && (
                          <span className="text-xs font-mono font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 shrink-0">
                            +{currentAnswer} pts
                          </span>
                        )}
                      </div>

                      {/* 6 Clearly Differentiated Clickable Option Cards */}
                      <div className="space-y-2 pt-1">
                        {q.options.map((opt) => {
                          const isSelected = currentAnswer === opt.score;
                          return (
                            <div
                              key={opt.score}
                              onClick={() => handleAnswerSelect(q.id, opt.score)}
                              className={`p-3 sm:p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                                isSelected
                                  ? 'border-brand-600 bg-brand-50/50 shadow-2xs'
                                  : 'border-slate-200/80 hover:border-slate-300 bg-white'
                              }`}
                            >
                              <div className="flex items-start gap-2.5 min-w-0">
                                <div
                                  className={`w-4 h-4 rounded-full border-2 mt-0.5 shrink-0 flex items-center justify-center ${
                                    isSelected
                                      ? 'border-brand-600 bg-brand-600'
                                      : 'border-slate-300'
                                  }`}
                                >
                                  {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                </div>
                                <div className="min-w-0">
                                  <span className="text-xs font-bold text-slate-900 block leading-tight">
                                    {opt.label}
                                  </span>
                                  <span className="text-[11px] text-slate-500 block leading-tight mt-0.5">
                                    {opt.desc}
                                  </span>
                                </div>
                              </div>

                              {/* Visible Numerical Point Badge beside option */}
                              <span
                                className={`text-xs font-mono font-black px-2 py-0.5 rounded-lg border shrink-0 ${
                                  isSelected
                                    ? 'bg-brand-600 text-white border-brand-700'
                                    : 'bg-slate-100 text-slate-600 border-slate-200'
                                }`}
                              >
                                {opt.score} pts
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Diagnostic Factor Next / Prev Controls */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  disabled={factorIndex === 0}
                  onClick={handlePrevFactor}
                  className="text-xs font-bold"
                >
                  ← Previous Factor
                </Button>

                <span className="text-xs text-slate-400">
                  Factor {factorIndex + 1} of {DIAGNOSTIC_FACTORS.length}
                </span>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={factorIndex === DIAGNOSTIC_FACTORS.length - 1}
                  onClick={handleNextFactor}
                  className="text-xs font-bold"
                >
                  Next Factor →
                </Button>
              </div>
            </div>
          )}

          {/* Stepper Footer Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-100">
            {currentStep > 1 ? (
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={() => setCurrentStep((s) => s - 1)}
                icon={ArrowLeft}
              >
                Back
              </Button>
            ) : (
              <div />
            )}

            {currentStep < 4 ? (
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={() => setCurrentStep((s) => s + 1)}
                icon={ArrowRight}
                iconPosition="right"
              >
                Continue
              </Button>
            ) : (
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={isLoading}
                icon={ArrowRight}
                iconPosition="right"
                className="bg-emerald-600 hover:bg-emerald-700 font-black shadow-sm"
              >
                {isLoading ? 'Calculating Diagnostic...' : '🎯 Calculate Growth Diagnostic & Plan'}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
