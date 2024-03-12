const express = require('express');
const commentRoutes = express.Router();
const { createComments } = require('../Controller/commentController');

commentRoutes.post('/:id', createComments);



module.exports = commentRoutes;