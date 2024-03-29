const express=require('express')
const DB=require('./db')
const cookies = require("cookie-parser");
const cors = require("cors");
const fs = require('fs')
const multer  = require('multer');
const bodyParser=require('body-parser');
const path = require('path');

const app=express();


app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

app.use(cookies({
    origin: 'http://localhost:3000',
    credentials: true,
}));



app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})




app.listen(4000,()=>{
    console.log("App started on PORT 4000");
})

DB();


const authRoutes = require('./Routes/authRoutes');
const chatRoutes = require('./Routes/chatRoutes');
const postRoutes = require('./Routes/postRoutes');
const commentRoutes = require('./Routes/commentRoutes');
const replyRoutes = require('./Routes/replyRoutes');
const messageRoutes = require('./Routes/messageRoutes');
const uploadRoutes = require('./Routes/uploadRoutes');


app.use('/uploads', uploadRoutes);
app.use("/chat",chatRoutes)
app.use("/auth",authRoutes);
app.use('/post', postRoutes);
app.use('/comment', commentRoutes);
app.use('/reply', replyRoutes);
app.use('/message', messageRoutes);




