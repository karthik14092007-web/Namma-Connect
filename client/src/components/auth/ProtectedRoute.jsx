import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingWorkspace from './LoadingWorkspace';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, authLoading } = useAuth();
  const location = useLocation();

  if (authLoading) {
    return <LoadingWorkspace message="Verifying founder credentials..." />;
  }

  if (!isAuthenticated) {
    const targetUrl = location.pathname + location.search;
    return <Navigate to={`/login?redirect=${encodeURIComponent(targetUrl)}`} replace />;
  }

  return children;
}
