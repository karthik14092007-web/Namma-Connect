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
  RotateCcw
} from 'lucide-react';
import { useFounder } from '../context/FounderContext';
import { useToast } from '../context/ToastContext';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Input, Select } from '../components/ui/Input';
import LoadingScreen from '../components/ui/LoadingScreen';

export default function OnboardingPage({ setCurrentView }) {
  const { onboardFounder, isLoading } = useFounder();
  const { addToast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
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
    brandStory: ''
  });

  // Autofill with the exact Kavya Demo Persona
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
      brandStory: 'Reviving heirloom millet recipes into crispy, wholesome baked snacks with zero palm oil or preservatives.'
    });
    addToast('⚡ Loaded Kavya (Namma Crunch) demo persona!');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsAnalyzing(true);
    await onboardFounder(formData);
  };

  const handleAnalysisFinished = () => {
    setIsAnalyzing(false);
    addToast('🎯 Brand Growth Score and 30-Day Plan generated!');
    setCurrentView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
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
          <Badge variant="brand" size="md" className="mb-1.5">
            Diagnostic Assessment
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Assess Your D2C Business
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Answer a few quick questions to generate your Brand Growth Score and 30-Day Roadmap.
          </p>
        </div>

        <Button
          variant="amber"
          size="sm"
          onClick={handleAutofillKavya}
          icon={Sparkles}
          className="self-start sm:self-auto shrink-0"
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
            { step: 4, label: '4 Preferences', icon: Sliders }
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
                    ? 'bg-brand-50 text-brand-700 font-extrabold border border-brand-200'
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
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-soft">
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
                    'Funding',
                    'Mentorship',
                    'Distribution',
                    'Product positioning'
                  ].map((ch) => {
                    const isSelected = formData.challenges.includes(ch);
                    return (
                      <button
                        type="button"
                        key={ch}
                        onClick={() => handleChallengeToggle(ch)}
                        className={`p-2.5 rounded-xl text-xs font-medium border text-left flex items-center justify-between transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-brand-50 border-brand-500 text-brand-900 font-bold shadow-2xs'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <span className="truncate pr-1">{ch}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-brand-600 stroke-[3] shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ---------------- STEP 3: FUNDING ---------------- */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Step 3 — Funding Requirements
                </h3>
                <p className="text-xs text-slate-500">We match you with grants, government schemes, and early angels.</p>
              </div>

              {/* Are you looking for funding */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Are you currently looking for funding? *
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, isSeekingFunding: true })}
                    className={`flex-1 py-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      formData.isSeekingFunding
                        ? 'bg-brand-50 border-brand-600 text-brand-700 shadow-2xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Yes, Seeking Capital
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, isSeekingFunding: false })}
                    className={`flex-1 py-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      !formData.isSeekingFunding
                        ? 'bg-brand-50 border-brand-600 text-brand-700 shadow-2xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    No, Self-funded / Bootstrapped
                  </button>
                </div>
              </div>

              {formData.isSeekingFunding && (
                <>
                  {/* Funding Requirement */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Funding requirement:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {['< ₹5L', '₹5L–₹10L', '₹10L–₹25L', '₹25L+'].map((range) => (
                        <button
                          type="button"
                          key={range}
                          onClick={() => setFormData({ ...formData, fundingRequirement: range })}
                          className={`py-3 px-2 rounded-xl text-xs font-semibold border text-center transition-all cursor-pointer ${
                            formData.fundingRequirement === range
                              ? 'bg-brand-50 border-brand-600 text-brand-700 font-extrabold shadow-2xs'
                              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Funding Purpose */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Funding purpose: (Select all that apply)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        'Marketing',
                        'Inventory',
                        'Manufacturing',
                        'Technology',
                        'Expansion',
                        'Hiring'
                      ].map((purp) => {
                        const isSelected = formData.fundingPurpose.includes(purp);
                        return (
                          <button
                            type="button"
                            key={purp}
                            onClick={() => handlePurposeToggle(purp)}
                            className={`p-2.5 rounded-xl text-xs font-medium border text-left flex items-center justify-between transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-brand-50 border-brand-500 text-brand-900 font-bold shadow-2xs'
                                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            <span>{purp}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-brand-600 stroke-[3]" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ---------------- STEP 4: PREFERENCES ---------------- */}
          {currentStep === 4 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Step 4 — Preferences & Target Market
                </h3>
                <p className="text-xs text-slate-500">Fine-tune your mentor and customer matching criteria.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Preferred Language"
                  required
                  value={formData.preferredLanguage}
                  onChange={(e) => setFormData({ ...formData, preferredLanguage: e.target.value })}
                  placeholder="e.g. Tamil / English, Hindi, etc."
                />

                <Input
                  label="Mentor Expertise"
                  value={formData.preferredMentorExpertise}
                  onChange={(e) => setFormData({ ...formData, preferredMentorExpertise: e.target.value })}
                  placeholder="e.g. Performance Marketing, Packaging"
                />

                <Input
                  label="Target Customer"
                  value={formData.targetCustomer}
                  onChange={(e) => setFormData({ ...formData, targetCustomer: e.target.value })}
                  placeholder="e.g. Health-conscious families, gym goers"
                />

                <Input
                  label="Primary Market"
                  value={formData.primaryMarket}
                  onChange={(e) => setFormData({ ...formData, primaryMarket: e.target.value })}
                  placeholder="e.g. Tamil Nadu & South India"
                />
              </div>
            </div>
          )}

          {/* Stepper Navigation Buttons */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            {currentStep > 1 ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentStep((s) => s - 1)}
                icon={ArrowLeft}
                iconPosition="left"
              >
                Back
              </Button>
            ) : (
              <span />
            )}

            {currentStep < 4 ? (
              <Button
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
                size="lg"
                disabled={isLoading}
                icon={Sparkles}
                iconPosition="left"
              >
                Generate My Growth Plan
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
