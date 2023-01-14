import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./styles.module.css";
import { TbShoppingCartPlus } from "react-icons/tb";

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
    alert(`${cantidad} ${name} agregado/s al carrito`); //cambiar el alert
    setCantidad(1);
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.name}>{name.toUpperCase()}</h3>
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
      <div className={styles.divInfoProduct}>
        <Link href={`/eShop/detail/${_id}`} className={styles.name}>
          {name.toUpperCase()}
        </Link>
        <div className={styles.divPriceAddCart}>
          {price ? (
            <Link href={`/eShop/detail/${_id}`} className={styles.price}>
              ${price}
            </Link>
          ) : null}
          <form onSubmit={handlerSubmit} className={styles.formCantCart}>
            <select
              className={styles.selectCant}
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
            <span className={styles.spanButtonAdd}>
              <button className={styles.addCant} type="submit">
                <TbShoppingCartPlus className={styles.icon} /> Agregar
              </button>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}
