const { Router } = require("express");
const allPets = Router();
const Pet = require("../../models/Pet");

allPets.get("/", async (req, res) => {
  try {
    let pets = await Pet.find();
    res.send(pets);
  } catch (error) {
    console.log(error);
  }
});
module.exports = allPets;
