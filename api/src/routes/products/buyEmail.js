const { Router } = require("express");
const buyEmail = Router();
const ejs = require("ejs");
const path = require("path");
const mailer = require("../../../mailer");
const User = require("../../models/User");

buyEmail.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let user = await User.findById(id);
    let data = await ejs.renderFile(path.join(__dirname + "/buyEmail.ejs"), {
      user,
      email: "littlePaws0508@gmail.com",
    });
    let info = await mailer.sendMail({
      from: "littlePaws0508@gmail.com",
      to: `${user.email}`,
      subject: `CONFIRMACIÓN DE COMPRA`,
      html: data,
    });
    console.log(info);
    res.status(200).send(info);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

module.exports = buyEmail;
