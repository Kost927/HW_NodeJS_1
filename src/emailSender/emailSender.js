const path = require("path");
require("dotenv").config({ path: ".env" });
const sgMail = require("@sendgrid/mail");
const errCatcher = require("../utils/errCatcher");

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(SENDGRID_API_KEY);

const verificationSender = async (email, verificationToken) => {
  try {
    const msg = {
      to: email,
      from: process.env.EMAIL,
      subject: "Sendgrid Node.js Homework",
      text: "Node.js HW -06 -email",
      html: `<p> You have to verify your account <a href='http://localhost:3000/api/v1/auth/verify/${verificationToken}'>Press here</a>`
    };
      
    await sgMail.send(msg);
  } catch (error) {
    console.error("error", error);

    if (error.response) {
      throw new Error(error.response.body);
    }
  }
};

module.exports = {
  verificationSender
};
