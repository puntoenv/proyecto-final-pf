import Link from "next/link";
import { useState } from "react";
import { getProducts, searchProduct, addCart } from "../../stores/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../layout.js";
import NavBar from "../../components/NavBar/NavBar.js";
import styles from "./styles.module.css";
import Image from "next/image";
import logo from "../../img/logo.jpeg";
import Footer from "../../components/Footer/footer";
import CardProduct from "../../components/CardProduct";

export default function PetAdoption() {
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

  const addToCart = (id) => {
    dispatch(addCart(id));
  };

  return (
    <div>
      <Layout title="Productos" />
      <NavBar />
      <Link href={"/home"} className="logo">
        <Image
          src={logo}
          alt="logo"
          className={styles.logo}
          width="auto"
          height="auto"
        />
      </Link>

      <div className={styles.search}>
        <input
          className={styles.input}
          type="search"
          placeholder="Buscar..."
          onChange={handlerSearch}
        />
      </div>

      {/* ----------------------------------FILTROS------------------------------------ */}

      <div className={styles.container2}>
        <form className={styles.form}>
          <div>
            <button className={styles.all} onClick={(e) => handlerTodos(e)}>
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
          {productos?.map((producto) => (
            <CardProduct
              key={producto._id}
              info={producto}
              addToCart={addToCart}
            />
          ))}

          <div />
        </div>
      </div>
      {/*(
               <div key={producto._id} className={styles.card}>
                <Image
                  className={styles.img}
                  width="300"
                  height="240"
                  src={producto.image}
                  alt="image"
                />
                <h1 className={styles.name}>{producto.name}</h1>
                <h2 className={styles.size}>${producto.price}</h2>
              </div>
            ); */}
      {/* <Link href={`/detail/${pets._id}`}>
        <h1>Ver mascota</h1>
      </Link> */}

      {/* {
        <Pagina
          pets={pets}
          pg={pg}
          page={Page}
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
          curren={curren}
          maxPageLimit={maxPageLimit}
          minPageLimit={minPageLimit}
          setMaxPageLimit={setMaxPageLimit}
          setMinPageLimit={setMinPageLimit}
        />
      } */}
      <Footer />
      {/* <button className={styles.next} onClick={onNextClick} value='Next'>Next</button> */}
    </div>
  );
}
