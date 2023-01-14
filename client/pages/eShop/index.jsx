import Link from "next/link";
import axios from "axios";
import {
  allcategories,
  filterProducts,
  getProducts,
  searchProduct /* , addCart  */,
} from "../../stores/actions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../layout.js";
import styles from "./styles.module.css";
import CardProduct from "../../components/CardProduct";
import LayoutGlobal from "../../components/LayoutGlobal/Layout";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";

export default function eShop({ addToCart }) {
  const dispatch = useDispatch();
  const productos = useSelector((state) => state.products.allProducts);
  const data = useSelector((state) => state.products.data);
  const [input, setInput] = useState({ category: "" });
  const [search, setSearch] = useState("");
  const categories = useSelector((state) => state.products.categories);
  const paging = [];
  for (let i = 1; i <= data.pages; i++) {
    paging.push(i);
  }
  console.log(data);

  useEffect(async () => {
    dispatch(getProducts(1));
    dispatch(allcategories());
  }, [dispatch]);

  const handlerTodos = (e) => {
    e.preventDefault();
    dispatch(getProducts(1));
    setInput({});
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
    if (name === "category") {
      if (input.category) {
        input[name] = input[name] + "-" + value;
      } else {
        input[name] = value;
      }
    } else {
      input[name] = value;
    }
    console.log(input.category);
  };

  const handlerFilter = (e) => {
    e.preventDefault();
    dispatch(filterProducts(input, 1));
  };

  const handlerPage = (e) => {
    e.preventDefault();
    let { value } = e.target;
    let page = null;
    if (value === "🡺" && data.page < data.pages) {
      page = data.page + 1;
      if (search) {
        dispatch(searchProduct(search, page));
      } else if (input) {
        dispatch(filterProducts(input, page));
      } else {
        dispatch(getProducts(page));
      }
    } else if (value === "🡸" && data.page > 1) {
      page = data.page - 1;
      if (search) {
        dispatch(searchProduct(search, page));
      } else if (input) {
        dispatch(filterProducts(input, page));
      } else {
        dispatch(getProducts(page));
      }
    } else {
      page = value;
      if (search) {
        dispatch(searchProduct(search, page));
      } else if (input) {
        dispatch(filterProducts(input, page));
      } else {
        dispatch(getProducts(page));
      }
    }
    console.log(e.target.value);
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
            onChange={(e) => handlerSearch(e)}
          />
          <button onClick={(e) => handlerOnSearch(e)} className={styles.btn}>
            Buscar
          </button>
        </div>
        <div className={styles.container2}>
          <form
            className={styles.form}
            onChange={(e) => handlerSelect(e)}
            onSubmit={(e) => handlerTodos(e)}
          >
            <input type="submit" value="Ver Todos" className={styles.all} />
            <h1 className={styles.title}>Categorias</h1>
            <select className={styles.select} name="category">
              <option
                className={styles.option}
                value="Todos"
                defaultValue={true}
              >
                Todos
              </option>
              {categories?.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <h1 className={styles.title}>Precio</h1>
            <select className={styles.select} name="price">
              <option className={styles.option} value="Todos">
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
            <button className={styles.all} onClick={(e) => handlerFilter(e)}>
              Aplicar Filtros
            </button>
          </form>
          <div className={styles.containerCards}>
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
        <div className={styles.pages}>
          <button onClick={(e) => handlerPage(e)}>
            <IoIosArrowDropleftCircle className={styles.iconPage} />
          </button>
          {paging?.map((p) => (
            <button
              value={p}
              key={p}
              onClick={(e) => handlerPage(e)}
              className={styles.pageNum}
            >
              {p}
            </button>
          ))}
          <button onClick={(e) => handlerPage(e)}>
            <IoIosArrowDroprightCircle className={styles.iconPage} />
          </button>
        </div>
      </div>
    </LayoutGlobal>
  );
}
