import React from "react";
import styles from "../../pages/home/styles.module.css";

function Nosotros() {
  return (

    <>
    <div className={styles.boxInfoNosotros}>
      

      <div className={styles.boxTitulo}>
        <h1 className={styles.aboutUs}>Sobre Nosotros</h1>
      </div>

      <p className={styles.infoNosotros}>
        Little Paws es una ONG que tiene como objetivo encontrar un hogar y
        buenas condiciones de vida a los animales abandonados en la calle. Para
        esto, los usuarios tienen la posibilidad de publicar en nuestra
        plataforma aquellos animales que estén busca de una familia. Además,
        para aquellos usuarios que no puedan adoptar pero deseen contribuir con
        Little Paws, contamos con un e-shop donde pueden colaborar con la compra
        de cualquiera de nuestros productos. De esta manera, podremos financiar
        los gastos de la ONG, como también ayudar a refugios y fundaciones de
        animales.
      </p>

      {/* <h1 className={styles.tituloAdopcion}>Info Adopciones</h1> */}

      {/* <p className={styles.infoAdopcion}>
        En nuestra web puedes encontrar a tu peludito. Puedes ver todas las
        mascotas en adopcion y filtarlas por tama;o, ubicacion, genero, etc.
        Tener una mascota es una responsabilidad, por lo tanto, pedimos
        compromiso cuando se trate de adoptar a un nuevo integrantes. Y tambien
        compromiso para los usuarios que publican los posteos.
      </p> */}
    </div>
    </>
  );
}

export default Nosotros;
