import Link from "next/link";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Layout from "../layout";
import NavBar from "../../components/NavBar/NavBar";
import styles from "./styles.module.css";
import CardProduct from "../../components/cardsCart/CardProduct";
import { formatItemsMp } from "../../controller/formatItemsMp";

export default function Cart({
  cart,
  setCart,
  deleteCart,
  deleteAllCart,
  productOfCart,
  addToCart,
  discountItem,
}) {
  const { user } = useUser();
  const [total, setTotal] = useState(0);

  const modifiedTotal = () => {
    const total = cart.reduce(
      (total, producto) => (total += producto.subtotal),
      0
    );
    setTotal((i) => (i = total));
  };

  useEffect(() => {
    const total = cart.reduce(
      (total, producto) => (total += producto.amount * producto.price),
      0
    );
    setTotal((i) => (i = total));
  }, [cart, total]);

  const handlerDeleteAll = () => {
    deleteAllCart(cart, setCart);
  };

  return (
    <div>
      <div>
        <Layout title="Carrito" />
        <NavBar />

        <div className={styles.big_container}>
          {cart.length === 0 ? (
            <p className={styles.carritoVacio}> Carrito vacio </p>
          ) : (
            cart?.map((product, index) => (
              <CardProduct
                product={product}
                cart={cart}
                addToCart={addToCart}
                discountItem={discountItem}
                deleteCart={deleteCart}
                productOfCart={productOfCart}
                modifiedTotal={modifiedTotal}
                key={index}
              />
            ))
          )}
        </div>
      </div>
      <div className={styles.resumenContainer}>
        {!cart.length ? null : (
          <button className={styles.vaciarCarrito} onClick={handlerDeleteAll}>
            Vaciar Carrito
          </button>
        )}
        {cart.length && (
          <>
            <p className={styles.total}>Total a pagar: ${total}</p>
            {user ? (
              <button
                className={styles.btn}
                onClick={(e) => formatItemsMp(total)}
              >
                Finalizar Compra
              </button>
            ) : (
              <Link className={styles.btn} href="/api/auth/login">
                Inicia sesion o registrate para finalizar la compra
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  );
}
