const { Router } = require("express");
const Product = require("../../models/Product");
const allProducts = Router();

allProducts.get("/", async (req, res) => {
  try {
    const products = await Product.find({ hidden: false });

    res.json(products);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = allProducts;
