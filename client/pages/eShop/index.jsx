import Link from "next/link";
import {
  getProducts,
  searchProduct /* , addCart  */,
} from "../../stores/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../layout.js";
import styles from "./styles.module.css";
import CardProduct from "../../components/CardProduct";
import LayoutGlobal from "../../components/LayoutGlobal/Layout";

export default function eShop({ addToCart }) {
  const dispatch = useDispatch();
  const productos = useSelector((state) => state.products.allProducts);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handlerTodos = (e) => {
    e.preventDefault();
    dispatch(getProducts());
  };
  const handlerSearch = (e) => {
    dispatch(searchProduct(e.target.value));
  };
  return (
    <LayoutGlobal>
      <Layout title="Productos" />
      <div className={styles.containerAllProducts}>
        <div className={styles.search}>
          <input
            className={styles.input}
            type="search"
            placeholder="Buscar..."
            onChange={handlerSearch}
          />
        </div>

        {/* ----------------------------------FILTROS------------------------------------ */}

        <div className={styles.search}>
          <input
            className={styles.input}
            type="search"
            placeholder="Buscar..."
            onChange={handlerSearch}
          />
        </div>
        <div className={styles.container2}>
          <form className={styles.form}>
            <div>
              <button className={styles.all} onClick={handlerTodos}>
                Ver todos
              </button>
            </div>
            <h1 className={styles.title}>Accesorios</h1>
            <select className={styles.select} id="accesorios">
              <option className={styles.option} value="indumentaria">
                Todos
              </option>
              <option className={styles.option} value="collar">
                Collar
              </option>
              <option className={styles.option} value="gorros">
                Gorros
              </option>
              <option className={styles.option} value="Chapitas">
                Chapitas
              </option>
              <option className={styles.option} value="remeras">
                Remeras
              </option>
            </select>

            <h1 className={styles.title}>Precio</h1>
            <select className={styles.select} id="precio">
              <option className={styles.option} value="precio">
                Todos
              </option>
              <option className={styles.option} value="barato">
                0$ a 999$
              </option>
              <option className={styles.option} value="accesible">
                1.000$ a 4.999$
              </option>
              <option className={styles.option} value="costoso">
                5.000$ a 10.000$
              </option>
            </select>

            <h1 className={styles.title}>Tipo</h1>
            <select className={styles.select} id="tipo">
              <option className={styles.option} value="tipo">
                Todos
              </option>
              <option className={styles.option} value="perro">
                Perros
              </option>
              <option className={styles.option} value="gato">
                Gatos
              </option>
              <option className={styles.option} value="conejo">
                Conejos
              </option>
              <option className={styles.option} value="ave">
                Aves
              </option>
              <option className={styles.option} value="pez">
                Peces
              </option>
              <option className={styles.option} value="hamster">
                Hamsters
              </option>
              <option className={styles.option} value="tortuga">
                Tortuga
              </option>
            </select>
          </form>
          {/* ----------------------------------------------------------------------- */}

          <div className={styles.big_container}>
            <div className={styles.posts_Container}></div>
            {productos?.map((producto) => {
              return (
                <CardProduct
                  key={producto._id}
                  info={producto}
                  addToCart={addToCart}
                />
              );
            })}

            <div />
          </div>
        </div>
        {/* <button className={styles.next} onClick={onNextClick} value='Next'>Next</button> */}
      </div>
    </LayoutGlobal>
  );
}

/* export async function getServerSideProps() {
  const respuesta = await axios("http://localhost:3001/products");
  return {
    props: {
      productsEshop: respuesta.data,
    },
  };
} */
