import styles from "../../styles/carrusel.module.css";
import Link from "next/link";

export default function PetsCard({ id, nombre, imagen, genero, tamano }) {
  return (
    <div className={styles.big_container}>
      <div className={styles.imgcontainer}>
         <Link href={`/detail/${id}`}>  
          <img
            className={styles.image}
            src={imagen[0]}
            // width={250}
            // height={300}
            alt="imagen de la mascota"
          />
          </Link>  
          </div>
      
      <div className={styles.containInfo}>
        <h3 className={styles.name}> {nombre.toUpperCase()}</h3>
        <h1 className={styles.gender}> {genero}</h1>
        <h1 className={styles.size}>{tamano}</h1>
      </div>
    </div>
  );
}
//falta ruta que te lleve al ID cuando clickeas en el nombre o foto
