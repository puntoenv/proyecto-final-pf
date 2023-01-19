const { Router } = require("express");
const Product = require("../../models/Product");
const productsRelated = Router();

productsRelated.get("/:id", async (req, res) => {
  let { id } = req.params;
  let related = [];
  try {
    let ctgrs = await Product.findById(id).then((product) => product.category);
    for (let i = 0; i < ctgrs.length; i++) {
      related.push(
        await Product.find({ category: { $in: [ctgrs[i]] }, hidden: false })
      );
    }
    res.status(200).send(related.flat());
  } catch (error) {
    console.error(error);
  }
});

module.exports = productsRelated;
