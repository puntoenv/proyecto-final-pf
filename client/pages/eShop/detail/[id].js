import Link from "next/link";
import React from "react";
import LayoutGlobal from "../../../components/LayoutGlobal/Layout";
import style from "./detailProduct.module.css";

export default function Detail({ data }) {
  console.log(data);
  return (
    <LayoutGlobal>
      <div className={style.containProduct}>
        <Link href="/eShop" className={style.btnBack}>
          {"<"} Atras
        </Link>
        <div className={style.headerDetail}>
          <img src={data.image} className={style.imgProduct} />
          <div className={style.containInfo}>
            <h1 className={style.nameProduct}>{data.name}</h1>
            <div className={style.containPriceAndCategorie}>
              <button className={style.btnBuy}>Comprar</button>
              <span className={style.priceProduct}>${data.price}</span>
              {data.category && (
                <span className={style.categoriesProduct}>
                  <ul className={style.listCategories}>
                    categorias:
                    {data.category.map((categ, index) => (
                      <li key={index}>- {categ}</li>
                    ))}
                  </ul>
                </span>
              )}
            </div>
          </div>
        </div>
        <div className={style.containDescription}>
          <span className={style.descriptionTitle}>Description</span>
          <span className={style.contentDescription}>{data.description}</span>
        </div>
      </div>
    </LayoutGlobal>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const data = await (
      await fetch("http://localhost:3001/products/detail/" + params.id)
    ).json();
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
