const { Router } = require("express");
const postProduct = Router();
const cloudinary = require("../../../cloud.js");

const Product = require("../../models/Product.js");
postProduct.post("/post", async (req, res) => {
  try {
    let { name, description, image, price, stock, category } = req.body;
    let result =  await cloudinary.uploader.upload(image);
    
    
    const newProduct = await Product.create({
      name,
      description,
      image: result.url,
      category,
      price, 
      stock
    });
    res.status(200).json("Producto Creado");
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
});

module.exports = postProduct;
