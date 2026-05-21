const pool = require('../config/database');

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const { category, limit = 50, offset = 0 } = req.query;

    let query = 'SELECT id, sku, name, description, price, category, stock_quantity, reorder_level, created_at FROM products';
    const params = [];

    if (category) {
      query += ' WHERE category = $1';
      params.push(category);
    }

    query += ' ORDER BY created_at DESC LIMIT $' + (params.length + 1) + ' OFFSET $' + (params.length + 2);
    params.push(limit, offset);

    const result = await pool.query(query, params);

    res.status(200).json({
      total: result.rows.length,
      products: result.rows,
    });
  } catch (error) {
    console.error('Get all products error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get product by ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'SELECT id, sku, name, description, price, category, stock_quantity, reorder_level, created_at, updated_at FROM products WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Get product by ID error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get product by SKU (barcode)
const getProductBySku = async (req, res) => {
  try {
    const { sku } = req.params;

    const result = await pool.query(
      'SELECT id, sku, name, description, price, category, stock_quantity, reorder_level, created_at, updated_at FROM products WHERE sku = $1',
      [sku]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Get product by SKU error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create new product
const createProduct = async (req, res) => {
  try {
    const { sku, name, description, price, category, stock_quantity, reorder_level } = req.body;

    // Validation
    if (!sku || !name || !price) {
      return res.status(400).json({ error: 'SKU, name, and price are required' });
    }

    // Check if SKU already exists
    const skuExists = await pool.query('SELECT * FROM products WHERE sku = $1', [sku]);
    if (skuExists.rows.length > 0) {
      return res.status(409).json({ error: 'Product with this SKU already exists' });
    }

    const result = await pool.query(
      'INSERT INTO products (sku, name, description, price, category, stock_quantity, reorder_level) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [sku, name, description || null, price, category || null, stock_quantity || 0, reorder_level || 10]
    );

    res.status(201).json({
      message: 'Product created successfully',
      product: result.rows[0],
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, stock_quantity, reorder_level } = req.body;

    // Check if product exists
    const productExists = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    if (productExists.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Build dynamic update query
    const updates = [];
    const params = [];
    let paramIndex = 1;

    if (name !== undefined) {
      updates.push(`name = $${paramIndex++}`);
      params.push(name);
    }
    if (description !== undefined) {
      updates.push(`description = $${paramIndex++}`);
      params.push(description);
    }
    if (price !== undefined) {
      updates.push(`price = $${paramIndex++}`);
      params.push(price);
    }
    if (category !== undefined) {
      updates.push(`category = $${paramIndex++}`);
      params.push(category);
    }
    if (stock_quantity !== undefined) {
      updates.push(`stock_quantity = $${paramIndex++}`);
      params.push(stock_quantity);
    }
    if (reorder_level !== undefined) {
      updates.push(`reorder_level = $${paramIndex++}`);
      params.push(reorder_level);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    updates.push(`updated_at = CURRENT_TIMESTAMP`);
    params.push(id);

    const query = `UPDATE products SET ${updates.join(', ')} WHERE id = $${paramIndex} RETURNING *`;

    const result = await pool.query(query, params);

    res.status(200).json({
      message: 'Product updated successfully',
      product: result.rows[0],
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if product exists
    const productExists = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    if (productExists.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    await pool.query('DELETE FROM products WHERE id = $1', [id]);

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get low stock products
const getLowStockProducts = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, sku, name, price, stock_quantity, reorder_level FROM products WHERE stock_quantity <= reorder_level ORDER BY stock_quantity ASC'
    );

    res.status(200).json({
      total: result.rows.length,
      products: result.rows,
    });
  } catch (error) {
    console.error('Get low stock products error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Search products
const searchProducts = async (req, res) => {
  try {
    const { query, limit = 20 } = req.query;

    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const searchTerm = `%${query}%`;

    const result = await pool.query(
      'SELECT id, sku, name, description, price, category, stock_quantity FROM products WHERE sku ILIKE $1 OR name ILIKE $1 OR description ILIKE $1 LIMIT $2',
      [searchTerm, limit]
    );

    res.status(200).json({
      total: result.rows.length,
      products: result.rows,
    });
  } catch (error) {
    console.error('Search products error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Bulk update stock
const updateStock = async (req, res) => {
  try {
    const { product_id, quantity_change } = req.body;

    if (!product_id || quantity_change === undefined) {
      return res.status(400).json({ error: 'Product ID and quantity change are required' });
    }

    // Get current stock
    const productResult = await pool.query('SELECT stock_quantity FROM products WHERE id = $1', [product_id]);
    if (productResult.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const newStock = productResult.rows[0].stock_quantity + quantity_change;

    if (newStock < 0) {
      return res.status(400).json({ error: 'Insufficient stock' });
    }

    // Update stock
    const updateResult = await pool.query(
      'UPDATE products SET stock_quantity = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [newStock, product_id]
    );

    // Log inventory change
    await pool.query(
      'INSERT INTO inventory_log (product_id, transaction_type, quantity_change, notes) VALUES ($1, $2, $3, $4)',
      [product_id, 'stock_adjustment', quantity_change, 'Manual stock adjustment']
    );

    res.status(200).json({
      message: 'Stock updated successfully',
      product: updateResult.rows[0],
    });
  } catch (error) {
    console.error('Update stock error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  getProductBySku,
  createProduct,
  updateProduct,
  deleteProduct,
  getLowStockProducts,
  searchProducts,
  updateStock,
};
