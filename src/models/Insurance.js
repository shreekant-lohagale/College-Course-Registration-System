const mongoose = require('mongoose');

const InsuranceSchema = new mongoose.Schema({
  age: {
    type: Number,
    required: true,
    min: 0,
    max: 120,
  },
  sex: {
    type: String,
    enum: ['male', 'female'],
    required: true,
  },
  bmi: {
    type: Number,
    required: true,
    min: 10,
    max: 100,
  },
  children: {
    type: Number,
    default: 0,
    min: 0,
    max: 20,
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
    min: 0,
    max: 1000000,
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
