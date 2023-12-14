const { Router } = require("express");
const Product = require("../../models/Product");
const User = require("../../models/User");

const router = Router();
// NO ESTA LISTO...........................
router.post("/buy/:id_user/:id_product", async (req, res) => {
  const { id_user, id_product } = req.params;
  console.log("aca?");
  try {
    const buyer = await User.findById(id_user);
    const purchaseProduct = await Product.findById(id_product);

    if (buyer.hidden) return res.json("the user cannot make purchases");
    if (purchaseProduct.stock <= 0)
      return res.json("the product is out of stock");

    buyer.bought.concat(purchaseProduct._id);
    await purchaseProduct.boughtBy.concat(buyer.id);
    purchaseProduct.stock = (await purchaseProduct.stock) - 1;

    res.json("successful purchase");
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
