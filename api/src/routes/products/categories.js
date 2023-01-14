const { Router } = require("express");
const Product = require("../../models/Product");
const categories = Router();

categories.get("/", async (req, res) => {
  let ctgrs = [];
  try {
    ctgrs = await Product.find()
      .then((data) => data.map((p) => p.category))
      .then((data) => Array.from(new Set(data.flat())));
    res.send(ctgrs);
  } catch (error) {
    console.log(error);
  }
});

module.exports = categories;
