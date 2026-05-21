const express = require('express');
const productController = require('../controllers/productController');
const { authenticateToken, verifyRole } = require('../middleware/auth');

const router = express.Router();

// Public routes (can be viewed by authenticated users)
router.get('/', authenticateToken, productController.getAllProducts);
router.get('/search', authenticateToken, productController.searchProducts);
router.get('/low-stock', authenticateToken, productController.getLowStockProducts);
router.get('/sku/:sku', authenticateToken, productController.getProductBySku);
router.get('/:id', authenticateToken, productController.getProductById);

// Admin/Manager only routes
router.post('/', authenticateToken, verifyRole(['admin', 'manager']), productController.createProduct);
router.put('/:id', authenticateToken, verifyRole(['admin', 'manager']), productController.updateProduct);
router.delete('/:id', authenticateToken, verifyRole(['admin', 'manager']), productController.deleteProduct);
router.post('/stock/update', authenticateToken, verifyRole(['admin', 'manager']), productController.updateStock);

module.exports = router;
