import Link from "next/link";
import {
  getProducts,
  searchProduct /* , addCart  */,
} from "../../stores/actions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../layout.js";
import NavBar from "../../components/NavBar/NavBar.js";
import styles from "./styles.module.css";
import Image from "next/image";
import logo from "../../img/logo.jpeg";
import Footer from "../../components/Footer/footer";
import CardProduct from "../../components/CardProduct";

export default function eShop({ addToCart }) {
  const dispatch = useDispatch();
  const productos = useSelector((state) => state.products.allProducts);
  const data = useSelector((state) => state.products.data);
  const [input, setInput] = useState({});
  const [search, setSearch] = useState("");
  const paging = [];
  for (let i = 1; i <= data.pages; i++) {
    paging.push(i);
  }
  console.log(data);

  useEffect(() => {
    dispatch(getProducts(1));
  }, [dispatch]);

  const handlerTodos = (e) => {
    e.preventDefault();
    dispatch(getProducts(1));
    e.target.reset();
  };

  const handlerSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    setInput({});
  };

  const handlerOnSearch = (e) => {
    e.preventDefault();
    console.log(search);
    dispatch(searchProduct(search, 1));
  };

  const handlerSelect = (e) => {
    e.preventDefault();
    let { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handlerFilter = (e) => {
    e.preventDefault();
  };

  const handlerPage = (e) => {
    e.preventDefault();
    let { value } = e.target;
    let page = null;
    if (value === "🡺" && data.page < data.pages) {
      page = data.page + 1;
      if (search) {
        dispatch(searchProduct(search, page));
      } else {
        dispatch(getProducts(page));
      }
    } else if (value === "🡸" && data.page > 1) {
      page = data.page - 1;
      if (search) {
        dispatch(searchProduct(search, page));
      } else {
        dispatch(getProducts(page));
      }
    } else {
      page = value;
      if (search) {
        dispatch(searchProduct(search, page));
      } else {
        dispatch(getProducts(page));
      }
    }
    console.log(e.target.value);
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
      <div className={styles.containerAllProducts}>
        <div className={styles.search}>
          <input
            className={styles.input}
            type="search"
            placeholder="Buscar..."
            onChange={(e) => handlerSearch(e)}
          />
          <button onClick={(e) => handlerOnSearch(e)}>Buscar</button>
        </div>
        <div className={styles.container2}>
          <form
            className={styles.form}
            onChange={(e) => handlerSelect(e)}
            onSubmit={(e) => handlerTodos(e)}
          >
            <div>
              <input type="submit" value="Ver Todos" className={styles.all} />
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
            <button onClick={(e) => handlerFilter(e)}>Aplicar Filtros</button>
          </form>
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
            <div>
              <button value="🡸" onClick={(e) => handlerPage(e)}>
                🡸
              </button>
              {paging?.map((p) => (
                <button value={p} key={p} onClick={(e) => handlerPage(e)}>
                  {p}
                </button>
              ))}
              <button value="🡺" onClick={(e) => handlerPage(e)}>
                🡺
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
