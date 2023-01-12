import Image from "next/image";
/* import Link from "next/link"; */
import styles from "./styles.module.css";

export default function CardProduct({ info, addToCart }) {
  return (
    <div className={styles.card}>
      {/* <Link href={`/detail/${id}`}> */}
      <h3 className={styles.name}>{info.name.toUpperCase()}</h3>
      {/* </Link> */}
      <Image
        className={styles.img}
        src={info.image}
        width="300"
        height="240"
        alt="imagen de la mascota"
      />
      {info.price ? <p className={styles.size}>Precio: ${info.price}</p> : null}
      <button className={styles.btn} onClick={() => addToCart(info._id)}>
        Agregar
      </button>
    </div>
  );
}
