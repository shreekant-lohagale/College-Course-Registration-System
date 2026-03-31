const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  course_id: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  course_name: {
    type: String,
    required: true,
    trim: true,
  },
  credits: {
    type: Number,
    required: true,
    min: 0,
  },
  faculty: {
    type: String,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
    min: 1,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Course', CourseSchema);
