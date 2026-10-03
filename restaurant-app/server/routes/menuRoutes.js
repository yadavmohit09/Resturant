const express = require('express');
const {
  getMenuItems,
  getMenuItem,
  createMenuItem,
  getCategories
} = require('../controllers/menuController');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/categories').get(getCategories);

router
  .route('/')
  .get(getMenuItems)
  .post(protect, authorize('admin'), createMenuItem);

router
  .route('/:id')
  .get(getMenuItem);

module.exports = router;
