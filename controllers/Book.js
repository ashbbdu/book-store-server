const Book = require("../models/Book");
const User = require("../models/User");

module.exports.addBook = async (req, res) => {
  try {
    console.log(req.user, "from books");
    const userId = req.user.id;
    const { title, author, genre, language, totalPages , price } = req.body;
    if (!title || !author || !genre || !language || !totalPages || !price) {
      return res.status(404).json({
        success: false,
        message: "Please fill in the required fields",
      });
    }

    const book = await Book.create({
      title,
      author,
      genre,
      language,
      price,
      totalPages,
      user: userId,
      createdAt : Date.now() ,
    } );

    const user = await User.findByIdAndUpdate(
      { _id: userId },
      { $push: { books: book._id } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Book added successfully !",
      book,
    });
  } catch (error) {
    console.log(error, "error");
    return res.status(404).json({
      success: false,
      message: "Unable to add the book , please try again",
    });
  }
};

module.exports.editBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const { title, author, genre, language, totalPages , price} = req.body;
    if (!title || !author || !genre || !language || !totalPages || !price) {
      return res.status(404).json({
        success: false,
        message: "Please fill in the required fields",
      });
    }

    const book = await Book.findByIdAndUpdate({_id : bookId} , {
      title,
      author,
      genre,
      language,
      totalPages,
      price,
    },{new : true})



    return res.status(200).json({
      success: true,
      message: "Book updated successfully !",
      book,
    });
  } catch (error) {
    console.log(error, "error");
    return res.status(404).json({
      success: false,
      message: "Unable to update the book , please try again",
    });
  }
};

module.exports.getAllBooks = async (req, res) => {
  const {searchText} = req.body
  try {
    const books = await Book.find({
      $expr: {
        $regexMatch: {
          input: {
            $concat: ["$title", "$author" , "$genre" , "$language" , "$totalPages" , "$price" ],
          },
          regex : searchText == undefined ? "" : searchText,
          options: "i",
        },
      },
    })
      .limit()
      .sort({ createdAt : -1 })
      .exec();

      // console.log("books" , books)
    res.status(200).json({
      success: true,
      message: "Books fetched successfully",
      books,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "Unable to add the book , please try again",
    });
  }
};

module.exports.bookDetails = async (req, res) => {
  try {
    const bookId = req.params.id;

    const bookDetails = await Book.findById({ _id: bookId });

    return res.status(200).json({
      success: true,
      message: "Book details fetched successfully",
      bookDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      success: false,
      message: "Unable fetch book details , please try again",
    });
  }
};

module.exports.deleteBook = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookId = req.params.id;

    const bookDetails = await Book.findByIdAndDelete({ _id: bookId });


    await User.findByIdAndUpdate(
      { _id: userId },
      { $pull: { books: bookId } } , {new : true}
    );

    return res.status(200).json({
      success: true,
      message: "Book delete successfully",
      deletedBook: bookDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      success: false,
      message: "Unable delete the book , please try again",
    });
  }
};
