import Image from "next/image";
import Layout from "../layout";
import Link from "next/link";
import NavBar from "../../components/NavBar/NavBar";
import styles from "./styles.module.css";

export default function Cart({ cart, deleteCart, deleteAllCart }) {
  const handlerDelete = (id) => {
    deleteCart(id);
  };
  const handlerDeleteAll = () => {
    deleteAllCart();
  };
  return (
    <div>
      <div>
        <Layout title="Carrito" />
        <NavBar />

        <button className={styles.btn}>Finalizar Compra</button>
        <div className={styles.big_container}>
          {cart?.map((unidad, index) => (
            <div className={styles.card} key={index}>
              <h3 className={styles.name}>{unidad.name}</h3>
              <img
                className={styles.img}
                src={unidad.image}
                width={20}
                height={20}
                alt={`imagen de ${unidad.name}`}
              />
              <p className={styles.size}>Precio: {unidad.price}</p>
              <button
                className={styles.btn}
                onClick={() => handlerDelete(unidad._id)}
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>
      <button onClick={handlerDeleteAll}>Vaciar Carrito</button>
    </div>
  );
}
