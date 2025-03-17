const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type : String,
        required :[true, "Name is required"],
        trim: true,
        minlength: [3, "Name must be at least 3 characters long"]
    },
    email: {
        type : String,
        required :[true, "Email is required"],
        unique : true ,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "Please enter a valid email"]
    },
    password: {
        type : String,
        required :[true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"]
    },
    role : {
        type : String,
        enum : ["user" , "admin"] , default: "user"
    },
    profileImage: {
        type: String, 
      }
      
},{timestamps : true}) //adding createdat and updated at auto

const User = mongoose.model("User" ,userSchema);
module.exports = User ;