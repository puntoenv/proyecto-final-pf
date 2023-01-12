const { Router } = require("express");
const Product = require("../../models/Product");

const router = Router();

router.get("/by-name", async (req, res) => {
  const { name } = req.query;
  try {
    const products = await Product.find();
    const productsFiltered = products.filter((e) => e.name.includes(name));

    res.json(productsFiltered);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
