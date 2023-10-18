const User = require("../models/User");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const Otp = require("../models/Otp");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({
        success: false,
        message: "User with email aready exists !",
      });
    }
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    let optResponse = await Otp.create({
      email,
      otp,
    });

    console.log(optResponse, "otp res");

    return res.status(200).json({
      success: true,
      message: "OTP send successfully !",
      // remove this because we dont have to show otp in console
      data: optResponse,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Unable to send OTP",
    });
  }
};

module.exports.signUp = async (req, res) => {
  const { firstName, lastName, email, password, otp } =
    req.body;
  try {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !otp
    ) {
      return res.status(404).json({
        success: false,
        message: "Please fill in the required fields",
      });
    }

    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(404).json({
        success: false,
        message: "User with same email already exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Match the opt
    // const recentOpt = await Otp.find({email :  email}).sort({ createdAt: -1 }).limit(1);
    const findOtp = await Otp.find()
    const recentOpt = findOtp.slice(-1)
    console.log(recentOpt , "recent")
    if (recentOpt[0]?.otp !== otp) {
      return res.status(404).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      profilePicture: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    return res.status(200).json({
      success: true,
      message: "User Created Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      success: false,
      message: "Unable to create user , please try again",
    });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!email || !password) {
      return res.status(401).json({
        success: false,
        message: "Please fill in the required fields !",
      });
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist",
      });
    }

    const payload = {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    if (await bcrypt.compare(password, user.password)) {
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });
      user.token = token;
      user.password = undefined;

      
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "User Logged in successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Incorrenct Password",
      });
    }
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "Unable to  login , please try again",
    });
  }
};
