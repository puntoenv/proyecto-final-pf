import Image from "next/image";
import Layout from "../layout";
import Link from "next/link";
import NavBar from "../../components/NavBar/NavBar";
import styles from "./styles.module.css";
import { formatItemsMp } from "../../controller/formatItemsMp";
import { useEffect, useState } from "react";

export default function Cart({
  cart,
  setCart,
  deleteCart,
  deleteAllCart,
  actualizarCantidad,
}) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const calculoTotal = cart.reduce(
      (total, producto) => total + producto.amount * producto.price,
      0
    );
    setTotal(calculoTotal);
    console.log(calculoTotal);
  }, [cart]);
  const handlerDelete = (id) => {
    deleteCart(cart, setCart, id);
  };
  const handlerDeleteAll = () => {
    deleteAllCart(setCart);
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
            cart?.map((unidad, index) => (
              <div className={styles.card} key={index}>
                <h3 className={styles.name}>{unidad.name}</h3>
                <Image
                  className={styles.img}
                  src={unidad.image}
                  width={20}
                  height={20}
                  alt={`imagen de ${unidad.name}`}
                />
                <p className={styles.size}>Precio: ${unidad.price}</p>
                <div className={styles.cantidad}>
                  <p> Cantidad: {unidad.amount}</p>
                  <select
                    value={unidad.amount}
                    onChange={(e) =>
                      actualizarCantidad({
                        amount: e.target.value,
                        id: unidad._id,
                      })
                    }
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
                </div>
                <p>Subtotal: ${unidad.amount * unidad.price}</p>
                <button
                  className={styles.btn}
                  onClick={() => handlerDelete(unidad._id)}
                >
                  X
                </button>
              </div>
            ))
          )}
        </div>
      </div>
      <div className={styles.resumenContainer}>
        {cart.length === 0 ? null : (
          <button className={styles.vaciarCarrito} onClick={handlerDeleteAll}>
            Vaciar Carrito
          </button>
        )}
        {total > 0 ? (
          <>
            {/* // <div className={styles.resumen}> */}
            {/* <h3 className={styles.miCarrito}>Resumen de compra</h3> */}
            <p className={styles.total}>Total a pagar: ${total}</p>
            <button
              className={styles.btn}
              onClick={(e) => formatItemsMp(total)}
            >
              Finalizar Compra
            </button>
          </>
        ) : (
          // </div>
          // </div>
          <p></p>
        )}
      </div>
    </div>
  );
}
