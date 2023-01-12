const { Router } = require("express");
const Pet = require("../../models/Pet");
const postPet = Router();
const cloudinary = require("../../../cloud.js");
const mailer = require("../../../mailer");

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
    } = req.body;

    let message = {
      from: "littlePaws0508@gmail.com",
      to: `${email}`,
      subject: "Correo de confirmación",
      text: `Usted ha publicado una mascota llamada ${name}`,
    };

    const info = await mailer.sendMail(message);

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
      expireAt: new Date(),
    });
    console.log(info);
    res.status(200).send(pet._id);
  } catch (error) {
    res.status(400).send("Error al publicar la mascota ");
  }
});

module.exports = postPet;
