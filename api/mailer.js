require("dotenv").config();
const nodemailer = require("nodemailer");

const config = {
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
};

const mailer = nodemailer.createTransport(config);

module.exports = mailer;
