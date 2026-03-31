const mongoose = require('mongoose');

const InsuranceSchema = new mongoose.Schema({
  age: {
    type: Number,
    required: true,
  },
  sex: {
    type: String,
    enum: ['male', 'female'],
    required: true,
  },
  bmi: {
    type: Number,
    required: true,
  },
  children: {
    type: Number,
    default: 0,
  },
  smoker: {
    type: String,
    enum: ['yes', 'no'],
    required: true,
  },
  region: {
    type: String,
    enum: ['southeast', 'southwest', 'northeast', 'northwest'],
    required: true,
  },
  charges: {
    type: Number,
    required: true,
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

module.exports = mongoose.model('Insurance', InsuranceSchema);
