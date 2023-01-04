const { Router } = require("express");
const allPets = Router();
// const Pet = require("../../models/Pet.js");
const petsFiltered = require("../../controllers/filters/petsFiltered");
const Pet = require("../../models/Pet");

allPets.get("/:filter", async (req, res) => {
  const { filter } = req.params;

  try {
    if (filter === "all") {
      const pets = await Pet.find();

      res.json({ error: null, pets });
    } else if (filter === "filter") {
      const { type, size, age, gender, location } = req.query;
      const petsFilters = await petsFiltered({
        type,
        size,
        age,
        gender,
      });

      res.json(petsFilters);
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});
module.exports = allPets;
