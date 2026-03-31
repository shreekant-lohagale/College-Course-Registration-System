const Course = require('../models/Course');

// @desc    Add new course
// @route   POST /courses
exports.createCourse = async (req, res, next) => {
  try {
    const { course_id, course_name, credits, faculty, semester } = req.body;

    const courseExists = await Course.findOne({ course_id });
    if (courseExists) {
      res.status(400);
      throw new Error('Course already exists');
    }

    const course = await Course.create({
      course_id,
      course_name,
      credits,
      faculty,
      semester,
      user: req.user.id,
    });

    res.status(201).json(course);
  } catch (err) {
    next(err);
  }
};

// @desc    Get all courses
// @route   GET /courses
exports.getCourses = async (req, res, next) => {
  try {
    const courses = await Course.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(courses);
  } catch (err) {
    next(err);
  }
};

// @desc    Get course by ID
// @route   GET /courses/:id
exports.getCourseById = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      res.status(404);
      throw new Error('Course not found');
    }

    if (course.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error('User not authorized');
    }

    res.status(200).json(course);
  } catch (err) {
    next(err);
  }
};

// @desc    Update course
// @route   PUT /courses/:id
exports.updateCourse = async (req, res, next) => {
  try {
    let course = await Course.findById(req.params.id);

    if (!course) {
      res.status(404);
      throw new Error('Course not found');
    }

    if (course.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error('User not authorized');
    }

    course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(course);
  } catch (err) {
    next(err);
  }
};

// @desc    Delete course
// @route   DELETE /courses/:id
exports.deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      res.status(404);
      throw new Error('Course not found');
    }

    if (course.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error('User not authorized');
    }

    await course.deleteOne();

    res.status(200).json({ message: 'Course removed' });
  } catch (err) {
    next(err);
  }
};
