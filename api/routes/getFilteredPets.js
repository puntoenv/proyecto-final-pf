const { Router } = require("express");
const { petsFiltered } = require("./controllers/filters/petsFiltered");
const router = Router();

// localhost:3001/filter?

router.get("/", async (req, res) => {
  const { type, size, age, gender, location } = req.query;
  console.log(type, size, age, gender, location);
  try {
    const petsFiltered = await petsFiltered({ type, size, age, gender });
    res.json(petsFiltered);
  } catch (error) {
    res.status(400).json(error.message);
  }

  res.json("no estas filtrando nada");
});

module.exports = router;
