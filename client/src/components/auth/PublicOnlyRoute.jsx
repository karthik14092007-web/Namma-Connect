import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingWorkspace from './LoadingWorkspace';

export default function PublicOnlyRoute({ children }) {
  const { isAuthenticated, isAdmin, authLoading } = useAuth();

  if (authLoading) {
    return <LoadingWorkspace message="Checking session state..." />;
  }

  if (isAuthenticated) {
    return <Navigate to={isAdmin ? '/admin' : '/dashboard'} replace />;
  }

  return children;
}
