const express = require('express');
const postRoutes = express.Router();

const { getAllPosts, createPost, getUserPost, postUpvote, postDownvote, getUpDownVote, getAPost } = require('../Controller/PostController');

postRoutes.get('/', getAllPosts);

// routes for post:
postRoutes
.route('/:id')
.post(createPost)
.get(getUserPost);

postRoutes
.route("/single/:id")
.get(getAPost)

// routes for up/downvotes:
postRoutes
.route('/upvote/:id')
.post(postUpvote)
.get(getUpDownVote);

postRoutes
.route('/downvote/:id')
.post(postDownvote);


module.exports = postRoutes;