const { Router } = require("express");
const petsRelated = Router();
const Pet = require("../../models/Pet");

petsRelated.get("/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let pet = await Pet.findOne({ hidden: false, _id: id });
    let types = await Pet.find({ hidden: false, type: pet.type });
    let sizes = await Pet.find({ hidden: false, size: pet.size });
    let related = [...types, ...sizes];
    res.status(200).send(related);
  } catch (error) {
    console.error(error);
  }
});

module.exports = petsRelated;
