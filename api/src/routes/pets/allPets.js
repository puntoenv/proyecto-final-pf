const { Router } = require("express");
const allPets = Router();
const Pet = require("../../models/Pet");

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
    console.log(data);
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
