const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    userPic: {
        type: String,
        default: "https://static.vecteezy.com/system/resources/previews/014/554/760/original/man-profile-negative-photo-anonymous-silhouette-human-head-businessman-worker-support-illustration-vector.jpg"
    },
    caption:{
        type : String,
        required : true
    },
    imageURL:{
        type : String
    },
    timestamp : {
        type: Date,
        default: Date.now
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
},{
    timestamps:true
})


const postModel = mongoose.model("postModel", postSchema);

module.exports = postModel;