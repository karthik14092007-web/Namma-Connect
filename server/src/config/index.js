// server/src/config/index.js
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from possible locations
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config();

const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:5000',
  'http://127.0.0.1:5000'
];

if (process.env.CLIENT_URL && !allowedOrigins.includes(process.env.CLIENT_URL)) {
  allowedOrigins.push(process.env.CLIENT_URL);
}

module.exports = {
  port: parseInt(process.env.PORT, 10) || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/nammaconnect?schema=public',
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET || 'namma_connect_access_secret_production_ready_key_2026',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'namma_connect_refresh_secret_production_ready_key_2026',
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
    refreshExpiresInDays: 7
  },
  cors: {
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, postman, or browser direct navigation)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, true); // Permissive in development, but credentialed
      }
    },
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

