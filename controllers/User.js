const User = require("../models/User");

module.exports.getAllUsers = async (req, res) => {
  try {
    console.log(req.user , "user")
    const users = await User.find().populate("books").exec();

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Unable to fetch users",
    });
  }
};
