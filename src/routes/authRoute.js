const express = require('express');
const { signup, login, authToken } = require('../controller/authController');
const router = express.Router();

// Signup route
router.post('/signup', signup);

// Login route
router.post('/login', login);

router.post('/authToken', authToken)

module.exports = router;
