function health(req, res) {
  res.json({
    success: true,
    data: {
      status: 'ok',
      service: 'bc-market-api',
      timestamp: new Date().toISOString(),
    },
  });
}

module.exports = { health };
