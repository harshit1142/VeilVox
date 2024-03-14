const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    caption:{
        type : String,
        required : true
    },
    imageURL:{
        type : String
    },
    timestamp : {
        type: Date,
        default: Date.now()
    },
    comment: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'commentModel'
    }],
    upvote: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'userModel'
    }],
    downvote: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'userModel'
    }]
})


const postModel = mongoose.model("postModel", postSchema);

module.exports = postModel;