const express = require('express');
const postRoutes = express.Router();

const { getAllPosts, createPost, getUserPost } = require('../Controller/PostController');

postRoutes.get('/', getAllPosts);

postRoutes
.route('/:id')
.post(createPost)
.get(getUserPost);


module.exports = postRoutes;