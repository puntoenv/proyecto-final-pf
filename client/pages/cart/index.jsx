import Link from "next/link";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Layout from "../layout";
import NavBar from "../../components/NavBar/NavBar";
import styles from "./styles.module.css";
import CardProduct from "../../components/cardsCart/CardProduct";
import { formatItemsMp } from "../../controller/formatItemsMp";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

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
    Swal.fire({
      title: "Estas seguro que deseas vaciar el carrito?",
      text: "Esta acción es irreversible",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, estoy seguro!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAllCart(cart, setCart);
        Swal.fire({
          title: "Carrito vaciado exitosamente",
          icon: "success",
        });
      }
    });
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
