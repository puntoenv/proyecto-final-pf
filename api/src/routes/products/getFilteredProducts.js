const { Router } = require("express");
const router = Router();
const productsFiltered = require("../../controllers/filters/productsFiltered");
const Product = require("../../models/Product");

// localhost:3001/filter?

router.get("/:id", async (req, res) => {
  let { id } = req.params;
  let { category, price } = req.query;
  let products = {};
  try {
    if (category && price) {
      category = category.split("-");
      console.log(category);
      if (price === "barato") {
        products = await Product.paginate(
          {
            category: { $in: [...category] },
            price: { $gte: 0, $lte: 999 },
          },
          { page: id, limit: 10 }
        );
      } else if (price === "accesible") {
        products = await Product.paginate(
          {
            category: { $in: [...category] },
            price: { $gte: 1000, $lte: 4999 },
          },
          { page: id, limit: 10 }
        );
      } else if (price === "costoso") {
        products = await Product.paginate(
          {
            category: { $in: [...category] },
            price: { $gte: 5000, $lte: 10000 },
          },
          { page: id, limit: 10 }
        );
      }
    } else if (category && !price) {
      category = category.split("-");
      console.log(category);
      products = await Product.paginate(
        { category: { $in: [...category] } },
        { page: id, limit: 10 }
      );
    } else if (!category && price) {
      if (price === "barato") {
        products = await Product.paginate(
          { price: { $gte: 0, $lte: 999 } },
          { page: id, limit: 10 }
        );
      } else if (price === "accesible") {
        products = await Product.paginate(
          { price: { $gte: 1000, $lte: 4999 } },
          { page: id, limit: 10 }
        );
      } else if (price === "costoso") {
        products = await Product.paginate(
          { price: { $gte: 5000, $lte: 10000 } },
          { page: id, limit: 10 }
        );
      }
    } else {
      products = await Product.paginate();
    }
    res.send(products);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
