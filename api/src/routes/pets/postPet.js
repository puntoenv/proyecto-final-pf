const { Router } = require("express");
const Pet = require("../../models/Pet");
const postPet = Router();
const cloudinary = require("../../../cloud.js");

postPet.post("/post-pet", async (req, res) => {
  console.log(req.body);
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
      userId,
      expireAt: new Date(),
    });

    res.status(200).send(pet._id);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error al publicar la mascota ");
  }
});

module.exports = postPet;
