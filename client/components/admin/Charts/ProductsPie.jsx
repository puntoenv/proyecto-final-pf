import { ResponsivePie } from "@nivo/pie";
import { adminProducts } from "../../../stores/actions";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css"

const ProductsPie = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
 

  useEffect(() => {
    dispatch(adminProducts());
  }, [dispatch]);


  const data = []

  for (let i = 0; i < products.length; i++) {
    data.push({
        "id": products[i].name,
        "label": products[i].name,
        "value":  products[i].stock,
         "color": "hsl(19, 70%, 50%)"
      },);
  }

  




  
  return (
    <>
    <h1 className={styles.h1}>Stock de productos</h1>
    <div className={styles.products}>
     
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      isInteractive = {false}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={3}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={data}
      
    />
    </div>
    </>
  );
};

export default ProductsPie;
