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
        default: Date.now
    },
    replies: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'commentModel'
    }],
    isReply: {
        type: Boolean,
        default: false
    },
    parentComment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'commentModel',
        default: null
    }
})


const commentModel = mongoose.model("commentModel", commentSchema);

module.exports = { commentModel };