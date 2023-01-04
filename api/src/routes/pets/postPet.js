const { Router } = require("express");
const Pet = require("../../models/Pet");
const postPet = Router();

postPet.post("/", async (req, res) => {
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
    await Pet.create({
      name,
      size,
      age,
      description,
      image,
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
