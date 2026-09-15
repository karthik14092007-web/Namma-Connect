// server/src/services/auditService.js
const { db } = require('../lib/prisma');

async function logAudit({ userId, action, entity, entityId, metadata, ipAddress }) {
  try {
    await db.auditLog.create({
      data: {
        userId: userId || null,
        action,
        entity,
        entityId: entityId ? String(entityId) : null,
        metadata: metadata ? JSON.stringify(metadata) : null,
        ipAddress: ipAddress || null
      }
    });
  } catch (err) {
    console.warn('[AuditLog] Failed to record audit entry:', err.message);
  }
}

module.exports = {
  logAudit
};
