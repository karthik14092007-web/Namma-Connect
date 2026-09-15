// server/src/routes/healthRoutes.js
const express = require('express');
const router = express.Router();
const { db } = require('../lib/prisma');

router.get('/health', async (req, res) => {
  if (db.isConnected) {
    return res.status(200).json({
      success: true,
      status: 'healthy',
      service: 'namma-connect-api',
      database: 'connected'
    });
  } else {
    return res.status(200).json({
      success: false,
      status: 'degraded',
      service: 'namma-connect-api',
      database: 'disconnected'
    });
  }
});

module.exports = router;
