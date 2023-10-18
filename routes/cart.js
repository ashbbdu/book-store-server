const express =  require("express");
const { addToCart, removeFromCart, cartItems } = require("../controllers/Cart");

const { auth } = require("../middlewares/auth");


const router = express.Router();

router.post("/addtocart" , auth , addToCart)
router.post("/removefromcart" , auth , removeFromCart)
router.get("/cartitems" , auth , cartItems)

module.exports = router;

