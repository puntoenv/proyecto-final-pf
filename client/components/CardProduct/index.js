import Link from "next/link";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import styles from "./styles.module.css";
import { BsCartDashFill, BsCartPlusFill } from "react-icons/bs";

export default function CardProduct({
  info,
  addToCart,
  cart,
  discountItem,
}) {
  const { user } = useUser();
  const { name, image, price, _id, stock, category, boughtBy } = info;
  const [amount, setAmount] = useState(0);
  const itemCart = productOfCart(cart, _id);

  const id_User = user && user.sub.split("|")[1];

  const handlerSubmitAdded = (e) => {
    e.preventDefault();
    const product = {
      name,
      image,
      price,
      id_User,
      _id,
      stock,
      category,
      boughtBy,
    };
    addToCart(product);
    setAmount((i) => (i = i + 1));
  };

  const handlerSubmitDiscount = () => {
    if (amount !== 0) {
      setAmount((i) => (i = i - 1));
      discountItem(_id);
    }
  };

  useEffect(() => {
    itemCart && itemCart.amount > 0 && setAmount((i) => (i = itemCart.amount));
  }, [cart, amount]);

  return (
    <div className={styles.card}>
      <Link href={`/eShop/detail/${_id}`} className={styles.name}>
        {name}
      </Link>
      <Link className={styles.linkImg} href={`/eShop/detail/${_id}`}>
        <img className={styles.img} src={image} alt="imagen del producto" />
      </Link>
      <div className={styles.divInfoProduct}>
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
        {price ? (
          <Link href={`/eShop/detail/${_id}`} className={styles.price}>
            ${price}
          </Link>
        ) : null}
        {/* <div className={styles.detail}> */}
        <Link href={`/eShop/detail/${_id}`}>
          <div className={styles.button}>
            <button className={styles.detail}>Ver Producto</button>
          </div>
        </Link>
        {/* </div> */}
      </div>
    </div>
  );
}
