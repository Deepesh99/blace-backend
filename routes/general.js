const express = require('express');

const { register } = require('../controller/login');

const router = express.Router();

// router.get('/login', );

// This route is to register new user into database.
router.post('/register', register);

module.exports = router;
