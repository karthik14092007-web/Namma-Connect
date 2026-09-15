// server/src/controllers/marketplaceController.js
const marketplaceService = require('../services/marketplaceService');
const { success, error } = require('../utils/apiResponse');

async function listProducts(req, res) {
  try {
    const { category, search, page, limit } = req.query;
    const result = await marketplaceService.listProducts({ category, search, page, limit });
    return success(res, result, 200);
  } catch (err) {
    return error(res, err.message, 'LIST_PRODUCTS_FAILED', 500);
  }
}

async function getProduct(req, res) {
  try {
    const product = await marketplaceService.getProductById(req.params.id);
    return success(res, { product }, 200);
  } catch (err) {
    return error(res, err.message, 'GET_PRODUCT_FAILED', err.statusCode || 404);
  }
}

async function createProduct(req, res) {
  try {
    const product = await marketplaceService.createProduct(req.user.userId, req.body, req.ip);
    return success(res, { product }, 201);
  } catch (err) {
    return error(res, err.message, 'CREATE_PRODUCT_FAILED', 400);
  }
}

async function updateProduct(req, res) {
  try {
    const updated = await marketplaceService.updateProduct(req.params.id, req.body, req.user.userId, req.ip);
    return success(res, { product: updated }, 200);
  } catch (err) {
    return error(res, err.message, 'UPDATE_PRODUCT_FAILED', 400);
  }
}

async function deleteProduct(req, res) {
  try {
    await marketplaceService.deleteProduct(req.params.id, req.user.userId, req.ip);
    return success(res, { message: 'Product deleted successfully' }, 200);
  } catch (err) {
    return error(res, err.message, 'DELETE_PRODUCT_FAILED', 400);
  }
}

module.exports = {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
};
