const express = require('express');
const postRoutes = express.Router();

const { getAllPosts, createPost } = require('../Controller/PostController');

postRoutes.get('/', getAllPosts);

postRoutes.post('/:id', createPost);


module.exports = postRoutes;