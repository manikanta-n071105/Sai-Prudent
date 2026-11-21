/**
 * Sai Prudent Platform - Central API Service Configuration
 * 
 * Supports:
 * - Direct production Render backend deployment (https://sai-prudent-1.onrender.com)
 * - LocalStorage override: sps_api_url (configured via Admin Panel modal)
 * - Vite environment variable: VITE_API_URL
 * - Window injection: window.__API_URL__
 */

export const DEPLOYED_RENDER_API_URL = 'https://sai-prudent-1.onrender.com';
const LOCAL_DEV_API_URL = 'http://localhost:5000';
const ADMIN_TOKEN_KEY = 'sps_admin_token';

export const getApiBaseUrl = () => {
  if (typeof window !== 'undefined' && window.__API_URL__) {
    return window.__API_URL__.replace(/\/$/, '');
  }
  if (typeof window !== 'undefined' && window.localStorage) {
    const saved = localStorage.getItem('sps_api_url');
    if (saved) return saved.replace(/\/$/, '');
  }
  const envUrl = import.meta.env?.VITE_API_URL;
  if (envUrl) {
    return envUrl.replace(/\/$/, '');
  }
  // In local development (vite dev), default to the local backend so testing never
  // silently reads/writes the live production database. Production builds still
  // default to the deployed Render backend exactly as before.
  if (import.meta.env?.DEV) {
    return LOCAL_DEV_API_URL;
  }
  // Default to the official deployed production backend on Render
  return DEPLOYED_RENDER_API_URL;
};

export const API_BASE_URL = getApiBaseUrl();

// --- Admin session token helpers -------------------------------------------------
export const getAdminToken = () => {
  if (typeof window === 'undefined' || !window.localStorage) return null;
  return localStorage.getItem(ADMIN_TOKEN_KEY);
};

export const setAdminToken = (token) => {
  if (typeof window === 'undefined' || !window.localStorage) return;
  localStorage.setItem(ADMIN_TOKEN_KEY, token);
};

export const clearAdminToken = () => {
  if (typeof window === 'undefined' || !window.localStorage) return;
  localStorage.removeItem(ADMIN_TOKEN_KEY);
};

export const isAdminAuthenticated = () => !!getAdminToken();

/**
 * Enhanced fetch wrapper that prepends the configured API base URL
 * to any relative endpoint path starting with '/api', and automatically
 * attaches the admin session token (when present) so protected endpoints work
 * without every call site having to manage the Authorization header itself.
 */
export const apiFetch = async (endpoint, options = {}) => {
  const base = getApiBaseUrl();
  const url = endpoint.startsWith('http')
    ? endpoint
    : `${base}${endpoint}`;

  const token = getAdminToken();
  const headers = { ...(options.headers || {}) };
  if (token && !headers.Authorization && !headers.authorization) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(url, { ...options, headers });

  // An expired/invalid admin session should drop back to the login screen
  // instead of silently failing every subsequent admin action.
  if (res.status === 401 && token) {
    clearAdminToken();
  }

  return res;
};

export default apiFetch;
