const express = require("express");


const { loginUser ,postuser} = require("../Controller/AuthController")
const authRoutes = express.Router();


authRoutes
    .route("/login/")
    .post(loginUser)
    
authRoutes
    .route("/register/")
    .post(postuser)



module.exports = authRoutes;