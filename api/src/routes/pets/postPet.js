const { Router } = require("express");
const cloudinary = require("../../../cloud.js");
const mailer = require("../../../mailer");
const Pet = require("../../models/Pet");
const User = require("../../models/User");

const postPet = Router();

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
      email,
      userId,
    } = req.body;

    let message = {
      from: "littlePaws0508@gmail.com",
      to: `${email}`,
      subject: "Correo de confirmación",
      text: `Usted ha publicado una mascota llamada ${name}`,
    };

    const info = await mailer.sendMail(message);
    const user = await User.findById(userId);

    const result = await cloudinary.uploader.upload(image);

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
      user: user.id,
      expireAt: new Date(),
    });
    user.pets = user.pets.concat(pet.id);
    await user.save();
    res.status(200).send(pet._id);
  } catch (error) {
    res.status(400).send("Error al publicar la mascota ");
  }
});

module.exports = postPet;
