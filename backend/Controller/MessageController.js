const chatModel = require("../Model/ChatModel");
const messageModel = require("../Model/MessageModel");
const userModel = require("../Model/UserModel");


 async function sendMessage(req,res){
    const chatId=req.params.id;
     const {content,userId}=req.body;

     var newMessage={
        sender:userId,
        content:content,
        chat:chatId
     }
     try {
        var msg=await messageModel.create(newMessage);

        msg= await msg.populate("sender","name _id");
        msg= await msg.populate("chat");
        msg=await userModel.populate(msg,{
            path:"chat.users",
            select:"name _id"
        })

        await chatModel.findByIdAndUpdate(chatId,{
            latestMessage:msg
        })
         res.json({
             status: 201,
             message: "Message Send",
             data: msg,
         });
     } catch (error) {
         res.json({
             message: "error"+error,
             data: []
         })
     }
  
}

async function allMessage(req, res) {
    const chatId=req.params.chatId;
    try {
        const msg=await messageModel.find({chat :chatId})
        .populate("sender","name _id")
        .populate("chat");
        res.json({
            status: 201,
            message: "All Messages",
            data: msg,
        });
    } catch (error) {
        res.json({
            message: "error" + error,
            data: []
        })
    }
}

module.exports = { sendMessage, allMessage }