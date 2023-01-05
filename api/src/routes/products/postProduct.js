const { Router } = require("express");
const postProduct = Router();

const Product = require("../../models/Product.js");

postProduct.post("/", async (req, res) => {
  try {
    let {
      name,
      description,
      image,
      price,
      stock,
      category
     
    } = req.body;
    await Product.create({
        name,
        description,
        image,
        price,
        stock,
        category
    });
    res.status(200).json("Producto Creado");
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = postProduct;
