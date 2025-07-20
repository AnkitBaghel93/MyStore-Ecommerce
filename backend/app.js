const express = require('express');
const cors = require('cors');
const conn = require('./utilse/conn');
require('dotenv').config();

const authRoutes = require('./routes/AuthRoutes');
const productRoutes = require('./routes/ProductRoutes');
const cartRoutes = require('./routes/Cart');
const orderRoutes = require('./routes/OrderRoutes'); 
const adminRoutes = require('./routes/AdminRoutes'); 

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

const allowedOrigins = ['https://mystore-ecommerce-frontend.onrender.com'];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin like mobile apps or curl
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Connect to DB
conn();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes); 
app.use('/api/admin', adminRoutes);

// Root
app.get('/', (req, res) => {
  res.send("Welcome to the server");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
