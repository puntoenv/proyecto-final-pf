const Product = require("../../models/Product.js");

const productsFiltered = async (name,category,stock) => {


  let productFiltered = [];
  let Products = await Product.find();
  let ProductsF = Products
if (name) {
  productFiltered = ProductsF.filter(e => e.name.toLowerCase()=== name.toLowerCase());
  ProductsF=productFiltered;
  return productFiltered;
}
if (category) {
  productFiltered = ProductsF.map(e => e.category.name.filter(e => e.name.toLowerCase()=== name.toLowerCase()));
  ProductsF=productFiltered;
  return productFiltered;
}
if (stock>0) {
  productFiltered = ProductsF.filter(e => e.stock > 0);
  ProductsF=productFiltered;
  return productFiltered;
}
return [];
}

module.exports = productsFiltered;