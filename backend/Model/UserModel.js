const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true  
    },
    post: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'postModel'
    }],
    pic: {
        type: String,
        default: "https://static.vecteezy.com/system/resources/previews/014/554/760/original/man-profile-negative-photo-anonymous-silhouette-human-head-businessman-worker-support-illustration-vector.jpg"
    }

})

userSchema.pre('save', async function () {

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(this.password, salt);
    this.password = hashPass;
})

const userModel = mongoose.model("userModel", userSchema);

module.exports = userModel;