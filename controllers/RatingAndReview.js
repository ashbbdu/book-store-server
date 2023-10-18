const Book = require("../models/Book");
const RatingAndReview = require("../models/RatingAndReview");

module.exports.addRating = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(req.user, "reqdata");
    const { rating, review, bookId } = req.body;
    if (!rating || !review) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const revRating = await RatingAndReview.create({
      user: userId,
      rating,
      review,
      book: bookId,
    });

    await Book.findByIdAndUpdate(
      { _id: bookId },
      { $push: { ratingAndReviews: revRating } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Review added successfully",
      reviewAndRating: revRating,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Unable to add review",
    });
  }
};


module.exports.getRating = async (req , res) => {
    try {
        const bookId = req.params.id
        console.log(bookId , "bookdiu")
        const reviews = await RatingAndReview.find({book : bookId})
        return res.status(200).json({
            success :true,
            message : "Reviews fetched successfully",
            reviews
        })
    } catch (error) {
        return res.status(401).json({
            success :false,
            message : "Unable to fetch reviews"
        }) 
    }
}