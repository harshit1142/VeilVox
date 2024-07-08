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
    origin: 'https://radiant-llama-8d9b03.netlify.app',
    credentials: true,
}));

app.use(cookies({
    origin: 'https://radiant-llama-8d9b03.netlify.app',
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




const server = app.listen(4000,()=>{
    console.log("App started on PORT 4000");
})

DB();

const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: {
        origin: "https://radiant-llama-8d9b03.netlify.app"
    },
    credentials: true,
});

io.on("connection", (socket) => {
    // console.log("a user connected");

    socket.on('setup', (userData)=>{
        socket.join(userData.userId); 
        socket.emit("connected");
    });

    // adding users to a chat room
    socket.on('join chat', (room)=>{
        socket.join(room);
        // console.log('user joined room: '+room);
    })

    socket.on('typing', (room) => socket.in(room).emit("typing"))
    socket.on('stop typing', (room) => socket.in(room).emit("stop typing"))

    socket.on('new message', (newMessageRecieved)=>{
        let chat = newMessageRecieved.chat;

        // in case there are no users in the chat
        if(!chat.users){
            return console.log('chat users not defined');
        }
        // else except for us emit the message to every other user in chat
        chat.users.forEach(u => {
            if(u._id === newMessageRecieved.sender._id) return;

            // emit in the chat room initially created specifically for the user
            socket.in(u._id).emit("message recieved", newMessageRecieved);
            
        });
    })

    socket.off("setup", () => {
        // console.log("User disconnected");
        socket.leave(userData._id);
    })
})


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




