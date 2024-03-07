const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    userId:{
        type:String,
        require:true
    },
    password: {
        type: String,
        require: true
    }
})

userSchema.pre('save', async function () {

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(this.password, salt);
    this.password = hashPass;
})

const userModel = mongoose.model("userModel", userSchema);

module.exports = userModel;