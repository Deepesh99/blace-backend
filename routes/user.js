const express = require('express');

const {
  getHome, getUserPosts, getUser, addNewPost,
} = require('../controller/user');
const { authorization } = require('../middleware/auth');

const router = express.Router();

// send homepage data with latest posts
router.get('/', getHome);

// show all posts that user has made
router.get('/posts', getUserPosts);

// show user profile
router.get('/:userId', authorization, getUser);

// add a new post
router.post('/add-post', addNewPost);

module.exports = router;
