const express = require('express');
const commentRoutes = express.Router();
const { createComments, getComments, postReply } = require('../Controller/CommController');

commentRoutes
.route('/:id')
.post(createComments)
.get(getComments);

commentRoutes
.route('/reply/post')
.post(postReply);


module.exports = commentRoutes;