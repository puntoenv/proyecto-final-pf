import Link from "next/link";
import React, { useState, useEffect } from "react";
import LayoutGlobal from "../../../components/LayoutGlobal/Layout";
import style from "./detailProduct.module.css";
import { formatOneItemMP } from "../../../controller/formatItemsMp";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { BsCartDashFill, BsCartPlusFill } from "react-icons/bs";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Detail({
  data,
  cart,
  addToCart,
  productOfCart,
  discountItem,
}) {
  const { user } = useUser();

  const { name, image, price, _id, stock, category, boughtBy } = data;
  const [amount, setAmount] = useState(0);
  const itemCart = productOfCart(cart, _id);

  const handlerSubmitAdded = (e) => {
    e.preventDefault();
    const product = {
      name,
      image,
      price,
      _id,
      stock,
      category,
      boughtBy,
    };
    setAmount((i) => (i = i + 1));
    addToCart(product);
    Swal.fire({
      position: "top",
      icon: "success",
      title: `Producto agregado`,
      showConfirmButton: false,
      timer: 1000,
    });
  };

  const handlerSubmitDiscount = () => {
    if (amount !== 0) {
      setAmount((i) => (i = i - 1));
      discountItem(_id);
      Swal.fire({
        position: "center",
        icon: "success",
        title: `Producto quitado de tu Carrito`,
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };

  useEffect(() => {
    itemCart && itemCart.amount > 0 && setAmount((i) => (i = itemCart.amount));
  }, [cart, amount]);

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
            <h1 className={style.nameProduct}>{data.name}</h1>
            <div className={style.containPriceAndCategorie}>
              {(itemCart && (
                <Link href="/cart" className={style.btnBuy}>
                  Comprar
                </Link>
              )) ||
                (user && (
                  <button
                    className={style.btnBuy}
                    onClick={(e) => formatOneItemMP(products)}
                  >
                    Comprar
                  </button>
                ))}

              <span className={style.priceProduct}>
                ${data.price}
                <div className={style.containFormCart}>
                  <div className={style.formCantCart}>
                    <button
                      onClick={handlerSubmitAdded}
                      className={style.modifiedCant}
                      type="submit"
                    >
                      <BsCartPlusFill className={style.icon} />
                    </button>

                    {amount !== undefined && (
                      <span className={style.amount}>{amount}</span>
                    )}

                    <span className={style.spanButtonAdd}>
                      <button
                        onClick={handlerSubmitDiscount}
                        className={style.modifiedCant}
                        type="submit"
                      >
                        <BsCartDashFill className={style.icon} />
                      </button>
                    </span>
                  </div>
                  <span className={style.spanStock}>stock: {data.stock}</span>
                </div>
              </span>
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
      await fetch(`${process.env.URL_BACK}products/detail/${params.id}`)
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
