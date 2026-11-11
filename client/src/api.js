/**
 * Sai Prudent Platform - Central API Service Configuration
 * 
 * Supports:
 * - Direct cross-origin backend deployments (e.g., Render, Railway, Fly.io, Cyclic)
 * - Vercel Serverless Function deployments (/api)
 * - Vite environment variable: VITE_API_URL
 * - LocalStorage override: sps_api_url (for quick testing)
 * - Relative URLs for local dev and reverse-proxy setups
 */

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
  return '';
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
