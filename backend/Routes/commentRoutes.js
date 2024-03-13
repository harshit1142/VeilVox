const express = require('express');
const commentRoutes = express.Router();
const { createComments, getComments } = require('../Controller/CommController');

commentRoutes
.route('/:id')
.post(createComments)
.get(getComments);


module.exports = commentRoutes;