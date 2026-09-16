import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import LoadingWorkspace from './LoadingWorkspace';
import Button from '../ui/Button';

export default function AdminRoute({ children }) {
  const { isAuthenticated, isAdmin, authLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (authLoading) {
    return <LoadingWorkspace message="Checking ecosystem permissions..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-8 h-8" />
          </div>
          
          <div className="space-y-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
              403 Forbidden
            </span>
            <h2 className="text-xl font-black text-slate-900">Access Denied</h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              You are currently signed in as a <strong>Founder</strong>. The Ecosystem Admin area requires verified administrative privileges.
            </p>
          </div>

          <div className="pt-2">
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate('/dashboard')}
              icon={ArrowLeft}
              iconPosition="left"
              className="w-full"
            >
              Return to Founder Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
