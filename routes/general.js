const express = require('express');

const { register, login } = require('../controller/login');

const router = express.Router();

// login route
router.post('/login', login);

// This route is to register new user into database.
router.post('/register', register);

module.exports = router;
