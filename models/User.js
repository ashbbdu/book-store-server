const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
   firstName : {
    type :String,
    required : [true , "First Name is required !"],
    trim:  true
   },
   lastName : {
    type :String,
    required : [true , "Last Name is required !"],
    trim:  true
   },
   email : {
    type :String,
    required : [true , "Email is required !"],
    trim:  true
   },
   password : {
    type :String,
    required : [true , "Password is required !"],
    trim:  true
   },
   books : [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Books",
   }],
   profilePicture : {
    type : String,
    trim : true
   }
});

module.exports = mongoose.model("User", userSchema);