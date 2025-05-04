const express = require('express');
const router = express.Router();

router.get('/crash', (req, res, next) => {
  try {
    // Simulate an error to test the error logging system
    throw new Error('Simulated crash error');
  } catch (err) {
    next(err);  // Pass the error to the error handler middleware
  }
});

module.exports = router;
