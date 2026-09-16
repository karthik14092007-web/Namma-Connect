import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  TrendingUp,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  Loader2,
  Sparkles,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginAsDemo } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Extract redirect URL from query string if present
  const queryParams = new URLSearchParams(location.search);
  const redirectUrl = queryParams.get('redirect') || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim()) {
      setErrorMessage('Please enter your email address.');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setIsLoading(true);
    try {
      const session = await login(email, password);
      const target = session.user.role === 'ADMIN' ? '/admin' : redirectUrl;
      navigate(target, { replace: true });
    } catch (err) {
      setErrorMessage(err.message || 'Incorrect email or password.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemoLogin = async (persona) => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      if (persona === 'kavya') {
        setEmail('kavya@nammacrunch.in');
        setPassword('Founder@123');
        const session = await login('kavya@nammacrunch.in', 'Founder@123');
        navigate(redirectUrl === '/admin' ? '/dashboard' : redirectUrl, { replace: true });
      } else if (persona === 'admin') {
        setEmail('admin@nammaconnect.in');
        setPassword('Admin@123');
        await login('admin@nammaconnect.in', 'Admin@123');
        navigate('/admin', { replace: true });
      }
    } catch (err) {
      setErrorMessage(err.message || 'Demo login failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-50 text-slate-900 selection:bg-brand-500 selection:text-white">
      {/* ---------------- Left / Branding Visual Area ---------------- */}
      <div className="lg:w-1/2 bg-slate-900 text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden">
        {/* Subtle geometric pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(15,23,42,0.9))]" />

        {/* Top brand header */}
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

        {/* Main Value Proposition */}
        <div className="relative z-10 my-12 lg:my-0 space-y-6 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-950/80 border border-brand-500/30 text-emerald-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Built for Early-Stage D2C Founders</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Your Founder Growth Operating System.
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Understand your business. Identify what matters next. Connect with the right opportunities.
          </p>

          <div className="space-y-3 pt-4 border-t border-slate-800/80 text-xs sm:text-sm text-slate-300">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>24-Signal transparent growth diagnostic</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Prioritized 30-day bottleneck action plan</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Verified D2C mentors, state grants & Launch Reels</span>
            </div>
          </div>
        </div>

        {/* Bottom footer credit */}
        <div className="relative z-10 text-xs text-slate-500 flex items-center justify-between">
          <span>Namma-Connect Platform</span>
          <span className="font-mono text-[11px]">Security: Supabase + FastAPI</span>
        </div>
      </div>

      {/* ---------------- Right / Authentication Card Area ---------------- */}
      <div className="lg:w-1/2 flex items-center justify-center p-6 sm:p-10 lg:p-16">
        <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/40">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-brand-600">
              Welcome back, Founder.
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Sign in to your account
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Enter your founder credentials to access your growth dashboard.
            </p>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-xs text-rose-800 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="font-medium">{errorMessage}</div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="founder@brand.in"
                  disabled={isLoading}
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 text-sm text-slate-900 placeholder:text-slate-400 transition-all disabled:bg-slate-50 disabled:text-slate-400"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={isLoading}
                  required
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 text-sm text-slate-900 placeholder:text-slate-400 transition-all disabled:bg-slate-50 disabled:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isLoading}
              icon={isLoading ? Loader2 : ArrowRight}
              iconPosition="right"
              className="w-full text-sm font-bold shadow-md shadow-brand-600/20 py-3 cursor-pointer"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          {/* Quick Demo Logins for Hackathon Evaluators */}
          <div className="pt-4 border-t border-slate-100 space-y-2.5">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block text-center">
              ⚡ Instant 1-Click Evaluation Credentials
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('kavya')}
                disabled={isLoading}
                className="p-2.5 rounded-xl border border-amber-200 bg-amber-50/70 hover:bg-amber-100/80 text-left transition-colors cursor-pointer group"
              >
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 block">
                  Demo Founder
                </span>
                <span className="text-xs font-bold text-slate-900 block truncate">
                  Kavya Murthy
                </span>
                <span className="text-[10px] text-slate-500 block truncate">
                  Namma Crunch (52/65)
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('admin')}
                disabled={isLoading}
                className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-left transition-colors cursor-pointer group"
              >
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-700 block">
                  Ecosystem Admin
                </span>
                <span className="text-xs font-bold text-slate-900 block truncate">
                  Platform Admin
                </span>
                <span className="text-[10px] text-slate-500 block truncate">
                  Full Analytics (403 Test)
                </span>
              </button>
            </div>
          </div>

          {/* Switch to Signup */}
          <div className="text-center text-xs text-slate-500 pt-2">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="font-bold text-brand-600 hover:text-brand-700 hover:underline"
            >
              Create founder account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
