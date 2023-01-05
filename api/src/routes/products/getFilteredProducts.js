const { Router } = require("express");
const router = Router();
const productsFiltered = require("../../controllers/filters/productsFiltered");

// localhost:3001/filter?

router.get("/", async (req, res) => {
  const { name, category,stock } = req.query;
  console.log(name);
  try {
    const productsFilters = await productsFiltered( name,category,stock );

    res.json(productsFilters);
  } catch (error) {
    res.status(400).json("Error: no anda " + error.message);
  }
});

module.exports = router;
