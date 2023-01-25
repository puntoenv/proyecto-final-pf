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
      health,
      pregnant,
      sociability,
      castrated,
      userId,
      hidden,
      report,
      motiveReport,
    } = req.body;
    let pet = await Pet.findById(id);
    pet.name = name ? name : pet.name;
    pet["size"] = size ? size : pet["size"];
    pet.age = age ? age : pet.age;
    pet.description = description ? description : pet.description;
    pet.image = image ? image : pet.image;
    pet.type = type ? type : pet.type;
    pet.gender = gender ? gender : pet.gender;
    pet.location = location ? location : pet.location;
    // pet.userId = userId ? userId : pet.userId;
    pet.health = health ? health : pet.health;
    pet.pregnant = pregnant ? pregnant : pet.pregnant;
    pet.sociability = sociability ? sociability : pet.sociability;
    pet.castrated = castrated ? castrated : pet.castrated;
    pet.hidden = hidden ? hidden : pet.hidden;
    pet.report = report ? report : pet.report;
    pet.motiveReport = motiveReport ? motiveReport : pet.motiveReport;
    let updatePet = await pet.save();
    console.log(pet);
    res.status(200).send(updatePet);
  } catch (error) {
    res.status(400).send(error);
  }
});

updatePet.put("/delete/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let { hidden } = req.body;
    let pet = await Pet.findById(id);
    pet.hidden = hidden ? hidden : pet.hidden;
    let updatePet = await pet.save();
    res.status(200).send(updatePet);
  } catch (error) {
    res.status(400).send("error al modificar");
  }
});

updatePet.put("/report/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let { motiveReport } = req.body;
    let pet = await Pet.findById(id);
    pet.report = true;
    if (
      !motiveReport ||
      motiveReport.length < 15 ||
      motiveReport.length > 100
    ) {
      throw new Error(
        "Tienes que explicar tu razón para denunciar entre 15 y 100 carácteres."
      );
    } else {
      pet.motiveReport = motiveReport;
    }
    let updatePet = await pet.save();
    res.status(200).send(updatePet);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
module.exports = updatePet;
