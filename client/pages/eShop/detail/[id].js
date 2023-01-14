import Link from "next/link";
import React, { useState } from "react";
import LayoutGlobal from "../../../components/LayoutGlobal/Layout";
import style from "./detailProduct.module.css";
import axios from "axios";

export default function Detail({
  data,
  addToCart,
  deleteCart,
  actualizarCantidad,
}) {
  const [cantidad, setCantidad] = useState(1);

  const {
    name,
    image,
    price,
    _id,
    description,
    stock,
    category,
    boughtBy,
    hidden,
    __v,
  } = data;

  const handlerSubmit = (e) => {
    e.preventDefault();
    const unidad = {
      name,
      image,
      price,
      _id,
      description,
      stock,
      category,
      boughtBy,
      hidden,
      __v,
      cantidad,
    };
    addToCart(unidad);
    alert(`${cantidad} ${name} agregado/s al carrito`); //cambiar el alert
    setCantidad(1);
  };
  const handlerDelete = (id) => {
    deleteCart(id);
    setCantidad(1);
    alert(`${name} eliminado con exito`);
  };
  let products = [data];
  return (
    <LayoutGlobal>
      <div className={style.containProduct}>
        <div className={style.containBtnBack}>
          <Link href="/eShop" className={style.btnBack}>
            {"<"} Atras
          </Link>
        </div>
        <div className={style.headerDetail}>
          <img src={data.image} className={style.imgProduct} />
          <div className={style.containInfo}>
            <button onClick={() => handlerDelete(_id)}>X</button>
            <h1 className={style.nameProduct}>{data.name}</h1>
            <div className={style.containPriceAndCategorie}>
              <button
                className={style.btnBuy}
                onClick={(e) => {
                  try {
                    axios
                      .post("http://localhost:3001/payment", products)
                      .then(
                        (res) =>
                          (window.location.href =
                            res.data.response.body.init_point)
                      );
                  } catch (error) {
                    res.status(400).send(error);
                  }
                }}
              >
                Comprar
              </button>

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
        <form onSubmit={handlerSubmit}>
          <label>Cantidad</label>
          <select
            value={cantidad}
            onChange={(e) => {
              setCantidad(parseInt(e.target.value));
              actualizarCantidad({
                cantidad: e.target.value,
                id: _id,
              });
            }}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>
          <input type="submit" value="Agregar al carrito" />
        </form>
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
