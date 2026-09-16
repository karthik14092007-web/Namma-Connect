import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  TrendingUp,
  User,
  Mail,
  Lock,
  Building2,
  MapPin,
  Tag,
  ArrowRight,
  AlertCircle,
  Loader2,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useFounder } from '../../context/FounderContext';
import Button from '../../components/ui/Button';

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const { onboardFounder } = useFounder();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    brandName: '',
    location: 'Madurai, Tamil Nadu',
    category: 'Healthy Snacks & Food',
    stage: 'Early traction'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Validation
    if (!formData.fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formData.email.trim()) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!formData.brandName.trim()) {
      setErrorMessage('Please enter your brand / business name.');
      return;
    }
    if (formData.password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match. Please check your password confirmation.');
      return;
    }

    setIsLoading(true);
    try {
      const session = await signup(formData);

      // Pre-seed local state with user's specific brand information
      if (onboardFounder) {
        await onboardFounder({
          founderName: formData.fullName,
          brandName: formData.brandName,
          location: formData.location,
          industry: formData.category,
          businessStage: formData.stage,
          diagnosticAnswers: {} // Needs initial diagnostic
        });
      }

      // Route to dedicated first-time founder onboarding flow
      navigate('/onboarding', { replace: true });
    } catch (err) {
      setErrorMessage(err.message || 'An error occurred during account creation.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-50 text-slate-900 selection:bg-brand-500 selection:text-white">
      {/* ---------------- Left / Branding Panel ---------------- */}
      <div className="lg:w-5/12 bg-slate-900 text-white p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden">
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <TrendingUp className="w-5 h-5 text-emerald-200 stroke-[2.5]" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-white block leading-tight">
                Namma<span className="text-brand-500">-Connect</span>
              </span>
              <span className="text-[10px] tracking-wider uppercase font-bold text-slate-400 block -mt-0.5">
                Growth OS
              </span>
            </div>
          </Link>
        </div>

        <div className="relative z-10 my-8 space-y-5 max-w-sm">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-950/80 border border-brand-500/30 text-emerald-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Join 140+ Growing Founders</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
            Build your growth system from day one.
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Stop guessing your marketing and sales priorities. Get an evidence-based diagnostic, transparent bottleneck scoring, and a structured 30-day execution plan.
          </p>

          <div className="space-y-2.5 pt-4 border-t border-slate-800 text-xs text-slate-300">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Free transparent growth diagnostic</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Matched with regional mentors & schemes</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Audience-targeted Launch Reels</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-[11px] text-slate-500">
          Default Membership: <strong className="text-slate-300">FOUNDER</strong> • Isolated & Secure
        </div>
      </div>

      {/* ---------------- Right / Signup Form Area ---------------- */}
      <div className="lg:w-7/12 flex items-center justify-center p-6 sm:p-10 lg:p-12">
        <div className="max-w-xl w-full space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/40">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-brand-600">
              Build your growth system.
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Create your Namma-Connect founder account
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Tell us a little about yourself and your brand to get started.
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-xs text-rose-800 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="font-medium">{errorMessage}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Kavya Murthy"
                    required
                    disabled={isLoading}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Address *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="kavya@nammacrunch.in"
                    required
                    disabled={isLoading}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Brand / Business Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    name="brandName"
                    value={formData.brandName}
                    onChange={handleChange}
                    placeholder="Namma Crunch"
                    required
                    disabled={isLoading}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Location *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Madurai, Tamil Nadu"
                    required
                    disabled={isLoading}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Business Category
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Tag className="w-4 h-4" />
                  </div>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 bg-white"
                  >
                    <option value="Healthy Snacks & Food">Healthy Snacks & Food</option>
                    <option value="Handicrafts & Artisanal">Handicrafts & Artisanal</option>
                    <option value="Sustainable Fashion & Apparel">Sustainable Fashion & Apparel</option>
                    <option value="Organic Beauty & Wellness">Organic Beauty & Wellness</option>
                    <option value="Agri-Products & Millets">Agri-Products & Millets</option>
                    <option value="Home & Living">Home & Living</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Founder Stage
                </label>
                <select
                  name="stage"
                  value={formData.stage}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 bg-white"
                >
                  <option value="Idea & Product Formulation">Idea & Formulation</option>
                  <option value="Early traction">Early Traction (Initial Orders)</option>
                  <option value="Scaling Sales & Distribution">Scaling Sales</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Password *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    disabled={isLoading}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Confirm Password *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    disabled={isLoading}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isLoading}
              icon={isLoading ? Loader2 : ArrowRight}
              iconPosition="right"
              className="w-full text-sm font-bold shadow-md shadow-brand-600/20 py-3 cursor-pointer mt-2"
            >
              {isLoading ? 'Creating Founder Account...' : 'Create Founder Account'}
            </Button>
          </form>

          <div className="text-center text-xs text-slate-500 pt-1">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-bold text-brand-600 hover:text-brand-700 hover:underline"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
