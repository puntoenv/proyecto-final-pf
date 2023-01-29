// en proceso...
const Router = require("express");
const cloudinary = require("../../../cloud");
const Product = require("../../models/Product");
const User = require("../../models/User");
const updateProduct = Router();

updateProduct.put("/:id", async (req, res) => {
  try {
    let { id } = req.params;

    let product = await Product.findById(id);
    let {
      name,
      description,
      price,
      boughtBy,
      hidden,
      image,
      stock,
      category,
      star_reviews,
    } = req.body;
    if (hidden) {
      hidden === "show" ? (product.hidden = false) : (product.hidden = true);
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
      product.star_reviews = star_reviews ? star_reviews : product.star_reviews;
    }
    let save = await product.save();
    console.log(save);
    res.status(200).send(product);
  } catch (error) {
    console.log(error);
  }
});

// prueba

updateProduct.put("/reviews/:id", async (req, res) => {
  const { id } = req.params;
  const { stars, reviews, user_id } = req.body;
  console.log(stars);
  const product = await Product.findById(id);
  const user = await User.findById(user_id);

  const star_revi = {
    stars,
    reviews,
    user: user._id,
  };

  product.star_reviews = product.star_reviews.concat(star_revi);
  await product.save();
  user.review_star = user.review_star.concat({
    stars,
    reviews,
    product: product._id,
  });
  await user.save();
  res.status(200).json("reviews enviado correctamente");
});

module.exports = updateProduct;
