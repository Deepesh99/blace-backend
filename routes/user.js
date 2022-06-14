const express = require('express');

const {
  getHome, getUserPosts, getUser, addNewPost, updateUserProfile,
} = require('../controller/user');
const { authorization } = require('../middleware/auth');

const router = express.Router();

// send homepage data with latest posts
router.get('/', authorization, getHome);

// show all posts that user has made
router.get('/:userId/posts', authorization, getUserPosts);

// show user profile
router.get('/:userId', authorization, getUser);

// add a new post
router.post('/add-post', authorization, addNewPost);

// update user profile data
router.post('/:userId/update-profile', authorization, updateUserProfile);

module.exports = router;
