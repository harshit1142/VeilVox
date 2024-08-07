const express = require('express');
const postRoutes = express.Router();

const { getPagePost, createPost, getUserData, postUpvote, postDownvote, getUpDownVote, getAPost, fetchUserPosts, fetchUpvotedUserPosts, fetchDownvotedUserPosts, deletePost } = require('../Controller/PostController');

// postRoutes.get('/', getAllPosts);

// to get a page posts
postRoutes
.route('/page/:page')
.get(getPagePost);

// routes for post:
postRoutes
.route('/:id')
.post(createPost)
.delete(deletePost)

postRoutes
.route("/profile/:id")
.post(fetchUserPosts)
.get(getUserData);


// routes for up/downvotes:
postRoutes
.route('/upvote/:id')
.post(postUpvote)
.get(getUpDownVote);

postRoutes
.route('/downvote/:id')
.post(postDownvote);


module.exports = postRoutes;