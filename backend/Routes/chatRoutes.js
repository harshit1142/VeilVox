const express = require("express");
const { getAllChat, postChat, createGroupChat, renameChat, addToGroup, removeFromGroup } = require("../Controller/ChatController");


const chatRoutes = express.Router();


chatRoutes
    .route("/:id")
    .get(getAllChat)
    .post(postChat)

chatRoutes
    .route("/group/:id")
    .post(createGroupChat)

chatRoutes
    .route("/group/rename")
    .put(renameChat)

    chatRoutes
        .route("/group/add")
        .put(addToGroup)

chatRoutes
    .route("/group/remove")
    .put(removeFromGroup)





module.exports = chatRoutes;