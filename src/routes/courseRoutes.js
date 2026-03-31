const express = require('express');
const router = express.Router();
const {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} = require('../controllers/courseController');
const { ensureAuth } = require('../middleware/authMiddleware');

// PROTECTED ROUTES
router.route('/courses').get(ensureAuth, getCourses).post(ensureAuth, createCourse);

router
  .route('/courses/:id')
  .get(ensureAuth, getCourseById)
  .put(ensureAuth, updateCourse)
  .delete(ensureAuth, deleteCourse);

module.exports = router;
