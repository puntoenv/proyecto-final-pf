import Image from "next/image";
import Link from "next/link";
/* import Link from "next/link"; */
import styles from "./styles.module.css";

export default function CardProduct({ info, addToCart }) {
  const {
    name,
    image,
    price,
    _id,
    description,
    stock,
    category,
    boughtBy,
    hidden,
    __v,
  } = info;

  const handlerAdd = () => {
    const unidad = {
      name,
      image,
      price,
      _id,
      description,
      stock,
      category,
      boughtBy,
      hidden,
      __v,
    };
    addToCart(unidad);
    alert(`${name} agregado con exito`);
  };

  return (
    <div className={styles.card}>
      {/* <Link href={`/detail/${id}`}> */}
      <h3 className={styles.name}>{name.toUpperCase()}</h3>
      {/* </Link> */}
      <Image
        className={styles.img}
        src={image}
        width={100}
        height={100}
        alt="imagen del producto"
      />
      {price ? <p className={styles.size}>Precio: ${price}</p> : null}
      <Link href={`/detailProduct/${_id}`}>Ver Producto</Link>
      <button className={styles.btn} onClick={handlerAdd}>
        Agregar
      </button>
    </div>
  );
}
