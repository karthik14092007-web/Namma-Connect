// server/src/services/businessService.js
const { db } = require('../lib/prisma');
const { logAudit } = require('./auditService');

async function getBusinessesForFounder(founderId) {
  return db.business.findMany({
    where: { founderId, isActive: true }
  });
}

async function getBusinessById(id) {
  const business = await db.business.findUnique({ where: { id } });
  if (!business) {
    const error = new Error('Business not found');
    error.statusCode = 404;
    throw error;
  }
  return business;
}

async function createBusiness(founderId, data, ipAddress) {
  const business = await db.business.create({
    data: {
      founderId,
      name: data.name,
      category: data.category,
      description: data.description,
      location: data.location,
      stage: data.stage || 'EARLY_TRACTION',
      monthlyRevenue: data.monthlyRevenue,
      fundingRequirement: data.fundingRequirement,
      website: data.website,
      logoUrl: data.logoUrl,
      isActive: true
    }
  });

  await logAudit({
    userId: founderId,
    action: 'BUSINESS_CREATED',
    entity: 'Business',
    entityId: business.id,
    ipAddress
  });

  return business;
}

async function updateBusiness(id, data, userId, ipAddress) {
  const updated = await db.business.update({
    where: { id },
    data
  });

  await logAudit({
    userId,
    action: 'BUSINESS_UPDATED',
    entity: 'Business',
    entityId: id,
    ipAddress
  });

  return updated;
}

async function deleteBusiness(id, userId, ipAddress) {
  await db.business.update({
    where: { id },
    data: { isActive: false }
  });

  await logAudit({
    userId,
    action: 'BUSINESS_DELETED',
    entity: 'Business',
    entityId: id,
    ipAddress
  });

  return { success: true };
}

module.exports = {
  getBusinessesForFounder,
  getBusinessById,
  createBusiness,
  updateBusiness,
  deleteBusiness
};
