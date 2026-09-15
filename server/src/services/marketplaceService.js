// server/src/services/marketplaceService.js
const { db } = require('../lib/prisma');
const { logAudit } = require('./auditService');

async function listProducts({ category, search, page = 1, limit = 20 }) {
  const take = Math.min(50, Math.max(1, parseInt(limit, 10) || 20));
  const skip = (Math.max(1, parseInt(page, 10) || 1) - 1) * take;

  let products = await db.marketplaceProduct.findMany({
    where: { isActive: true }
  });

  if (category && category !== 'All') {
    products = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    products = products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      (p.brand && p.brand.toLowerCase().includes(q))
    );
  }

  const paginated = products.slice(skip, skip + take);

  return {
    total: products.length,
    page: parseInt(page, 10) || 1,
    limit: take,
    products: paginated
  };
}

async function getProductById(id) {
  const product = await db.marketplaceProduct.findUnique({ where: { id } });
  if (!product) {
    const error = new Error('Product not found');
    error.statusCode = 404;
    throw error;
  }
  return product;
}

async function createProduct(founderId, data, ipAddress) {
  let businessId = data.businessId;
  if (!businessId) {
    const biz = await db.business.findFirst({ where: { founderId } });
    businessId = biz ? biz.id : 'biz-default';
  }

  const product = await db.marketplaceProduct.create({
    data: {
      businessId,
      name: data.name,
      description: data.description,
      category: data.category,
      price: Number(data.price),
      originalPrice: data.originalPrice ? Number(data.originalPrice) : Number(data.price) + 50,
      unit: data.unit || 'Pack of 1',
      imageUrl: data.imageUrl || 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=500&auto=format&fit=crop&q=80',
      stock: data.stock !== undefined ? Number(data.stock) : 100,
      isVerified: true,
      isActive: true
    }
  });

  await db.notification.create({
    data: {
      userId: founderId,
      title: 'Product Listed on Marketplace',
      message: `🛍️ '${product.name}' is now live on the Namma-Connect regional D2C Marketplace!`,
      type: 'SYSTEM',
      read: false,
      link: '/marketplace'
    }
  });

  await logAudit({
    userId: founderId,
    action: 'PRODUCT_CREATED',
    entity: 'MarketplaceProduct',
    entityId: product.id,
    ipAddress
  });

  return product;
}

async function updateProduct(id, data, userId, ipAddress) {
  const updated = await db.marketplaceProduct.update({
    where: { id },
    data
  });

  await logAudit({
    userId,
    action: 'PRODUCT_UPDATED',
    entity: 'MarketplaceProduct',
    entityId: id,
    ipAddress
  });

  return updated;
}

async function deleteProduct(id, userId, ipAddress) {
  await db.marketplaceProduct.update({
    where: { id },
    data: { isActive: false }
  });

  await logAudit({
    userId,
    action: 'PRODUCT_DELETED',
    entity: 'MarketplaceProduct',
    entityId: id,
    ipAddress
  });

  return { success: true };
}

module.exports = {
  listProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
