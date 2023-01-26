import Link from "next/link";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "../../stores/actions";
import LayoutGlobal from "../../components/LayoutGlobal/Layout";
import styles from "./styles.module.css";
import CardProduct from "../../components/cardsCart/CardProduct";
import { formatItemsMp } from "../../controller/formatItemsMp";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { BsFillTrashFill } from "react-icons/bs";
import HistoryVacio from "../../components/CompoRelle"
const fn = (user, dispatch, setNumCall) => {
  if (user) {
    const sub = user.sub.split("|");
    if (sub[0] === "google-oauth2") {
      dispatch(
        authUser(`${user.nickname}@gmail.com`, user.name || user.nickname)
      );
    } else {
      dispatch(authUser(user.name, null));
    }
  }
  setNumCall(1);
};

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
  const dispatch = useDispatch();

  const [numCall, setNumCall] = useState(0);
  !numCall && user && fn(user, dispatch, setNumCall);

  const userAuth = useSelector((state) => state.userAuth.userData);

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
    <LayoutGlobal title="Carrito" authUser={userAuth}>
      <div className={styles.containCart}>
        <div>
          <div className={styles.big_container}>
            {cart.length === 0 ? (
              
              <div className={styles.carritoVacio}> <HistoryVacio/> </div>
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
              Vaciar Carrito{" "}
              <BsFillTrashFill className={styles.iconDeleteCart} />
            </button>
          )}
          {cart.length && (
            <>
              <p className={styles.total}>Total a pagar: ${total}</p>
              {user ? (
                <button
                  className={styles.btn}
                  onClick={(e) => formatItemsMp(userAuth, Swal)}
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
    </LayoutGlobal>
  );
}
