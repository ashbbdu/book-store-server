const nodemailer = require("nodemailer");
require("dotenv").config();

module.exports.mailSender = async (title, email , body) => {
  try {
  
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: "Ecommerce || Ecommerce",
      to: `${email}`,
      subject: `${title}`, 

      html: `${body}`, 
    });
  } catch (error) {
    console.log(error, "error from catch block");
  }
};
