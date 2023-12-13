const { Router } = require("express");
const Product = require("../../models/Product");
const productsRelated = Router();

productsRelated.get("/:id", async (req, res) => {
  console.log("ruta de related product ---------------------------------");
  let { id } = req.params;

  try {
    let related = [];
    let response = [];
    let product = await Product.findById(id);
    let ctgrs = await Product.findOne({ hidden: false, _id: id }).then(
      (product) => product.category
    );
    for (let i = 0; i < ctgrs.length; i++) {
      related.push(
        await Product.find({ category: { $in: ctgrs }, hidden: false })
      );
    }
    related = related.flat().filter((element) => element.name !== product.name);
    for (let i = 0; i < related.length; i++) {
      if (!response.find((a) => a.name === related[i].name))
        response.push(related[i]);
    }
    console.log(response);
    res.status(200).send(response);
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = productsRelated;
