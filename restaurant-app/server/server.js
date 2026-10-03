const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

// Load env vars
dotenv.config();

const app = express();

// Body parser
app.use(express.json());
app.use(cookieParser());

// Enable CORS
app.use(cors({
  origin: '*',
  credentials: true
}));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes files
const auth = require('./routes/authRoutes');
const menu = require('./routes/menuRoutes');
const order = require('./routes/orderRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');

// Mount routers
app.use('/api/auth', auth);
app.use('/api/menu', menu);
app.use('/api/orders', order);
const path = require('path');
app.use(express.static(path.join(__dirname, '../client')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT} without MongoDB (using local JSON storage)`);
});
