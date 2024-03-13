const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
     chatName:{
        type:String,
        trim:true,
        require:true
     },
     isGroupChat:{
        type:Boolean,
        default:false
     },
     users:[{
        type:mongoose.Schema.Types.ObjectId,
         ref:"userModel"
     }],
    latestMessage:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "messageModel"
    },
    groupAdmin:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel"
    }
},
    {

        timestamps: true
    })


const chatModel = mongoose.model("chatModel", chatSchema);

module.exports = chatModel;