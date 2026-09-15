// client/src/services/api.js
// Production REST API client for Namma-Connect

let accessToken = null;

export function setAccessToken(token) {
  accessToken = token;
}

export function getAccessToken() {
  return accessToken;
}

async function request(endpoint, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  const response = await fetch(endpoint, {
    ...options,
    headers,
    credentials: 'include' // For HttpOnly refresh token cookie
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = data?.error?.message || data?.error || data?.message || 'Request failed';
    const err = new Error(message);
    err.statusCode = response.status;
    err.code = data?.error?.code || 'API_ERROR';
    err.fields = data?.error?.fields;
    throw err;
  }

  return data;
}

export const api = {
  // Health
  checkHealth: () => request('/api/v1/health'),

  // Auth
  auth: {
    register: (userData) => request('/api/v1/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
    login: (credentials) => request('/api/v1/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
    logout: () => request('/api/v1/auth/logout', { method: 'POST' }),
    refresh: () => request('/api/v1/auth/refresh', { method: 'POST' }),
    me: () => request('/api/v1/auth/me')
  },

  // Business
  business: {
    list: () => request('/api/v1/business'),
    get: (id) => request(`/api/v1/business/${id}`),
    create: (data) => request('/api/v1/business', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => request(`/api/v1/business/${id}`, { method: 'PATCH', body: JSON.stringify(data) })
  },

  // Diagnostic
  diagnostic: {
    submit: (assessmentData) => request('/api/v1/diagnostics', { method: 'POST', body: JSON.stringify(assessmentData) }),
    getLatest: (businessId) => request(`/api/v1/diagnostics/business/${businessId}/latest`)
  },

  // Growth Plan
  growthPlan: {
    get: (businessId) => request(`/api/v1/growth-plan/${businessId}`),
    completeAction: (planId, actionId, status) =>
      request(`/api/v1/growth-plan/${planId}/actions/${actionId}/complete`, {
        method: 'POST',
        body: JSON.stringify({ status })
      })
  },

  // Mentors
  mentors: {
    list: (params = '') => request(`/api/v1/mentors${params}`),
    get: (id) => request(`/api/v1/mentors/${id}`),
    requestMatch: (data) => request('/api/v1/mentors/matches', { method: 'POST', body: JSON.stringify(data) })
  },

  // Funding
  funding: {
    list: (params = '') => request(`/api/v1/funding${params}`),
    get: (id) => request(`/api/v1/funding/${id}`),
    apply: (id, data) => request(`/api/v1/funding/${id}/apply`, { method: 'POST', body: JSON.stringify(data) })
  },

  // Campaigns
  campaigns: {
    list: () => request('/api/v1/campaigns'),
    create: (data) => request('/api/v1/campaigns', { method: 'POST', body: JSON.stringify(data) }),
    getAnalytics: (id) => request(`/api/v1/campaigns/${id}/analytics`)
  },

  // Marketplace
  marketplace: {
    list: (params = '') => request(`/api/v1/marketplace${params}`),
    createProduct: (data) => request('/api/v1/marketplace/products', { method: 'POST', body: JSON.stringify(data) })
  },

  // Notifications
  notifications: {
    list: () => request('/api/v1/notifications'),
    markRead: (id) => request(`/api/v1/notifications/${id}/read`, { method: 'PATCH' }),
    markAllRead: () => request('/api/v1/notifications/mark-all-read', { method: 'POST' })
  }
};

export default api;
