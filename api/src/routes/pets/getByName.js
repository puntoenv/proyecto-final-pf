const { Router } = require("express");
const Pet = require("../../models/Pet");

const router = Router();

router.get("/by-name/:id", async (req, res) => {
  const { name } = req.query;
  const { id } = req.params;
  try {
    const pets = await Pet.paginate(
      { name: { $regex: name, $options: "i" }, hidden: false },
      { page: id, limit: 10 }
    );
    // const petsFiltered = pets.filter((e) => e.name.includes(name));
    res.json(pets);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

module.exports = router;
