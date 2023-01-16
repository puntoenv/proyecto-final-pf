import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./style.module.css";
import {
  BsCartDashFill,
  BsCartPlusFill,
  BsFillTrashFill,
} from "react-icons/bs";
import "sweetalert2/src/sweetalert2.scss";

export default function CardProduct({
  product,
  addToCart,
  cart,
  modifiedTotal,
  productOfCart,
  deleteCart,
  discountItem,
}) {
  const { name, image, price, _id, stock, category, boughtBy } = product;
  const [amount, setAmount] = useState(0);
  const itemCart = productOfCart(cart, _id);

  const handlerSubmitAdded = (e) => {
    modifiedTotal();
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
  };

  const handlerSubmitDiscount = () => {
    modifiedTotal();
    if (amount !== 0) {
      setAmount((i) => (i = i - 1));
      discountItem(_id);
    }
  };

  const handlerDelete = (id) => {
    deleteCart(id);
  };

  useEffect(() => {
    itemCart && itemCart.amount > 0 && setAmount((i) => (i = itemCart.amount));
  }, [cart, amount]);

  return (
    <div className={styles.card}>
      <div className={styles.containImgName}>
        <h3 className={styles.name}>{product.name}</h3>
        <Image
          className={styles.img}
          src={product.image}
          width={200}
          height={140}
          alt={`imagen de ${product.name}`}
        />
      </div>
      <p className={styles.price}>Precio: ${product.price}</p>
      <div className={styles.containCantSubt}>
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
        <p className={styles.subtotal}>
          Subtotal: ${product.amount * product.price}
        </p>
      </div>

      <button className={styles.btn} onClick={() => handlerDelete(product._id)}>
        <BsFillTrashFill />
      </button>
    </div>
  );
}
