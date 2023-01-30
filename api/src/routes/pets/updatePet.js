const { Router } = require("express");
const Pet = require("../../models/Pet");
const User = require("../../models/User");
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
      healthExtra,
      pregnant,
      sociability,
      castrated,
      userId,
      hidden,
      adopted,
      updateAdopted,
      report,
      motiveReport,
    } = req.body;
    let pet = await Pet.findById(id);

    const user = await User.findById(userId);
    if (adopted) {
      pet.adopted.user = user._id;
      pet.adopted.status = "pending";
      user.petsAdopted = user.petsAdopted.concat(pet._id);
    }
    if (hidden) {
      hidden === "show" ? (pet.hidden = false) : (pet.hidden = true);
    }
    if (updateAdopted) {

      // const petAdopted = user.petsAdopted.filter(ele => ele == id)[0]
      // console.log(petAdopted)

     pet.adopted.status = updateAdopted ? updateAdopted : pet.adopted.status
    // for(let i = 0; i < user.petsAdopted.length ; i++){
    //   console.log(user.petsAdopted[i]._id);
    //   // if(user.petsAdopted[i]._id === id){
    //   //   user.petsAdopted.adopted.status = updateAdopted
    //   // }
    // }
    }
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
    pet.healthExtra = healthExtra ? healthExtra : pet.healthExtra;
    pet.pregnant = pregnant ? pregnant : pet.pregnant;
    pet.sociability = sociability ? sociability : pet.sociability;
    pet.castrated = castrated ? castrated : pet.castrated;
    pet.report = report ? report : pet.report;
    pet.motiveReport = motiveReport ? motiveReport : pet.motiveReport;
    let updatePet = await pet.save();
    await user.save();
    // console.log(pet);
    res.status(200).send(updatePet);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
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
