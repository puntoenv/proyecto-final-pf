import React from "react";
import styles from "./history.module.css";
import CardProduct from "../CardProduct";

function index({ response }) {
  const { bought } = response;

  return (
    <div>
      <div className={styles.container_animal}>
        <h2 className={styles.letra}>Historial de compras</h2>
        <div className={styles.container_post}>
          {!bought.length ? (
            <h1 className={styles.letra}>No hay historial de compra</h1>
          ) : (
            bought?.map((producto) => (
              <CardProduct
                key={producto._id}
                info={producto}
                addToCart={addToCart}
              />
            ))
          )}

          <div />
        </div>
      </div>
    </div>
  );
}

export default index;
