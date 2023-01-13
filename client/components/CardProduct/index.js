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
    alert(`${cantidad} ${name} agregado/s al carrito`);
  };

  return (
    <div className={styles.card}>
      <span className={styles.name}>{name.toUpperCase()}</span>
      <Image
        className={styles.img}
        src={image}
        width="300"
        height="240"
        alt="imagen del producto"
      />
      {price ? <p className={styles.size}>Precio: ${price}</p> : null}
      <Link href={`/eShop/detail/${_id}`}>
        <h1>Ver Producto</h1>
      </Link>
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
