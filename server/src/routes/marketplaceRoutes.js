// server/src/routes/marketplaceRoutes.js
const express = require('express');
const router = express.Router();
const marketplaceController = require('../controllers/marketplaceController');
const { requireAuth } = require('../middleware/auth');
const { validateBody } = require('../middleware/validate');
const { createProductSchema, updateProductSchema } = require('../validators/marketplaceValidator');

router.get('/', marketplaceController.listProducts);
router.get('/:id', marketplaceController.getProduct);
router.post('/products', requireAuth, validateBody(createProductSchema), marketplaceController.createProduct);
router.patch('/products/:id', requireAuth, validateBody(updateProductSchema), marketplaceController.updateProduct);
router.delete('/products/:id', requireAuth, marketplaceController.deleteProduct);

module.exports = router;
