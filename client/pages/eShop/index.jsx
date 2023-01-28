import {
  allcategories,
  filterProducts,
  getProducts,
  searchProduct,
} from "../../stores/actions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../layout.js";
import styles from "./styles.module.css";
import { authUser } from "../../stores/actions";
import { useUser } from "@auth0/nextjs-auth0/client";
import CardProduct from "../../components/CardProduct";
import LayoutGlobal from "../../components/LayoutGlobal/Layout";
import { BsWindowSidebar } from "react-icons/bs";

const fn = (user, dispatch, setNumCall) => {
  if (user) {
    const sub = user.sub.split("|");
    if (sub[0] === "google-oauth2") {
      dispatch(
        authUser(`${user.nickname}@gmail.com`, user.name || user.nickname)
      );
    } else {
      dispatch(authUser(user.name, null));
    }
  }
  setNumCall(1);
};

export default function eShop({
  addToCart,
  cart,
  setCart,
  productOfCart,
  discountItem,
}) {
  const { user } = useUser();
  const dispatch = useDispatch();
  const productos = useSelector((state) => state.products.allProducts);
  const data = useSelector((state) => state.products.data);
  const [input, setInput] = useState({ category: "" });
  const [search, setSearch] = useState("");
  const categories = useSelector((state) => state.products.categories);

  const userAuth = useSelector((state) => state.userAuth.userData);
  const [numCall, setNumCall] = useState(0);

  !numCall && user && fn(user, dispatch, setNumCall);

  const paging = [];
  for (let i = 1; i <= data.pages; i++) {
    paging.push(i);
  }

  useEffect(() => {
    dispatch(getProducts(1));
    dispatch(allcategories());
  }, [dispatch]);

  const handlerTodos = (e) => {
    e.preventDefault();
    dispatch(getProducts(1));
    setInput({});
  };

  const handlerSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    setInput({});
  };

  const handlerOnSearch = (e) => {
    e.preventDefault();
    dispatch(searchProduct(search, 1));
    e.target.reset();
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
  };

  const handlerFilter = (e) => {
    e.preventDefault();
    dispatch(filterProducts(input, 1));
    e.target.reset();
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
  };

  return (
    <LayoutGlobal authUser={userAuth}>
      <Layout title="Productos" />
      <div className={styles.containerAllProducts}>
        <a name="up"></a>
        <form
          onChange={(e) => handlerSearch(e)}
          onSubmit={(e) => handlerOnSearch(e)}
          className={styles.box}
          id="search"
        >
          <input
            className={styles.input}
            type="search"
            placeholder="Buscar..."
          />
          <input type="submit" className={styles.btn} value="Buscar" />
        </form>
        <div className={styles.container2}>
          <form
            className={styles.form}
            onChange={(e) => handlerSelect(e)}
            onSubmit={(e) => handlerFilter(e)}
          >
            <input type="submit" value="" />
            <button className={styles.all} onClick={(e) => handlerTodos(e)}>
              Ver Todos
            </button>
            <h1 className={styles.title}>Categorias</h1>
            <select className={styles.select} name="category">
              <option
                className={styles.option}
                value="Todos"
                defaultValue={true}
              >
                Todas
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
            <input
              type="submit"
              className={styles.btnFilter}
              value="Aplicar Filtros"
            />
          </form>
          <div className={styles.pages}>
            <button
              onClick={(e) => {
                handlerPage(e);
                window.scrollTo(0, 0);
              }}
              value="🡸"
            >
              🡸
            </button>
            {paging?.map((p) => (
              <button
                value={p}
                key={p}
                onClick={(e) => {
                  handlerPage(e);
                  window.scrollTo(0, 0);
                }}
                className={styles.pageNum}
              >
                {p}
              </button>
            ))}
            <button
              onClick={(e) => {
                handlerPage(e);
                window.scrollTo(0, 0);
              }}
              value="🡺"
            >
              <a href="#search">🡺</a>
            </button>
          </div>
          <div className={styles.containerCards}>
            {productos?.map((producto) => {
              return (
                <CardProduct
                  key={producto._id}
                  info={producto}
                  addToCart={addToCart}
                  cart={cart}
                  serCart={setCart}
                  productOfCart={productOfCart}
                  discountItem={discountItem}
                />
              );
            })}
            <div />
          </div>
        </div>
        <div className={styles.pages}>
          <button
            onClick={(e) => {
              handlerPage(e);
              window.scrollTo(0, 0);
            }}
            value="🡸"
          >
            🡸
          </button>

          {paging?.map((p) => (
            <button
              value={p}
              key={p}
              onClick={(e) => {
                handlerPage(e);
                window.scrollTo(0, 0);
              }}
              className={styles.pageNum}
            >
              {p}
            </button>
          ))}
          <button
            onClick={(e) => {
              handlerPage(e);
              window.scrollTo(0, 0);
            }}
            value="🡺"
          >
            🡺
          </button>
        </div>
      </div>
    </LayoutGlobal>
  );
}

// export async function getServerSideProps({ query }) {
//   try {
//     // const data = query;
//     console.log(query);
//     return {
//       props: {
//         dataProps: query,
//       },
//     };
//   } catch (error) {
//     console.log(error);
//   }
// }
