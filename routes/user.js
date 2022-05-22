const express = require('express');

const { getHome, getUserPosts, getUser, addNewPost } = require('../controller/user');

const router = express.Router();

// send homepage data with latest posts
router.get('/', getHome);

// show all posts that user has made
router.get('/user/post', getUserPosts);

// show user profile
router.get('/user', getUser);

// add a new post
router.post('/add-post', addNewPost);

module.exports = router;


