-- Sample product data for testing
INSERT INTO products (sku, name, description, price, category, stock_quantity, reorder_level)
VALUES
  ('001001', 'Bottled Water 500ml', 'Pure drinking water', 1.50, 'Beverages', 150, 20),
  ('001002', 'Coffee Canned 250ml', 'Ready-to-drink coffee', 2.50, 'Beverages', 80, 15),
  ('002001', 'White Bread', 'Freshly baked white bread', 2.99, 'Bakery', 45, 10),
  ('002002', 'Croissants Pack', 'Butter croissants (3 pack)', 3.99, 'Bakery', 30, 8),
  ('003001', 'Potato Chips Salt', 'Classic salted chips 100g', 1.99, 'Snacks', 200, 30),
  ('003002', 'Energy Bar', 'Chocolate energy bar', 1.49, 'Snacks', 120, 25),
  ('004001', 'Milk 1L', 'Fresh whole milk', 3.50, 'Dairy', 60, 12),
  ('004002', 'Yogurt Cup', 'Strawberry yogurt 200g', 1.79, 'Dairy', 90, 20),
  ('005001', 'Instant Ramen', 'Spicy ramen noodles', 0.99, 'Food', 250, 50),
  ('005002', 'Canned Tuna', 'Light tuna in oil', 2.29, 'Food', 100, 20);
