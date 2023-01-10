import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.css";

export default function CardProduct({ id, nombre, imagen, precio }) {
  return (
    <div className={styles.card}>
      {/* <Link href={`/detail/${id}`}> */}
      <h3>{nombre.toUpperCase()}</h3>
      {/* </Link> */}
      <Image src={imagen} width={100} height={100} alt="imagen de la mascota" />
      {precio ? <p>Precio: {precio}</p> : null}
    </div>
  );
}
