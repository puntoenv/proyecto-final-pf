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
      contactAdoption,
      description,
      image,
      type,
      gender,
      location,
      health,
      healthExtra,
      sociability,
      condition,
      userId,
    } = req.body;
    let result = [];
    for (let i = 0; i < image.length; i++) {
      result.push(await cloudinary.uploader.upload(image[i]));
    }
    console.log(result);
    const user = await User.findById(userId);
    let pet = await Pet.create({
      name,
      size,
      age,
      contactAdoption,
      description,
      image: result.map((ele) => ele.url),
      type,
      location,
      gender,
      health,
      healthExtra,
      condition,
      sociability,
      user: user._id,
      expireAt: new Date(),
    });
    user.pets = user.pets.concat(pet._id);
    await user.save();

    let data = await ejs.renderFile(path.join(__dirname + "/email.ejs"), {
      ...req.body,
      id: pet._id,
    });
    let info = await mailer.sendMail({
      from: "littlePaws0508@gmail.com",
      to: `${user.email}`,
      subject: "Correo de confirmación",
      html: data,
    });
    res.status(200).send(pet._id);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error al publicar la mascota ");
  }
});

module.exports = postPet;
