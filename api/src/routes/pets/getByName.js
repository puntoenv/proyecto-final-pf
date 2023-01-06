const { Router } = require("express");
const Pet = require("../../models/Pet");

const router = Router();

router.get("/by-name", async (req, res) => {
  const { name } = req.query;
  try {
    const pets = await Pet.find();
    const petsFiltered = pets.filter((e) => e.name.includes(name));

    res.json(petsFiltered);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;