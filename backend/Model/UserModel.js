const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    userId:{
        type:String,
        required:true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.pre('save', async function () {

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(this.password, salt);
    this.password = hashPass;
})

const userModel = mongoose.model("userModel", userSchema);

module.exports = userModel;