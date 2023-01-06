import React from "react";
import styles from "../../pages/home/styles.module.css";

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

      <h1 className={styles.tituloAdopcion}>
            Sobre Adopciones
        </h1>

      <p className={styles.infoAdopcion}>
     En nuestra web puedes encontrar a tu peludito. Puedes ver todas las mascotas en adopcion y filtarlas por tama;o, ubicacion, genero, etc.
     Tener una mascota es una responsabilidad, por lo tanto, pedimos compromiso cuando se trate de adoptar a un nuevo integrantes. Y tambien compromiso
     para los usuarios que publican los posteos.

      </p>
    </div>
  );
}

export default Nosotros;
