const { Router } = require("express");
const Product = require("../../models/Product");
const allProducts = Router();

allProducts.get("/support-us", async (req, res) => {
  try {
    const products = await Product.find({hidden: false});
    res.status(200).send(products);
  } catch (error) {
    res.status(400).send(error.message);
  }
});


 // PRUEBA
 
module.exports = allProducts;
