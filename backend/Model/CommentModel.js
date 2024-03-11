const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
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