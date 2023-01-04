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
    pet.description = description ? description : pet.description;
    pet.image = image ? image : pet.image;
    pet.type = type ? type : pet.type;
    pet.gender = gender ? gender : pet.gender;
    pet.location = location ? location : pet.location;
    pet.userId = userId ? userId : pet.userId;
    let updatePet = await pet.save();
    res.status(200).send(updatePet);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = updatePet;
