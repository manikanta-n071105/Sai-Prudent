/**
 * Admin session token helpers (signing + Express middleware).
 */
const jwt = require('jsonwebtoken');
const JWT_SECRET = require('./jwtSecret');

const TOKEN_TTL = '8h';

function signAdminToken(admin) {
  return jwt.sign(
    { id: admin.id, username: admin.username, role: admin.role },
    JWT_SECRET,
    { expiresIn: TOKEN_TTL }
  );
}

function verifyAdminToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (e) {
    return null;
  }
}

function getBearerToken(req) {
  const header = req.headers && req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) return null;
  return header.slice(7).trim();
}

// Express middleware: rejects the request unless it carries a valid admin session token.
function requireAdmin(req, res, next) {
  const token = getBearerToken(req);
  if (!token) {
    return res.status(401).json({ success: false, error: 'Admin authentication required. Please sign in to the Admin Console.' });
  }
  const payload = verifyAdminToken(token);
  if (!payload) {
    return res.status(401).json({ success: false, error: 'Invalid or expired admin session. Please sign in again.' });
  }
  req.admin = payload;
  next();
}

module.exports = {
  signAdminToken,
  verifyAdminToken,
  getBearerToken,
  requireAdmin
};
