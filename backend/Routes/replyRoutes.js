const express = require('express');
const replyRoutes = express.Router();
const { createReply, getReplies } = require('../Controller/ReplyController');

replyRoutes
.route('/:id')
.post(createReply)
.get(getReplies);


module.exports = replyRoutes;