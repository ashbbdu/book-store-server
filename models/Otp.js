const mongoose = require("mongoose");
const { mailSender } = require("../utils/mailSender");
// const emailTemplate = require("../mail/templates/emailVerificationTemplate");
const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 5, 
    },
});

// Function to send OTP emails
otpSchema.post("save", async (doc) => {
    try {
      await mailSender(
            "Please find the OTP in the body to continue the registration process",
            doc.email,
            `Enter the OTP to register with us ${doc.otp}`
          );
    } 
    catch (e){
        console.log("Unalbe to send the mail")
    }
 
});

module.exports = mongoose.model("Otp" , otpSchema)