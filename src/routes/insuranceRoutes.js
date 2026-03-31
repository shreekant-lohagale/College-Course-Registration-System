const express = require('express');
const router = express.Router();
const {
  getInsuranceRecords,
  addInsuranceRecord,
  deleteInsuranceRecord,
} = require('../controllers/insuranceController');
const { ensureAuth } = require('../middleware/authMiddleware');

router
  .route('/')
  .get(ensureAuth, getInsuranceRecords)
  .post(ensureAuth, addInsuranceRecord);

router.route('/:id').delete(ensureAuth, deleteInsuranceRecord);

module.exports = router;
