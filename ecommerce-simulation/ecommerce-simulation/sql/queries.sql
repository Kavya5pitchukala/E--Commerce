-- ============================================================
-- E-Commerce Simulation - Optimized SQL Queries
-- ============================================================
USE ecommerce_db;

-- 1. Get all orders with user details and total items
SELECT
    o.id          AS order_id,
    u.name        AS customer,
    o.status,
    o.total,
    COUNT(oi.id)  AS items_count,
    o.created_at
FROM orders o
JOIN users u       ON u.id = o.user_id
JOIN order_items oi ON oi.order_id = o.id
GROUP BY o.id, u.name, o.status, o.total, o.created_at
ORDER BY o.created_at DESC;

-- 2. Top selling products
SELECT
    p.name,
    SUM(oi.quantity) AS total_sold,
    SUM(oi.quantity * oi.unit_price) AS revenue
FROM order_items oi
JOIN products p ON p.id = oi.product_id
GROUP BY p.id, p.name
ORDER BY total_sold DESC
LIMIT 10;

-- 3. Revenue by category
SELECT
    c.name        AS category,
    SUM(oi.quantity * oi.unit_price) AS total_revenue
FROM order_items oi
JOIN products p   ON p.id = oi.product_id
JOIN categories c ON c.id = p.category_id
GROUP BY c.id, c.name
ORDER BY total_revenue DESC;

-- 4. Users with pending payments
SELECT
    u.name, u.email, o.id AS order_id, o.total, p.method
FROM payments p
JOIN orders o ON o.id = p.order_id
JOIN users u  ON u.id = o.user_id
WHERE p.status = 'pending';

-- 5. Low stock products alert
SELECT name, stock
FROM products
WHERE stock < 25
ORDER BY stock ASC;

-- 6. ACID-safe order placement (transaction example)
START TRANSACTION;
    INSERT INTO orders (user_id, status, total) VALUES (1, 'pending', 1999.00);
    SET @order_id = LAST_INSERT_ID();
    INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES (@order_id, 1, 1, 1999.00);
    UPDATE products SET stock = stock - 1 WHERE id = 1;
    INSERT INTO payments (order_id, method, status) VALUES (@order_id, 'upi', 'pending');
COMMIT;
