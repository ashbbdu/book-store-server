const express =  require("express");
const { addBook, getAllBooks, bookDetails, deleteBook, editBook } = require("../controllers/Book");
const { auth } = require("../middlewares/auth");




const router = express.Router();

router.post("/add-book" , auth , addBook)

router.post("/get-books" , auth , getAllBooks)
router.put("/edit-book/:id" , auth , editBook)
router.get("/book-details/:id" , auth , bookDetails)
router.delete("/delete-book/:id" , auth , deleteBook)

module.exports = router;

