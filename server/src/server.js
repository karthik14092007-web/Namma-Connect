// server/src/server.js
const app = require('./app');
const config = require('./config');
const { checkDatabaseConnection } = require('./lib/prisma');
const { seed } = require('../../prisma/seed');

async function startServer() {
  try {
    // Probe database
    await checkDatabaseConnection();

    // Seed benchmark data
    await seed();

    app.listen(config.port, () => {
      console.log(`[Namma-Connect] Production Backend OS listening on http://localhost:${config.port}`);
      console.log(`[Namma-Connect] REST API v1: http://localhost:${config.port}/api/v1/health`);
    });
  } catch (err) {
    console.error('[Server Startup Error]:', err);
    process.exit(1);
  }
}

if (require.main === module) {
  startServer();
}

module.exports = { startServer };
