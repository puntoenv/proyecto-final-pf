import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./styles.module.css";

export default function CardProduct({ info, addToCart }) {
  const [cantidad, setCantidad] = useState(1);
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

  const handlerSubmit = (e) => {
    e.preventDefault();
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
      cantidad,
    };
    addToCart(unidad);
  };

  return (
    <div className={styles.card}>
      {/* <Link href={`/detail/${id}`}> */}
      <h3 className={styles.name}>{name.toUpperCase()}</h3>
      {/* </Link> */}
      {/* <Image
        className={styles.img}
        src={image}
        width={100}
        height={100}
        alt="imagen del producto"
      /> */}
      {price ? <p className={styles.size}>Precio: ${price}</p> : null}
      <Link href={`/detailProduct/${_id}`}>Ver Producto</Link>
      <form onSubmit={handlerSubmit}>
        <label>Cantidad</label>
        <select
          onChange={(e) => setCantidad(parseInt(e.target.value))}
          value={cantidad}
        >
          <option value="0" hidden>
            Seleccione Cantidad
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
        </select>
        <input type="submit" value="Agregar al carrito" />
      </form>
    </div>
  );
}
