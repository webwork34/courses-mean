const express = require('express');
const router = express.Router();
const authMiddleware = require('./../middlewares/authMiddleware');

const {
  showAllCourses,
  showCourseById,
  createCourse,
  editCourse,
  deleteCourse,
} = require('../controllers/coursesController');

router.get('/courses', authMiddleware, showAllCourses);
router.get('/courses/:id', authMiddleware, showCourseById);
router.post('/courses/add', authMiddleware, createCourse);
router.patch('/courses/edit/:id', authMiddleware, editCourse);
router.delete('/courses/:id', authMiddleware, deleteCourse);

module.exports = router;
