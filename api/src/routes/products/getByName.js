const { Router } = require("express");
const Product = require("../../models/Product");

const router = Router();

router.get("/by-name/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let { name } = req.query;
    let products = await Product.paginate(
      { name: { $regex: name, $options: "i" }, hidden: false },
      { page: id, limit: 10 }
    );
    res.send(products);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

module.exports = router;
