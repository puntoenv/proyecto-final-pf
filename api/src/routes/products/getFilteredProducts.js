const { Router } = require("express");
const router = Router();
const productsFiltered = require("../../controllers/filters/productsFiltered");

router.get("/", async (req, res) => {
  try {
    const leakedProducts = await productsFiltered(req.body);

    res.json(leakedProducts);
  } catch (error) {
    res.status(400).json({ error: error.messagge });
  }
});

module.exports = router;
