import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.css";

export default function CardProduct({ info, addToCart }) {
  // console.log(info);
  return (
    <div className={styles.card}>
      <h3 className={styles.name}>{info.name.toUpperCase()}</h3>
      <Link href={`/eShop/detail/${info._id}`}>
        <img
          className={styles.img}
          src={info.image}
          alt="imagen de la mascota"
        />
      </Link>
      {info.price ? <p className={styles.size}>Precio: ${info.price}</p> : null}
      <button className={styles.btn} onClick={() => addToCart(info._id)}>
        Agregar
      </button>
    </div>
  );
}
