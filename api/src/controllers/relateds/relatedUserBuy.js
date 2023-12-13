const User = require("../../models/User");
const Product = require("../../models/Product");

const related = async (idUser, arrIdProducts, data, res) => {
  const buyer = await User.findById(idUser);
  const arrProduct = [];

  for (let i = 0; i < arrIdProducts.length; i++) {
    const purchased = await Product.findById(arrIdProducts[i]);

    purchased.boughtBy = purchased.boughtBy.concat(buyer._id);
    await purchased.save();
    arrProduct.push(purchased);
  }

  for (let i = 0; i < arrProduct.length; i++) {
    buyer.bought = buyer.bought.concat(arrProduct[i]._id);
  }
  buyer.save();

  res.json(data);
};

module.exports = {
  related,
};
