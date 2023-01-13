const express = require("express");
const Product = require("../../models/Product");
const detailProduct = express.Router();

detailProduct.get("/detail/:id", async (req, res) => {
  try {
    let id = req.params.id;
    //console.log(id);
    let detail = await Product.findOne({ _id: id, hidden: false });

    res.status(200).json(detail);
  } catch (error) {
    console.log("no anda el detail");
    res.status(400).send("no funciona detailProduct.js" + error.message);
  }
});

module.exports = detailProduct;
