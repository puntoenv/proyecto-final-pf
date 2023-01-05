import React from "react";
import styles from "../../styles/Home.module.css";

function Nosotros() {
  return (
    
    <div className={styles.boxInfoNosotros}>
        <div className={styles.boxTitulo}>
        <h1 className={styles.aboutUs}>
            Sobre Nosotros
        </h1>
        </div>
        
      <p className={styles.infoNosotros}>
        Nosotros somos Little Paws y nuestro objetivo es poder buscarles un
        hogar y buenas condiciones de vida a los animalitos que estan
        abandonados en la calle. Además contamos con un e-shop donde podes
        comprarle comida, juguetes y muchas mas cosas a tu peludito. Con las
        ganancias del e-shop, nosotros nos podemos financiar en mejorar nuestro
        servicio y tambien ayudar a refugios y fundaciones de animalitos.
      </p>
    </div>
  );
}

export default Nosotros;
