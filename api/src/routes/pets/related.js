const { Router } = require("express");
const petsRelated = Router();
const Pet = require("../../models/Pet");

petsRelated.get("/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let related = [];
    let pet = await Pet.findOne({ _id: id });
    let types = await Pet.find({ hidden: false, type: pet.type });
    let sizes = await Pet.find({ hidden: false, size: pet.size });
    let pets = [...types, ...sizes];
    pets = pets.filter((element) => element.name !== pet.name);
    for (let i = 0; i < pets.length; i++) {
      if (!related.find((a) => a.name === pets[i].name)) related.push(pets[i]);
    }
    res.status(200).send(related);
  } catch (error) {
    console.error(error);
  }
});

module.exports = petsRelated;
