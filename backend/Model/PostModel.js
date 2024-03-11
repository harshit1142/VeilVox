const mongoose = require("mongoose");

const postSchema = new mongoose.schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'userModel',
        required:true
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
        derault: Date.now()
    }

})


const postModel = mongoose.model("postModel", postSchema);

module.exports = postModel;