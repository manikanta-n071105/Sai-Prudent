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
  // Default to the official deployed production backend on Render
  return DEPLOYED_RENDER_API_URL;
};

export const API_BASE_URL = getApiBaseUrl();

/**
 * Enhanced fetch wrapper that prepends the configured API base URL
 * to any relative endpoint path starting with '/api'
 */
export const apiFetch = (endpoint, options = {}) => {
  const base = getApiBaseUrl();
  const url = endpoint.startsWith('http') 
    ? endpoint 
    : `${base}${endpoint}`;

  return fetch(url, options);
};

export default apiFetch;
