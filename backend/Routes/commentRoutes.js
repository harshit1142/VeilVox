const express = require('express');
const commentRoutes = express.Router();


commentRoutes.get('/:id', getAllComments);



module.exports = commentRoutes;