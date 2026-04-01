// ============================================================
// E-Commerce Simulation - Frontend Logic
// Simulates SQL-backed operations in-browser
// ============================================================

const products = [
  { id: 1, name: 'Wireless Headphones', category: 'Electronics', price: 1999, stock: 50 },
  { id: 2, name: 'Mechanical Keyboard',  category: 'Electronics', price: 3499, stock: 30 },
  { id: 3, name: 'Cotton T-Shirt',       category: 'Clothing',    price: 499,  stock: 100 },
  { id: 4, name: 'Denim Jeans',          category: 'Clothing',    price: 1299, stock: 75 },
  { id: 5, name: 'Clean Code (Book)',    category: 'Books',       price: 799,  stock: 40 },
  { id: 6, name: 'Coffee Maker',         category: 'Home & Kitchen', price: 2499, stock: 20 },
];

let cart = [];
let activeFilter = 'all';

// ─── Render Products ───────────────────────────────────────
function renderProducts(filter = 'all') {
  const grid = document.getElementById('product-grid');
  const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
  grid.innerHTML = filtered.map(p => `
    <div class="card" data-id="${p.id}">
      <h3>${p.name}</h3>
      <div class="cat">${p.category}</div>
      <div class="price">₹${p.price.toLocaleString()}</div>
      <div class="stock">In stock: ${p.stock}</div>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    </div>
  `).join('');
}

// ─── Cart Logic ────────────────────────────────────────────
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  renderCart();
}

function renderCart() {
  const cartEl = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');
  const btn = document.getElementById('checkout-btn');

  if (cart.length === 0) {
    cartEl.innerHTML = '<p class="empty">Your cart is empty.</p>';
    totalEl.innerHTML = '';
    btn.style.display = 'none';
    document.getElementById('cart-count').textContent = 'Cart (0)';
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  cartEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <span>${item.name} × ${item.qty}</span>
      <span>₹${(item.price * item.qty).toLocaleString()}</span>
    </div>
  `).join('');
  totalEl.innerHTML = `Total: ₹${total.toLocaleString()}`;
  btn.style.display = 'inline-block';
  document.getElementById('cart-count').textContent = `Cart (${cart.reduce((s, i) => s + i.qty, 0)})`;
}

// ─── Order Placement (simulates ACID transaction) ──────────
document.getElementById('checkout-btn').addEventListener('click', () => {
  const msg = document.getElementById('order-msg');
  // Simulate stock deduction (like UPDATE products SET stock = stock - qty)
  cart.forEach(item => {
    const p = products.find(p => p.id === item.id);
    p.stock -= item.qty;
  });
  cart = [];
  renderCart();
  renderProducts(activeFilter);
  msg.textContent = '✅ Order placed successfully! Payment pending. (ACID transaction committed)';
  setTimeout(() => msg.textContent = '', 4000);
});

// ─── Filter Buttons ────────────────────────────────────────
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.cat;
    renderProducts(activeFilter);
  });
});

// ─── Simulated SQL Query Output ────────────────────────────
const queryResults = {
  'top-products': `-- Top Selling Products
SELECT p.name, SUM(oi.quantity) AS total_sold
FROM order_items oi JOIN products p ON p.id = oi.product_id
GROUP BY p.id ORDER BY total_sold DESC LIMIT 5;

Results:
┌──────────────────────────┬────────────┐
│ name                     │ total_sold │
├──────────────────────────┼────────────┤
│ Wireless Headphones      │     142    │
│ Cotton T-Shirt           │     118    │
│ Clean Code (Book)        │      95    │
│ Mechanical Keyboard      │      87    │
│ Coffee Maker             │      64    │
└──────────────────────────┴────────────┘`,

  'revenue': `-- Revenue by Category
SELECT c.name, SUM(oi.quantity * oi.unit_price) AS revenue
FROM order_items oi
JOIN products p ON p.id = oi.product_id
JOIN categories c ON c.id = p.category_id
GROUP BY c.name ORDER BY revenue DESC;

Results:
┌──────────────────┬─────────────┐
│ category         │ revenue (₹) │
├──────────────────┼─────────────┤
│ Electronics      │  4,82,300   │
│ Home & Kitchen   │  1,59,936   │
│ Clothing         │  1,08,244   │
│ Books            │   75,905    │
└──────────────────┴─────────────┘`,

  'low-stock': `-- Low Stock Alert (stock < 25)
SELECT name, stock FROM products
WHERE stock < 25 ORDER BY stock ASC;

Results:
┌──────────────────┬───────┐
│ name             │ stock │
├──────────────────┼───────┤
│ Coffee Maker     │   20  │
│ Mechanical Keyboard│  30 │
└──────────────────┴───────┘
⚠️  Reorder recommended for items below threshold.`
};

function runQuery(type) {
  document.getElementById('query-output').textContent = queryResults[type];
}

// ─── Init ──────────────────────────────────────────────────
renderProducts();
