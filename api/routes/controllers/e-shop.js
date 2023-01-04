const { Router } = require("express");
const Product = require("../../models/Product");

const allProducts = Router();

allProducts.get("/supportUs", async (req, res) => {
  try {
    const products = Product.find();
    res.status(200).send(pets);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = allProducts;
