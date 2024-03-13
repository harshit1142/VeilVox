const express = require("express");


const { sendMessage, allMessage } = require("../Controller/MessageController")
const messageRoutes = express.Router();


messageRoutes
    .route("/:chatId")
    .post(sendMessage)

messageRoutes
    .route("/:chatId")
    .get(allMessage)



module.exports = messageRoutes;