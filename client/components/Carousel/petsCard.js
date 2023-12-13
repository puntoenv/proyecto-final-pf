import styles from "../../styles/carrusel.module.css";

import Link from "next/link";

export default function PetsCard({ nombre, imagen, genero, size, id }) {
  return (
    <div className={styles.big_container}>
      <div className={styles.containImg}>
        {/* <Link href={"/petsPosts"}> */}
        <img
          className={styles.image}
          src={imagen[0]}
          alt="imagen de la mascota"
        />
        {/* </Link> */}
      </div>
      <div className={styles.containInfo}>
        <h3 className={styles.name}> {nombre.toUpperCase()}</h3>
        <h1 className={styles.gender}> {genero}</h1>
        <h1 className={styles.size}>{size}</h1>
        <button className={styles.btn}>
          <Link href={`/detail/${id}`}>Ver detalle</Link>
        </button>
      </div>
    </div>
  );
}
//falta ruta que te lleve al ID cuando clickeas en el nombre o foto
