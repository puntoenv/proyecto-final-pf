import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { BsCartDashFill, BsCartPlusFill } from "react-icons/bs";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

export default function CardProduct({
  info,
  addToCart,
  cart,
  setCart,
  productOfCart,
  discountItem,
}) {
  const { name, image, price, _id, stock, category, boughtBy } = info;
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
    addToCart(product);
    setAmount((i) => (i = i + 1));
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
        position: "top",
        icon: "success",
        title: `Producto quitado de tu Carrito`,
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };

  useEffect(() => {
    console.log(itemCart);
    itemCart && itemCart.amount > 0 && setAmount((i) => (i = itemCart.amount));
  }, [cart, amount]);

  return (
    <div className={styles.card}>
      <Link className={styles.linkImg} href={`/eShop/detail/${_id}`}>
        <img className={styles.img} src={image} alt="imagen del producto" />
      </Link>
      <div className={styles.divInfoProduct}>
        <Link href={`/eShop/detail/${_id}`} className={styles.name}>
          {name.toUpperCase()}
        </Link>
        <div className={styles.divPriceAddCart}>
          {price ? (
            <Link href={`/eShop/detail/${_id}`} className={styles.price}>
              ${price}
            </Link>
          ) : null}
          <div className={styles.formCantCart}>
            <button
              onClick={handlerSubmitAdded}
              className={styles.modifiedCant}
              type="submit"
            >
              <BsCartPlusFill className={styles.icon} />
            </button>

            {amount !== undefined && (
              <span className={styles.amount}>{amount}</span>
            )}

            <span className={styles.spanButtonAdd}>
              <button
                onClick={handlerSubmitDiscount}
                className={styles.modifiedCant}
                type="submit"
              >
                <BsCartDashFill className={styles.icon} />
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
