const { Router } = require("express");
const allPets = Router();
const Pet = require("../../models/Pet");

allPets.get("/", async (req, res) => {
  try {
    let pets = [];
    if (req.query) {
      pets = await Pet.find(req.query);
    } else {
      pets = await Pet.find({ hidden: false });
    }
    res.send(pets);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
module.exports = allPets;
