const jwt = require('jsonwebtoken');
const { getJwtSecret } = require('../utils/env');
const { createHttpError } = require('../utils/http-error');

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return next(createHttpError(401, 'Authentication token is required'));
  }

  try {
    req.user = jwt.verify(token, getJwtSecret());
    next();
  } catch (error) {
    next(createHttpError(401, 'Invalid or expired authentication token'));
  }
}

module.exports = { requireAuth };
