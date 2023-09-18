const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobileNo:{
        type:Number,
        required:true
    },
    profileImage:{
        type:String,
        required:true
    }
},{timestamps:true});

//collection start
const User = new mongoose.model("User",UserSchema);

module.exports = User;