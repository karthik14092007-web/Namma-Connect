import { supabase, isSupabaseConfigured } from './supabase';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
const AUTH_STORAGE_KEY = 'namma_connect_auth_session';

export const authService = {
  /**
   * Log in user via Supabase Auth or backend API
   */
  async login(email, password) {
    const cleanEmail = (email || '').trim().toLowerCase();
    if (!cleanEmail || !password) {
      throw new Error('Please enter both email and password.');
    }

    // 1. Try real Supabase Auth if credentials are configured
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password: password
        });
        if (!error && data?.session) {
          const profile = await this.fetchUserProfile(data.session.access_token);
          const sessionPayload = {
            accessToken: data.session.access_token,
            user: {
              id: data.user.id,
              email: data.user.email,
              name: profile.name || data.user.user_metadata?.full_name || 'Founder',
              role: profile.role || data.user.user_metadata?.role || 'FOUNDER',
              brandName: profile.brandName || data.user.user_metadata?.brand_name || 'My Brand',
              location: profile.location || 'Tamil Nadu'
            }
          };
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionPayload));
          return sessionPayload;
        }
      } catch (err) {
        console.warn('Supabase Auth error, attempting local backend auth:', err.message);
      }
    }

    // 2. Call FastAPI backend authentication endpoint
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, password })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || data.error || 'Incorrect email or password.');
      }

      const sessionPayload = {
        accessToken: data.accessToken,
        user: {
          id: data.user.id,
          email: data.user.email,
          name: `${data.user.firstName || ''} ${data.user.lastName || ''}`.trim() || 'Founder',
          role: data.user.role || 'FOUNDER',
          brandName: data.user.brandName || (cleanEmail.includes('kavya') ? 'Namma Crunch' : 'My Brand'),
          location: data.user.location || (cleanEmail.includes('kavya') ? 'Madurai, Tamil Nadu' : 'Tamil Nadu')
        }
      };

      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionPayload));
      return sessionPayload;
    } catch (err) {
      if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        // In fully disconnected offline mode, verify password locally for known demo accounts
        if (cleanEmail === 'kavya@nammacrunch.in' && ['founder@123', 'password123', 'demo'].includes(password.toLowerCase())) {
          const fallbackSession = {
            accessToken: 'offline-jwt-kavya',
            user: {
              id: 'usr-kavya-1',
              email: 'kavya@nammacrunch.in',
              name: 'Kavya Narayanan',
              role: 'FOUNDER',
              brandName: 'Namma Crunch',
              location: 'Madurai, Tamil Nadu'
            }
          };
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(fallbackSession));
          return fallbackSession;
        } else if (cleanEmail === 'admin@nammaconnect.in' && ['admin@123', 'admin123', 'demo'].includes(password.toLowerCase())) {
          const fallbackSession = {
            accessToken: 'offline-jwt-admin',
            user: {
              id: 'usr-admin-1',
              email: 'admin@nammaconnect.in',
              name: 'Ecosystem Admin',
              role: 'ADMIN',
              brandName: 'Namma-Connect HQ',
              location: 'Chennai, Tamil Nadu'
            }
          };
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(fallbackSession));
          return fallbackSession;
        }
        throw new Error('Unable to connect to server. Please verify the server is running.');
      }
      throw err;
    }
  },

  /**
   * Register a new founder account
   * Strictly assigns role = 'FOUNDER' (disallows public creation of ADMIN)
   */
  async signup(signupData) {
    const cleanEmail = (signupData.email || '').trim().toLowerCase();
    const password = signupData.password;

    if (!cleanEmail || !password) {
      throw new Error('Email and password are required.');
    }
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long.');
    }
    if (signupData.password !== signupData.confirmPassword) {
      throw new Error('Passwords do not match.');
    }

    const payload = {
      email: cleanEmail,
      password: password,
      firstName: (signupData.fullName || 'Founder').split(' ')[0],
      lastName: (signupData.fullName || '').split(' ').slice(1).join(' ') || '',
      role: 'FOUNDER', // Forced default role
      location: signupData.location || 'Tamil Nadu',
      brandName: signupData.brandName || 'My D2C Brand',
      category: signupData.category || 'Food & Beverages',
      stage: signupData.stage || 'Early traction'
    };

    // 1. If Supabase configured, create Supabase user
    if (isSupabaseConfigured) {
      try {
        await supabase.auth.signUp({
          email: cleanEmail,
          password: password,
          options: {
            data: {
              full_name: signupData.fullName,
              brand_name: signupData.brandName,
              role: 'FOUNDER'
            }
          }
        });
      } catch (err) {
        console.warn('Supabase signUp warning:', err);
      }
    }

    // 2. Call backend register endpoint
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || data.error || 'Registration failed. Please try again.');
      }

      const sessionPayload = {
        accessToken: data.accessToken,
        user: {
          id: data.user.id,
          email: data.user.email,
          name: signupData.fullName || 'Founder',
          role: 'FOUNDER',
          brandName: signupData.brandName || 'My Brand',
          location: signupData.location || 'Tamil Nadu',
          category: signupData.category || 'Food & Beverages',
          stage: signupData.stage || 'Early traction',
          needsOnboarding: true
        }
      };

      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionPayload));
      return sessionPayload;
    } catch (err) {
      if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        // Offline registration fallback for resilience
        const newUserId = `usr-${Date.now()}`;
        const sessionPayload = {
          accessToken: `token-${newUserId}`,
          user: {
            id: newUserId,
            email: cleanEmail,
            name: signupData.fullName || 'Founder',
            role: 'FOUNDER',
            brandName: signupData.brandName || 'My Brand',
            location: signupData.location || 'Tamil Nadu',
            category: signupData.category || 'Food & Beverages',
            stage: signupData.stage || 'Early traction',
            needsOnboarding: true
          }
        };
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionPayload));
        return sessionPayload;
      }
      throw err;
    }
  },

  /**
   * Fetch current authenticated user profile from backend
   */
  async fetchUserProfile(token) {
    if (!token) return null;
    try {
      const res = await fetch(`${API_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        return data.user || data;
      }
    } catch (err) {
      console.warn('Could not verify token with backend:', err.message);
    }
    return null;
  },

  /**
   * Restore existing session from localStorage or Supabase
   */
  async getStoredSession() {
    // Check Supabase first if configured
    if (isSupabaseConfigured) {
      try {
        const { data } = await supabase.auth.getSession();
        if (data?.session) {
          const profile = await this.fetchUserProfile(data.session.access_token);
          return {
            accessToken: data.session.access_token,
            user: {
              id: data.session.user.id,
              email: data.session.user.email,
              name: profile?.name || data.session.user.user_metadata?.full_name || 'Founder',
              role: profile?.role || data.session.user.user_metadata?.role || 'FOUNDER',
              brandName: profile?.brandName || data.session.user.user_metadata?.brand_name || 'My Brand',
              location: profile?.location || 'Tamil Nadu'
            }
          };
        }
      } catch (err) {
        console.warn('Error reading Supabase session:', err);
      }
    }

    // Read stored session from localStorage
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!stored) return null;

    try {
      const session = JSON.parse(stored);
      if (!session?.accessToken || !session?.user) {
        localStorage.removeItem(AUTH_STORAGE_KEY);
        return null;
      }
      return session;
    } catch {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      return null;
    }
  },

  /**
   * Log out current user
   */
  async logout() {
    try {
      if (isSupabaseConfigured) {
        await supabase.auth.signOut();
      }
    } catch (err) {
      console.warn('Error during Supabase sign out:', err);
    }
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
};
