const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    userId:{
        type:String,
        required:true
    },
    content:{
        type: String,
        required: true
    },
    timestamp:{
        type: Date,
        default: Date.now()
    },
    replies: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'replyModel'
    }]
})

const replyCommentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    userId:{
        type:String,
        required:true
    },
    reply:{
        type: String,
        required: true
    },
    timestamp:{
        type: Date,
        default: Date.now()
    }
})



const commentModel = mongoose.model("commentModel", commentSchema);
const replyModel = mongoose.model("replyModel", replyCommentSchema);


module.exports = { commentModel, replyModel };