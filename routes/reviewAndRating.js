const express =  require("express");
const { sendOtp, signUp, login } = require("../controllers/Auth");
const { addRating, getRating } = require("../controllers/RatingAndReview");
const { auth } = require("../middlewares/auth");

const router = express.Router();

router.post("/add-review", auth , addRating)
router.get("/getReviews/:id" , auth , getRating)

module.exports = router;

