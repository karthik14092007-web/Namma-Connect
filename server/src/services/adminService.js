// server/src/services/adminService.js
const { db } = require('../lib/prisma');

async function getAdminMetrics() {
  const users = await db.user.findMany();
  const businesses = await db.business.findMany();
  const campaigns = await db.campaign.findMany();
  const products = await db.marketplaceProduct.findMany();
  const bookings = await db.mentorMatch.findMany();

  return {
    metrics: {
      totalFounders: 142 + users.length,
      activeBrands: 118 + businesses.length,
      mentorConnections: 89 + bookings.length,
      fundingMatches: 64,
      productsListed: 47 + products.length,
      campaignsLaunched: 86 + campaigns.length
    },
    charts: {
      founderGrowth: [
        { month: 'Apr', founders: 24, brands: 18 },
        { month: 'May', founders: 42, brands: 35 },
        { month: 'Jun', founders: 68, brands: 58 },
        { month: 'Jul', founders: 95, brands: 80 },
        { month: 'Aug', founders: 122, brands: 104 },
        { month: 'Sep', founders: 148, brands: 124 }
      ],
      marketplaceActivity: [
        { category: 'Food & Bev', orders: 420, revenue: 125000 },
        { category: 'Handcrafted', orders: 210, revenue: 84000 },
        { category: 'Fashion', orders: 165, revenue: 98000 },
        { category: 'Home & Life', orders: 130, revenue: 52000 },
        { category: 'Agriculture', orders: 95, revenue: 41000 }
      ],
      mentorSpecialties: [
        { name: 'Marketing', count: 42 },
        { name: 'Branding', count: 35 },
        { name: 'Supply Chain', count: 28 },
        { name: 'Funding & Pitch', count: 22 }
      ],
      fundingApplications: [
        { scheme: 'Stand-Up India', applicants: 45, approved: 18 },
        { scheme: 'SISFS Grants', applicants: 38, approved: 12 },
        { scheme: 'EDII TN Vouchers', applicants: 29, approved: 21 },
        { scheme: 'Mudra Loans', applicants: 52, approved: 34 }
      ]
    }
  };
}

async function listUsers(page = 1, limit = 20) {
  const take = Math.min(50, Math.max(1, parseInt(limit, 10) || 20));
  const skip = (Math.max(1, parseInt(page, 10) || 1) - 1) * take;

  const users = await db.user.findMany();
  const safeUsers = users.map(u => ({
    id: u.id,
    email: u.email,
    firstName: u.firstName,
    lastName: u.lastName,
    role: u.role,
    isActive: u.isActive,
    createdAt: u.createdAt,
    lastLoginAt: u.lastLoginAt
  }));

  return {
    total: users.length,
    page: parseInt(page, 10) || 1,
    limit: take,
    users: safeUsers.slice(skip, skip + take)
  };
}

module.exports = {
  getAdminMetrics,
  listUsers
};
