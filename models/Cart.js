const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  book : 
    {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Books"
    }
  ,
});

module.exports = mongoose.model("Cart", bookSchema);