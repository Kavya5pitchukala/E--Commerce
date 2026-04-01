# 🛒 E-Commerce Simulation

A relational database-backed e-commerce simulation featuring optimized SQL schema design, concurrent transaction handling, and ACID-compliant data operations.

## 🚀 Features

- Normalized relational database schema (3NF)
- Optimized multi-table joins with indexing for low-latency queries
- ACID-compliant transaction management
- Simulated distributed data operations and concurrent transactions
- Clean frontend UI for browsing products, cart, and order management

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript
- **Database:** SQL (MySQL / SQLite)
- **Concepts:** Schema Design, Query Optimization, ACID Transactions

## 📁 Project Structure

```
ecommerce-simulation/
├── index.html          # Main storefront UI
├── css/
│   └── style.css       # Styling
├── js/
│   └── app.js          # Frontend logic
├── sql/
│   ├── schema.sql      # Database schema
│   ├── seed.sql        # Sample data
│   └── queries.sql     # Optimized queries
└── README.md
```

## ⚙️ Setup Instructions

### Prerequisites
- MySQL 8.0+ or SQLite3
- A modern web browser

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/ecommerce-simulation.git
   cd ecommerce-simulation
   ```

2. **Set up the database**
   ```bash
   mysql -u root -p < sql/schema.sql
   mysql -u root -p ecommerce_db < sql/seed.sql
   ```

3. **Open the frontend**
   ```bash
   open index.html
   # or just drag index.html into your browser
   ```

## 🗃️ Database Schema Overview

```
users        → id, name, email, created_at
products     → id, name, category, price, stock
orders       → id, user_id, status, total, created_at
order_items  → id, order_id, product_id, quantity, unit_price
payments     → id, order_id, method, status, paid_at
```

## 📊 Key SQL Optimizations

- Indexed `user_id`, `product_id`, and `order_id` foreign keys
- Composite indexes on frequently joined columns
- Query restructuring to avoid full-table scans
- Reduced average query time via join path optimization

## 📄 License

MIT License
