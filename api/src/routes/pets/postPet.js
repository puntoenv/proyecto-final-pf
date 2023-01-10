const { Router } = require("express");
const Pet = require("../../models/Pet");
const postPet = Router();
const cloudinary = require("../../../cloud.js");

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
      pregnant,
      sociability,
      castrated,
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
      pregnant,
      sociability,
      castrated,
      userId,
    });
    res.status(200).send(pet._id);
  } catch (error) {
    console.log(error)
    res.status(400).send("Error al publicar la mascota ");
  }
});

module.exports = postPet;
