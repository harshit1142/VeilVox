const express=require('express')
const DB=require('./db')
const cookies = require("cookie-parser");
const cors = require("cors");

const app=express();

app.use(express.json())
app.use(cookies());
app.use(cors({
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




app.use("/auth",authRoutes)
app.use("/chat",chatRoutes)