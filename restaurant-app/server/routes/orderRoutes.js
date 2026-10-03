const express = require('express');
const {
  addOrderItems,
  getOrderById,
  updateOrderStatus,
  getMyOrders,
  getOrders
} = require('../controllers/orderController');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router
  .route('/')
  .post(protect, addOrderItems)
  .get(protect, authorize('admin'), getOrders);

router.route('/myorders').get(protect, getMyOrders);

router
  .route('/:id')
  .get(protect, getOrderById);

router
  .route('/:id/status')
  .put(protect, authorize('admin'), updateOrderStatus);

module.exports = router;
