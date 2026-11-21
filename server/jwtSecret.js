/**
 * Shared JWT signing secret for admin session tokens.
 * Falls back to a randomly generated per-process secret when JWT_SECRET
 * is not configured, so admin sessions simply require re-login after a
 * server restart in that case instead of relying on a fixed, guessable key.
 */
const crypto = require('crypto');

let secret = process.env.JWT_SECRET && process.env.JWT_SECRET.trim();

if (!secret) {
  secret = crypto.randomBytes(32).toString('hex');
  console.warn('[SPS Auth] JWT_SECRET is not set in server/.env — using a randomly generated secret for this process.');
  console.warn('[SPS Auth] Admin sessions will not survive a server restart. Set JWT_SECRET in production.');
}

module.exports = secret;
