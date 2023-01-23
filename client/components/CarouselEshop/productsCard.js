import styles from "./styles.module.css";

export default function ProductCard({ info }) {
  const { name, image, price } = info;
  return (
    <div className={styles.card}>
      <div className={styles.name}>{name}</div>
      <div className={styles.linkImg}>
        <img className={styles.img} src={image} alt="imagen del producto" />
      </div>
      <div className={styles.divInfoProduct}>
        {price ? <div className={styles.price}>${price}</div> : null}
      </div>
    </div>
  );
}
