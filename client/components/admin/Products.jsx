import React, { useEffect } from "react";
import { adminProducts } from "../../stores/actions";
import { useDispatch, useSelector } from "react-redux";
import ProductsPie from "./Charts/ProductsPie";

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    dispatch(adminProducts());
  }, [dispatch]);

  const productPie = [];

  for (let i = 0; i < products.length; i++) {
    productPie.push({ x: products[i].name, y: products[i].stock, text:products[i].stock });
  }

  
  return (
    <div>
      <ProductsPie data={productPie} legendVisiblity />
    </div>
  );
};

export default Products;
