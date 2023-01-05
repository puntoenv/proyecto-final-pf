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
      userId,
    } = req.body;
    const result = await cloudinary.uploader.upload(image);
    await Pet.create({
      name,
      size,
      age,
      description,
      image: result.url,
      type,
      location,
      gender,
      userId,
    });
    res.status(200).json("Mascota creada correctamente.");
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = postPet;
