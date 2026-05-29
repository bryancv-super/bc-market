function getJwtSecret() {
  return process.env.JWT_SECRET || 'bc-market-development-secret';
}

module.exports = { getJwtSecret };
