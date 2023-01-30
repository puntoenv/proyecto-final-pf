const { Router } = require("express");
const mailer = require("../../../mailer");
const Pet = require("../../models/Pet");
const User = require("../../models/User");
const adoptEmail = Router();
const ejs = require("ejs");
const path = require("path");

adoptEmail.get("/", async (req, res) => {
  let { petId, userId } = req.query;
  try {
    let user = await User.findById(userId);
    let pet = await Pet.findById(petId);
    let data = await ejs.renderFile(path.join(__dirname + "/adopt.ejs"), {
      user,
      pet,
      email: "littlePaws0508@gmail.com",
    });
    let info = await mailer.sendMail({
      from: "littlePaws0508@gmail.com",
      to: `${user.email}`,
      subject: `GRACIAS ${user.name.toUpperCase()}`,
      html: data,
    });


  } catch (error) {
    console.error(error);
  }
});

module.exports = adoptEmail;
