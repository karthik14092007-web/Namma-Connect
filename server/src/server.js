// server/src/server.js
const app = require('./app');
const config = require('./config');
const { checkDatabaseConnection, db } = require('./lib/prisma');
const { seed } = require('../../prisma/seed');

async function startServer() {
  try {
    // Probe database connection
    const isDbConnected = await checkDatabaseConnection();

    // Seed benchmark demo data
    try {
      await seed();
    } catch (seedErr) {
      console.warn('[Seed] Warning during initial data seed:', seedErr.message);
    }

    const server = app.listen(config.port, '0.0.0.0', () => {
      console.log('========================================');
      console.log('      NAMMA-CONNECT API SERVER');
      console.log('========================================');
      console.log(`Environment: ${config.nodeEnv}`);
      console.log(`Server: http://localhost:${config.port}`);
      console.log(`Health: http://localhost:${config.port}/api/v1/health`);
      console.log(`Demo: http://localhost:${config.port}/api/demo/kavya`);
      console.log(`Database: ${isDbConnected ? 'connected' : 'disconnected'}`);
      console.log('========================================\n');
    });

    return server;
  } catch (err) {
    console.error('[Server Startup Error]:', err);
    process.exit(1);
  }
}

if (require.main === module) {
  startServer();
}

module.exports = { startServer };
