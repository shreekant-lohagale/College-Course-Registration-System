const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const passport = require('passport');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

// Load config
dotenv.config();

// Passport config
require('./config/passport')(passport);

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Security & Logging
app.use(helmet());
app.use(cors());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Passport middleware
app.use(passport.initialize());

// Routes
app.use('/', require('./routes/authRoutes'));
app.use('/api', require('./routes/courseRoutes'));

// Root route for testing
app.get('/', (req, res) => {
  res.send('API is running... Log in via Google at /auth/google');
});

// Error handling
app.use(errorHandler);

module.exports = app;
