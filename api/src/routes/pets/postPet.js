const { Router } = require("express");
const cloudinary = require("../../../cloud.js");
const mailer = require("../../../mailer");
const Pet = require("../../models/Pet");
const User = require("../../models/User");
const postPet = Router();
const fs = require("fs");
const path = require("path");
const ejs = require("ejs");

postPet.post("/post-pet", async (req, res) => {
  try {
    let {
      name,
      size,
      age,
      description,
      image,
      type,
      gender,
      location,
      health,
      sociability,
      condition,
      userId,
    } = req.body;
    let result = await cloudinary.uploader.upload(image);
    const user = await User.findById(userId);
    let pet = await Pet.create({
      name,
      size,
      age,
      description,
      image: result.url,
      type,
      location,
      gender,
      health,
      condition,
      sociability,
      user: user._id,
      expireAt: new Date(),
    });
    user.pets = user.pets.concat(pet._id);
    await user.save();

    let data = await ejs.renderFile(
      path.join(__dirname + "/email.ejs"),
      req.body
    );
    let info = await mailer.sendMail({
      from: "littlePaws0508@gmail.com",
      to: `${user.email}`,
      subject: "Correo de confirmación",
      html: data,
    });
    console.log(info);
    res.status(200).send(pet._id);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error al publicar la mascota ");
  }
});

module.exports = postPet;
