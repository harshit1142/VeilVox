const express = require("express");


const { loginUser ,postuser, searchUser} = require("../Controller/AuthController")
const authRoutes = express.Router();


authRoutes
    .route("/login/")
    .post(loginUser)
    
authRoutes
    .route("/register/")
    .post(postuser)

authRoutes
.route("/:id")
.post(searchUser);



module.exports = authRoutes;