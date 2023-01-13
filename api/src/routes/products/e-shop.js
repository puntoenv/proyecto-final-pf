const { Router } = require("express");
const Product = require("../../models/Product");
const allProducts = Router();

allProducts.get("/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let products = await Product.paginate({}, { page: id, limit: 3 });
    res.status(200).send(products);
  } catch (error) {
    console.log(error, id);
    res.status(400).send(error.message);
  }
});

module.exports = allProducts;
