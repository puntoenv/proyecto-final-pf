import Link from "next/link";
import styles from "../../styles/carruselShop.module.css";

export default function ProductCard({ info }) {
  const { name, image, price, _id } = info;
  return (
    <div className={styles.big_container}>
      <h3 className={styles.name}> {name.toUpperCase()} </h3>
      <div className={styles.containImg}>
        <img className={styles.image} src={image} alt="imagen del producto" />
        <hr className={styles.linea}></hr>
      </div>
      <div className={styles.containInfo}>
        <h1 className={styles.price}>${price} </h1>
        <Link href={`/eShop/detail/${_id}`}>
          <div className={styles.btn}>
            <button className={styles.detail}>Ver Producto</button>
          </div>
        </Link>
      </div>
    </div>
  );
}
