import React from "react";
import styles from "./history.module.css";
function index({ response }) {
  const { bought } = response;
  return (
    <div>
      <h2>historial de compras</h2>
      <div className={styles.big_container}>
        <div className={styles.posts_Container}></div>
        {bought?.map((producto) => (
          <CardProduct
            key={producto._id}
            info={producto}
            addToCart={addToCart}
          />
        ))}

        <div />
      </div>
    </div>
  );
}

export default index;
