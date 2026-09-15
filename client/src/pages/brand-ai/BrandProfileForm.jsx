// client/src/pages/brand-ai/BrandProfileForm.jsx
import React, { useState } from 'react';
import {
  Sparkles,
  X,
  RotateCcw,
  CheckCircle2,
  Building2,
  Target,
  IndianRupee,
  Layers,
  MapPin,
  Flame,
  Globe,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { DEFAULT_BRAND_PROFILE } from '../../services/brandAIService';

export default function BrandProfileForm({
  isOpen,
  onClose,
  currentProfile,
  onSaveAndAnalyze
}) {
  const [formData, setFormData] = useState({
    brandName: currentProfile?.brandName || DEFAULT_BRAND_PROFILE.brandName,
    productName: currentProfile?.productName || DEFAULT_BRAND_PROFILE.productName,
    category: currentProfile?.category || DEFAULT_BRAND_PROFILE.category,
    currentDescription: currentProfile?.currentDescription || DEFAULT_BRAND_PROFILE.currentDescription,
    targetCustomer: currentProfile?.targetCustomer || DEFAULT_BRAND_PROFILE.targetCustomer,
    location: currentProfile?.location || DEFAULT_BRAND_PROFILE.location,
    priceRange: currentProfile?.priceRange || DEFAULT_BRAND_PROFILE.priceRange,
    usp: currentProfile?.usp || DEFAULT_BRAND_PROFILE.usp,
    competitors: currentProfile?.competitors || DEFAULT_BRAND_PROFILE.competitors,
    websiteUrl: currentProfile?.websiteUrl || DEFAULT_BRAND_PROFILE.websiteUrl,
    marketingChallenge: currentProfile?.marketingChallenge || DEFAULT_BRAND_PROFILE.marketingChallenge
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleAutofill = () => {
    setFormData({ ...DEFAULT_BRAND_PROFILE });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      onSaveAndAnalyze(formData);
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 leading-tight">
                Brand Profile & Market Context
              </h2>
              <p className="text-xs text-slate-500">
                Provide your D2C business fundamentals to power your tailored brand positioning
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleAutofill}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 font-bold text-xs transition-colors cursor-pointer"
              title="Pre-fill with benchmark Kavya / Namma Crunch data"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
              <span>⚡ Autofill Namma Crunch</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-6 flex-1 text-xs">
          {/* Row 1: Brand & Product */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1.5">
                Brand Name *
              </label>
              <input
                type="text"
                required
                value={formData.brandName}
                onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 font-semibold text-slate-800"
                placeholder="e.g. Namma Crunch"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1.5">
                Product / Service Line *
              </label>
              <input
                type="text"
                required
                value={formData.productName}
                onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 font-semibold text-slate-800"
                placeholder="e.g. Millet-based healthy snacks"
              />
            </div>
          </div>

          {/* Row 2: Category, Location, Price */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1.5">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 font-semibold text-slate-800 bg-white"
              >
                <option value="Food & Beverage">Food & Beverage</option>
                <option value="Personal Care & Beauty">Personal Care & Beauty</option>
                <option value="Apparel & Textiles">Apparel & Textiles</option>
                <option value="Home & Living">Home & Living</option>
                <option value="Wellness & Nutrition">Wellness & Nutrition</option>
                <option value="Handicrafts & Artisanal">Handicrafts & Artisanal</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1.5">
                Location / Regional Market *
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 font-semibold text-slate-800"
                placeholder="e.g. Madurai, Tamil Nadu"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1.5">
                Price Range *
              </label>
              <input
                type="text"
                required
                value={formData.priceRange}
                onChange={(e) => setFormData({ ...formData, priceRange: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 font-semibold text-slate-800"
                placeholder="e.g. ₹200–₹400"
              />
            </div>
          </div>

          {/* Row 3: Current Description */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-bold text-slate-700">
                Current Brand Description / Pitch *
              </label>
              <span className="text-[11px] text-slate-400">
                What you tell customers today
              </span>
            </div>
            <textarea
              rows={2}
              required
              value={formData.currentDescription}
              onChange={(e) => setFormData({ ...formData, currentDescription: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium text-slate-800 resize-none"
              placeholder="e.g. Healthy and tasty snacks for everyone made with traditional millets."
            />
          </div>

          {/* Row 4: Target Customer & USP */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1.5">
                Target Customer Segment *
              </label>
              <input
                type="text"
                required
                value={formData.targetCustomer}
                onChange={(e) => setFormData({ ...formData, targetCustomer: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium text-slate-800"
                placeholder="e.g. Young professionals & office workers"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1.5">
                Unique Selling Proposition (USP) *
              </label>
              <input
                type="text"
                required
                value={formData.usp}
                onChange={(e) => setFormData({ ...formData, usp: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium text-slate-800"
                placeholder="e.g. Slow-roasted native millets with zero palm oil"
              />
            </div>
          </div>

          {/* Row 5: Competitors & Website */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1.5">
                Main Competitors (Comma separated)
              </label>
              <input
                type="text"
                value={formData.competitors}
                onChange={(e) => setFormData({ ...formData, competitors: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium text-slate-800"
                placeholder="e.g. Lay's, Haldiram's, Yoga Bar"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1.5">
                Website / Social Media URL (Optional)
              </label>
              <input
                type="text"
                value={formData.websiteUrl}
                onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium text-slate-800"
                placeholder="e.g. https://nammacrunch.in or instagram.com/nammacrunch"
              />
            </div>
          </div>

          {/* Row 6: Biggest Marketing Challenge */}
          <div>
            <label className="font-bold text-slate-700 block mb-1.5">
              Biggest Marketing Challenge *
            </label>
            <input
              type="text"
              required
              value={formData.marketingChallenge}
              onChange={(e) => setFormData({ ...formData, marketingChallenge: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium text-slate-800"
              placeholder="e.g. Low brand awareness, broad messaging, and converting followers into repeat D2C buyers"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 font-bold transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs shadow-md transition-all cursor-pointer"
            >
              <Sparkles className={`w-4 h-4 text-emerald-200 ${isSubmitting ? 'animate-spin' : ''}`} />
              <span>{isSubmitting ? 'Analyzing Brand...' : 'Analyze My Brand →'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
