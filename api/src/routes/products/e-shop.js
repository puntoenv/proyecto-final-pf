const { Router } = require("express");
const Product = require("../../models/Product");
const allProducts = Router();

allProducts.get("/", async (req, res) => {
  try {
    let allProducts = await Product.find();
    res.status(200).send(allProducts);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

allProducts.get("/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let products = await Product.paginate(
      { hidden: false },
      { page: id, limit: 10 }
    );
    res.status(200).send(products);
  } catch (error) {
    console.log(error, id);
    res.status(400).send(error.message);
  }
});

module.exports = allProducts;
