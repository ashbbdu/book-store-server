const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next) => {
  try {
    let token =
      req?.cookies?.token ||
      req?.body?.token ||
      req?.header("Authorization").replace("Bearer ", "");


    if (!token) {
      return res.status(401).json({ success: false, message: "Token Missing" });
    }

    try {
      const decode = await jwt.verify(token, process.env.JWT_SECRET);
      console.log(decode, "decode");
      req.user = decode;
    } catch (error) {
      return res
        .status(401)
        .json({ success: false, message: "Token is invalid" });
    }

    next();
  } catch (error) {
    console.log(error, "error");
    return res.status(401).json({
      success: false,
      message: "Please login to perform this action",
    });
  }
};
