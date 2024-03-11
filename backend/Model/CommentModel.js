const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel',
        required:true
    },
    postId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'postModel',
        required: true
    },
    content:{
        type: String,
        required: true
    },
    timestamp:{
        type: Date,
        default: Date.now()
    },
    replies: {
        type: [replyComment]
    }

})

const replyCommentSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel',
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
