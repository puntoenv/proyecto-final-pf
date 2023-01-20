import Image from "next/image";
import React from "react";
import styles from "./styles.module.css";

const HeaderTest = ({ user, response }) => {
  console.log(response)
  return (
    <div className={styles.headContainer}>
      <div className={styles.haedwrapper}>
        <div className={styles.title}>
          <h2>{`¡Hola, ${response.name ? response.name : response.email}!`}</h2>
          <p>Bienvenido/a a Little Paws</p>
        </div>
        <div className={styles.profile}>
          <img
            src={user.picture}
            className={styles.image}
          ></img>
        </div>
      </div>
    </div>
  );
};

export default HeaderTest;
