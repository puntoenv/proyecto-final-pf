const { Router } = require("express");
const allPets = Router();
const Pet = require("../../models/Pet");
const User = require("../../models/User");

allPets.get("/", async (req, res) => {
  try {
    let allPets = await Pet.find().populate([
      { path: "user", model: User },
      { path: "adopted", model: User },
    ]);
    res.status(200).send(allPets);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});
allPets.get("/reported", async (req, res) => {
  try {
    let allPets = await Pet.find({ report: true }).populate({
      path: "user",
      model: User,
    });
    res.status(200).send(allPets);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});

allPets.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let { query } = req;
    let data = {};
    if (query) {
      data = await Pet.paginate(
        { ...query, hidden: false },
        { page: id, limit: 10 }
      );
    } else {
      data = await Pet.paginate({ hidden: false }, { page: id, limit: 10 });
    }
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});

allPets.get("/latest-pets", async (req, res) => {
  try {
    const pets = await Pet.find({ hidden: false });
    res.json(pets.reverse());
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = allPets;
