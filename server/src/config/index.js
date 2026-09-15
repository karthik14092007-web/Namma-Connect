// server/src/config/index.js
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/nammaconnect?schema=public',
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET || 'namma_connect_access_secret_production_ready_key_2026',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'namma_connect_refresh_secret_production_ready_key_2026',
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
    refreshExpiresInDays: 7
  },
  cors: {
    origin: process.env.CLIENT_URL ? [process.env.CLIENT_URL, 'http://localhost:5173', 'http://localhost:5000'] : true,
    credentials: true
  },
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200 // limit each IP to 200 requests per windowMs
  },
  authRateLimit: {
    windowMs: 15 * 60 * 1000,
    max: 30 // 30 requests per 15 mins on auth
  }
};
