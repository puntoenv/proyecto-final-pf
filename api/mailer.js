require("dotenv").config();
const nodemailer = require("nodemailer");

const config = {
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "littlePaws0508@gmail.com",
    pass: "ysfxwcakqzflklwf",
  },
};

// const mensaje = {
//   from: "littlePaws0508@gmail.com",
//   to: "sebssjb@gmail.com",
//   subject: "Correo de prueba",
//   text: "Envio de correo desde nodejs utilizando nodemailer",
// };

const mailer = nodemailer.createTransport(config);

// const info = await mailer.sendMail(mensaje);

module.exports = mailer;
