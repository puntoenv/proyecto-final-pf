const Product = require("../../models/Product.js");

const productsFiltered = async ({ rangePrice, category }) => {
  const { minPrice, maxPrice } = rangePrice;

  const categories = category.map((categ) => ({ category: categ }));

  if (minPrice && maxPrice && categories.length) {
    const leakedProducts = await Product.find({
      $and: [
        { price: { $gte: minPrice, $lte: maxPrice } },
        {
          $or: categories,
        },
      ],
    });

    return leakedProducts;
  } else if (minPrice && maxPrice) {
    const leakedProducts = await Product.find({
      price: { $gte: minPrice, $lte: maxPrice },
    });

    return leakedProducts;
  } else if (categories.length) {
    const leakedProducts = await Product.find({
      $or: categories,
    });

    return leakedProducts;
  }
};

module.exports = productsFiltered;
