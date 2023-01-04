const { Router } = require("express");
const Pet = require("../../models/Pet");
const updatePet = Router();

updatePet.put("/:id", async (req, res) => {
  try {
    let { id } = req.params;
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
    let pet = Pet.findById(id);
    pet.name = name ? name : pet.name;
    pet["size"] = size ? size : pet["size"];
    pet.age = age ? age : pet.age;
    pet.name = name ? name : pet.name;
    pet.name = name ? name : pet.name;
  } catch (error) {}
});

module.exports = updatePet;
