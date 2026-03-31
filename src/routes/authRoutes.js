const express = require('express');
const passport = require('passport');
const router = express.Router();

// @desc    Auth with Google
// @route   GET /auth/google
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

const jwt = require('jsonwebtoken');

// ... (previous routes)

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/', session: false }),
  (req, res) => {
    const token = jwt.sign(
      { 
        id: req.user.id,
        displayName: req.user.displayName,
        email: req.user.email,
        image: req.user.image 
      }, 
      process.env.JWT_SECRET, 
      {
        expiresIn: '7d',
      }
    );

    // Ensure frontend URL is absolute
    const frontendUrl = process.env.FRONTEND_URL.startsWith('http') 
      ? process.env.FRONTEND_URL 
      : `https://${process.env.FRONTEND_URL}`;

    // Redirect to frontend with token
    res.redirect(`${frontendUrl}/login?token=${token}`);
  }
);

// @desc    Logout user
// @route   GET /auth/logout
router.get('/auth/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

module.exports = router;
