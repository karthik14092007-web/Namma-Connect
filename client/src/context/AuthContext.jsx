import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { supabase, isSupabaseConfigured } from '../services/supabase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize session on startup
  useEffect(() => {
    let mounted = true;

    const restoreSession = async () => {
      try {
        const stored = await authService.getStoredSession();
        if (mounted && stored) {
          setSession(stored);
          setUser(stored.user);
        }
      } catch (err) {
        console.warn('Session restoration failed:', err);
      } finally {
        if (mounted) {
          setAuthLoading(false);
        }
      }
    };

    restoreSession();

    // Listen to Supabase auth events if configured
    let authSubscription = null;
    if (isSupabaseConfigured) {
      const { data } = supabase.auth.onAuthStateChange(async (event, sbSession) => {
        if (event === 'SIGNED_OUT') {
          setUser(null);
          setSession(null);
        } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          if (sbSession) {
            const profile = await authService.fetchUserProfile(sbSession.access_token);
            const userPayload = {
              id: sbSession.user.id,
              email: sbSession.user.email,
              name: profile?.name || sbSession.user.user_metadata?.full_name || 'Founder',
              role: profile?.role || sbSession.user.user_metadata?.role || 'FOUNDER',
              brandName: profile?.brandName || sbSession.user.user_metadata?.brand_name || 'My Brand',
              location: profile?.location || 'Tamil Nadu'
            };
            setUser(userPayload);
            setSession({ accessToken: sbSession.access_token, user: userPayload });
          }
        }
      });
      authSubscription = data.subscription;
    }

    return () => {
      mounted = false;
      if (authSubscription) {
        authSubscription.unsubscribe();
      }
    };
  }, []);

  const login = async (email, password) => {
    setError(null);
    try {
      const sessionData = await authService.login(email, password);
      setSession(sessionData);
      setUser(sessionData.user);
      return sessionData;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const signup = async (signupData) => {
    setError(null);
    try {
      const sessionData = await authService.signup(signupData);
      setSession(sessionData);
      setUser(sessionData.user);
      return sessionData;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      setUser(null);
      setSession(null);
      setError(null);
    }
  };

  const loginAsDemo = async (persona = 'kavya') => {
    if (persona === 'admin') {
      return await login('admin@nammaconnect.in', 'Admin@123');
    }
    return await login('kavya@nammacrunch.in', 'Founder@123');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isAuthenticated: Boolean(user),
        isAdmin: user?.role === 'ADMIN',
        authLoading,
        error,
        setError,
        login,
        signup,
        logout,
        loginAsDemo
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
