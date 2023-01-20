// en proceso...
const Router = require("express");
const cloudinary = require("../../../cloud");
const Product = require("../../models/Product");
const updateProduct = Router();

updateProduct.put("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let product = await Product.findById(id);
    let { name, description, price, boughtBy, hidden, image, stock, category } =
      req.body;
    if (hidden) {
      product.hidden = hidden;
    } else {
      if (image) {
        let result = await cloudinary.uploader.upload(image);
        product.image = result ? result.url : product.image;
      }
      product.name = name ? name : product.name;
      product.description = description ? description : product.description;
      product.price = price ? price : product.price;
      product.boughtBy = boughtBy ? boughtBy : product.boughtBy;
      product.stock = stock ? stock : product.stock;
      product.category = category ? category : product.category;
    }
    let save = await product.save();
    console.log(save);
    res.status(200).send(product);
  } catch (error) {
    console.log(error);
  }
});

module.exports = updateProduct;

/*
                                        ◥------◥
                                        l ● ▄ ◉ l ѠOOƑ!
                                        l‿/ʊ\‿l
                                        l══o══l
                                        ︳ ︳︳ l⊃
                                        ఋ︵ ఋ
 */
