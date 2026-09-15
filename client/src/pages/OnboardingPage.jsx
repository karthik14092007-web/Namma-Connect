import React, { useState } from 'react';
import {
  Building2,
  TrendingUp,
  Coins,
  Sliders,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  RotateCcw,
  ShieldCheck,
  Check
} from 'lucide-react';
import { useFounder } from '../context/FounderContext';

export default function OnboardingPage({ setCurrentView }) {
  const { onboardFounder, isLoading } = useFounder();
  const [currentStep, setCurrentStep] = useState(1);

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

  // Autofill with the Kavya Demo Persona
  const handleAutofillKavya = () => {
    setFormData({
      brandName: 'Namma Crunch',
      founderName: 'Kavya',
      location: 'Madurai, Tamil Nadu',
      industry: 'Food & Beverages',
      productCategory: 'Healthy snacks (Roasted Millets)',
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
    await onboardFounder(formData);
    setCurrentView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Header & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
            Founder Diagnostics Onboarding
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Assess Your D2C Business
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Answer a few quick questions to generate your Brand Growth Score and 30-Day Roadmap.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAutofillKavya}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs shadow-2xs border border-amber-300 transition-all self-start sm:self-auto cursor-pointer"
          title="Autofill Kavya / Namma Crunch inputs"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>⚡ Autofill Demo Persona (Kavya)</span>
        </button>
      </div>

      {/* Progress Stepper Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
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
              <div
                key={item.step}
                onClick={() => setCurrentStep(item.step)}
                className={`flex flex-col items-center py-2 px-1 rounded-xl cursor-pointer transition-all ${
                  isCurrent
                    ? 'bg-brand-50 text-brand-700 font-bold border border-brand-200'
                    : isCompleted
                    ? 'text-emerald-700 font-semibold hover:bg-slate-50'
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
                <span className="sm:hidden text-[11px]">{item.step}</span>
              </div>
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
                <h3 className="text-lg font-bold text-slate-900">Step 1 — Business Information</h3>
                <p className="text-xs text-slate-500">Provide the basic context of your D2C brand.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Brand Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Namma Crunch"
                    value={formData.brandName}
                    onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Founder Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kavya"
                    value={formData.founderName}
                    onChange={(e) => setFormData({ ...formData, founderName: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Location *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Madurai, Tamil Nadu"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Industry *
                  </label>
                  <select
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  >
                    <option value="Food & Beverages">Food & Beverages</option>
                    <option value="Fashion">Fashion & Apparel</option>
                    <option value="Beauty">Beauty & Personal Care</option>
                    <option value="Handcrafted">Handcrafted & Artisanal</option>
                    <option value="Agriculture">Agriculture & Agri-Value Add</option>
                    <option value="Home & Lifestyle">Home & Lifestyle</option>
                    <option value="Local Products">Local Products</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Product Category
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Healthy snacks (Roasted Millets)"
                    value={formData.productCategory}
                    onChange={(e) => setFormData({ ...formData, productCategory: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Website / Instagram
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. @nammacrunch or nammacrunch.in"
                    value={formData.instagramHandle || formData.websiteUrl}
                    onChange={(e) => setFormData({ ...formData, instagramHandle: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>
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
                      className={`py-2.5 px-2 rounded-xl text-xs font-medium border text-center transition-all ${
                        formData.businessStage === stage
                          ? 'bg-brand-50 border-brand-600 text-brand-700 font-bold shadow-xs'
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
                <h3 className="text-lg font-bold text-slate-900">Step 2 — Growth Metrics</h3>
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
                      className={`py-3 px-2 rounded-xl text-xs font-medium border text-center transition-all ${
                        formData.monthlyRevenue === rev
                          ? 'bg-brand-50 border-brand-600 text-brand-700 font-bold shadow-xs'
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
                  How has your sales changed recently? *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['Growing', 'Stable', 'Declining', 'Unpredictable'].map((trend) => (
                    <button
                      type="button"
                      key={trend}
                      onClick={() => setFormData({ ...formData, salesTrend: trend })}
                      className={`py-3 px-2 rounded-xl text-xs font-medium border text-center transition-all ${
                        formData.salesTrend === trend
                          ? 'bg-brand-50 border-brand-600 text-brand-700 font-bold shadow-xs'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {trend}
                    </button>
                  ))}
                </div>
              </div>

              {/* Biggest Challenges (Multi-select) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  What is your biggest challenge? (Select all that apply) *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    'Marketing',
                    'Branding',
                    'Sales',
                    'Customer acquisition',
                    'Funding',
                    'Mentorship',
                    'Product positioning',
                    'Distribution'
                  ].map((ch) => {
                    const isSelected = formData.challenges.includes(ch);
                    return (
                      <button
                        type="button"
                        key={ch}
                        onClick={() => handleChallengeToggle(ch)}
                        className={`p-2.5 rounded-xl text-xs font-medium border text-left flex items-center justify-between transition-all ${
                          isSelected
                            ? 'bg-brand-50 border-brand-500 text-brand-800 font-bold shadow-xs'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <span>{ch}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-brand-600 stroke-[3]" />}
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
                <h3 className="text-lg font-bold text-slate-900">Step 3 — Funding Requirements</h3>
                <p className="text-xs text-slate-500">We match you with grants, government schemes, and early angels.</p>
              </div>

              {/* Are you looking for funding */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Are you currently looking for funding? *
                </label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, isSeekingFunding: true })}
                    className={`flex-1 py-3 rounded-xl text-xs font-bold border transition-all ${
                      formData.isSeekingFunding
                        ? 'bg-brand-50 border-brand-600 text-brand-700 shadow-xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Yes, Seeking Capital
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, isSeekingFunding: false })}
                    className={`flex-1 py-3 rounded-xl text-xs font-bold border transition-all ${
                      !formData.isSeekingFunding
                        ? 'bg-brand-50 border-brand-600 text-brand-700 shadow-xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    No, Self-funded / Bootstrapping
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
                          className={`py-3 px-2 rounded-xl text-xs font-medium border text-center transition-all ${
                            formData.fundingRequirement === range
                              ? 'bg-brand-50 border-brand-600 text-brand-700 font-bold shadow-xs'
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
                            className={`p-2.5 rounded-xl text-xs font-medium border text-left flex items-center justify-between transition-all ${
                              isSelected
                                ? 'bg-brand-50 border-brand-500 text-brand-800 font-bold shadow-xs'
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
                <h3 className="text-lg font-bold text-slate-900">Step 4 — Preferences & Target Market</h3>
                <p className="text-xs text-slate-500">Fine-tune your mentor and customer matching criteria.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Preferred Language *
                  </label>
                  <input
                    type="text"
                    value={formData.preferredLanguage}
                    onChange={(e) => setFormData({ ...formData, preferredLanguage: e.target.value })}
                    placeholder="e.g. Tamil / English, Hindi, etc."
                    className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Preferred Mentor Expertise
                  </label>
                  <input
                    type="text"
                    value={formData.preferredMentorExpertise}
                    onChange={(e) => setFormData({ ...formData, preferredMentorExpertise: e.target.value })}
                    placeholder="e.g. Performance Marketing, Packaging, Grants"
                    className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Mentorship Mode
                  </label>
                  <select
                    value={formData.mentorshipMode}
                    onChange={(e) => setFormData({ ...formData, mentorshipMode: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  >
                    <option value="Online">Online Video / Phone Consultations</option>
                    <option value="Offline">Offline / Regional Incubator Meetups</option>
                    <option value="Hybrid">Hybrid (Both)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Target Customer
                  </label>
                  <input
                    type="text"
                    value={formData.targetCustomer}
                    onChange={(e) => setFormData({ ...formData, targetCustomer: e.target.value })}
                    placeholder="e.g. Health-conscious families, gym goers"
                    className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Primary Market
                  </label>
                  <input
                    type="text"
                    value={formData.primaryMarket}
                    onChange={(e) => setFormData({ ...formData, primaryMarket: e.target.value })}
                    placeholder="e.g. Tamil Nadu & South India"
                    className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Stepper Navigation Buttons */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((s) => s - 1)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <span />
            )}

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((s) => s + 1)}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-xs hover:shadow transition-all cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white text-xs font-bold shadow-md shadow-brand-600/20 hover:shadow-lg transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-emerald-200" />
                <span>{isLoading ? 'Diagnosing...' : 'Generate My Growth Plan'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
