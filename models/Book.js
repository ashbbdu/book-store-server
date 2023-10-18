const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required !"],
    trim: true,
  },
  author: {
    type: String,
    required: [true, "Author is required !"],
    trim: true,
  },
  genre: {
    type: String,
    required: [true, "Genre is required !"],
    trim: true,
  },
  language: {
    type: String,
    trim: true,
    required : true
  },
  totalPages: {
    type: String,
    trim: true,
    required : true
  },
  user : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
 price :  {
  type: String,
  required: true,
  },
  createdAt : {
  type: Date,
    default: Date.now,
  },
  ratingAndReviews: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "RatingAndReview",
		},
	],
});

module.exports = mongoose.model("Books", bookSchema);