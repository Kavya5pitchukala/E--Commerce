-- ============================================================
-- E-Commerce Simulation - Seed Data
-- ============================================================
USE ecommerce_db;

INSERT INTO categories (name) VALUES ('Electronics'), ('Clothing'), ('Books'), ('Home & Kitchen');

INSERT INTO users (name, email, password) VALUES
('Kavya P',     'kavya@example.com',  'hashed_pw_1'),
('Ravi Kumar',  'ravi@example.com',   'hashed_pw_2'),
('Priya S',     'priya@example.com',  'hashed_pw_3');

INSERT INTO products (name, category_id, price, stock) VALUES
('Wireless Headphones',  1, 1999.00, 50),
('Mechanical Keyboard',  1, 3499.00, 30),
('Cotton T-Shirt',       2,  499.00, 100),
('Denim Jeans',          2, 1299.00, 75),
('Clean Code (Book)',    3,  799.00, 40),
('Coffee Maker',         4, 2499.00, 20);

INSERT INTO orders (user_id, status, total) VALUES
(1, 'delivered', 5498.00),
(2, 'processing', 799.00),
(3, 'pending', 1998.00);

INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES
(1, 1, 1, 1999.00),
(1, 2, 1, 3499.00),
(2, 5, 1, 799.00),
(3, 3, 2, 499.00),
(3, 4, 1, 1000.00);

INSERT INTO payments (order_id, method, status, paid_at) VALUES
(1, 'upi',         'completed', NOW()),
(2, 'credit_card', 'pending',   NULL),
(3, 'net_banking', 'pending',   NULL);
