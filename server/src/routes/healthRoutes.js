// server/src/routes/healthRoutes.js
const express = require('express');
const router = express.Router();
const { db } = require('../lib/prisma');

router.get('/health', async (req, res) => {
  res.json({
    success: true,
    status: 'healthy',
    app: 'Namma-Connect Production Backend OS',
    version: '1.0.0',
    database: db.isConnected ? 'connected' : 'resilient-in-memory-active',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
