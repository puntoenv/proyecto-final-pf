import Link from "next/link";
import { useState } from "react";
import { getPets, searchPet, getper, getTypes } from "../../stores/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LayoutGlobal from "../../components/LayoutGlobal/Layout";
import Layout from "../layout.js";
import styles from "./styles.module.css";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";
import { authUser } from "../../stores/actions";

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

export default function PetAdoption({ favorite, addAgregar }) {
  //console.log(favorite);

  const { user } = useUser();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({});
  const dispatch = useDispatch();
  const pets = useSelector((state) => state.mascotas.mascotas);
  const data = useSelector((state) => state.mascotas.data);
  const types = useSelector((state) => state.mascotas.types);

  const [numCall, setNumCall] = useState(0);
  const userAuth = useSelector((state) => state.userAuth.userData);

  !numCall && user && fn(user, dispatch, setNumCall);

  console.log(userAuth);
  const paging = [];
  const ages = [];
  for (let i = 0; i <= 40; i++) {
    ages.push(i);
  }
  for (let i = 1; i <= data.pages; i++) {
    paging.push(i);
  }

  const handlerSearch = (e) => {
    e.preventDefault();
    let { value } = e.target;
    setSearch(value);
    setFilter({});
  };

  const handlerOnSearch = (e) => {
    e.preventDefault();
    dispatch(searchPet(search, 1));
    // setSearch("");
    e.target.reset();
  };

  const handlerTodas = (e) => {
    e.preventDefault();
    dispatch(getPets(1));
  };

  //   const handlerSort = (e)=>{
  //     e.preventDefault();
  //     dispatch(sorts(e.target.value));
  // }
  const handlerFavorite = (e, ani) => {
    e.preventDefault();
    addAgregar(ani);
  };
  useEffect(() => {
    dispatch(getPets(1));
    dispatch(getper());
    dispatch(getTypes());
  }, [dispatch]);

  const handlerPage = (e) => {
    e.preventDefault();
    let { value } = e.target;
    if (value === "🡺" && data.page !== data.pages) {
      let next = data.page + 1;
      if (search) {
        dispatch(searchPet(search, next));
      } else if (filter) {
        dispatch(getPets(next, filter));
      } else {
        dispatch(getPets(next));
      }
    } else if (value === "🡸" && data.page !== 1) {
      let prev = data.page - 1;
      if (search) {
        dispatch(searchPet(search, prev));
      } else if (filter) {
        dispatch(getPets(prev, filter));
      } else {
        dispatch(getPets(prev));
      }
    } else if (value !== "🡺" && value !== "🡸") {
      if (search) {
        dispatch(searchPet(search, page));
      } else if (filter) {
        dispatch(getPets(value, filter));
      } else {
        dispatch(getPets(value));
      }
    }
  };

  const handlerFilter = (e) => {
    e.preventDefault();
    setFilter({ ...filter, [e.target.id]: e.target.value });
    setSearch("");
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    dispatch(getPets(1, filter));
    setFilter({});
    e.target.reset();
  };

  return (
    <LayoutGlobal authUser={userAuth}>
      <Layout title="Mascotas" />

      {/* CONTENEDOR DE TODA LA PAGINA : containerAllPets*/}
      <div className={styles.containerAllPets}>
        {/* CONTEENDOR DE LOS FILTROS : CONTAINER2*/}
        <div className={styles.container2}>
          <form
            className={styles.form}
            onChange={(e) => handlerFilter(e)}
            onSubmit={(e) => handlerSubmit(e)}
          >
            <div>
              <button className={styles.all} onClick={(e) => handlerTodas(e)}>
                Ver Todas
              </button>
            </div>
            <h1 className={styles.title}>Especie</h1>
            <select className={styles.select} id="type">
              <option className={styles.option} value="animal">
                Todos
              </option>
              {types?.map((type) => (
                <option className={styles.option} key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <h1 className={styles.title}>Tamaño</h1>
            <select className={styles.select} id="size">
              <option className={styles.option} value="tamaño">
                Todos
              </option>
              <option className={styles.option} value="pequeño">
                Pequeño
              </option>
              <option className={styles.option} value="mediano">
                Mediano
              </option>
              <option className={styles.option} value="grande">
                Grande
              </option>
            </select>

            <h1 className={styles.title}>Género</h1>
            <select className={styles.select} id="gender">
              <option className={styles.option} value="genero">
                Todos
              </option>
              <option className={styles.option} value="macho">
                Macho
              </option>
              <option className={styles.option} value="hembra">
                Hembra
              </option>
            </select>
            <h1 className={styles.title}>Edad</h1>
            <select id="age" className={styles.select}>
              <option className={styles.option} defaultValue={true} value="">
                Todas
              </option>
              {ages.map((age) => (
                <option className={styles.option} key={age} value={age}>
                  {age}
                </option>
              ))}
            </select>
            <input
              type="submit"
              className={styles.all2}
              value="Aplicar Filtros"
            />
          </form>

          {/* <select className="select" onChange={handlerSort}>
          <option value=" ">Ordenar</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
          </select> */}

          {/* CONTENEDOR SEARCH : CAJA*/}
          <div className={styles.caja}>
            <form
              className={styles.box}
              onChange={(e) => {
                handlerSearch(e);
              }}
              onSubmit={(e) => handlerOnSearch(e)}
            >
              <input
                type="search"
                placeholder="Buscar mascota..."
                autoFocus
                className={styles.input}
              />
              <input type="submit" className={styles.searchB} value="Buscar" />
            </form>
            <div className={styles.pagingTop}>
              <input
                className={styles.paginate}
                type="button"
                value="🡸"
                onClick={(e) => handlerPage(e)}
              />
              {paging.map((page) => (
                <input
                  className={styles.paginate}
                  type="button"
                  value={page}
                  key={page}
                  onClick={(e) => handlerPage(e)}
                />
              ))}
              <input
                className={styles.paginate}
                type="button"
                value="🡺"
                onClick={(e) => handlerPage(e)}
              />
            </div>
            {/* CONTENEDOR DE LAS CARDS BIG_CONTAINER */}
            <div className={styles.big_container}>
              <div className={styles.posts_Container}></div>
              {pets?.map((mascota) => {
                // CADA CARD =CARD
                return (
                  <div key={mascota._id} className={styles.card}>
                    <img
                      className={styles.img}
                      // width="400"
                      // height="240"
                      src={mascota.image[0]}
                      alt="image"
                    />
                    <h3 className={styles.name}>{mascota.name}</h3>
                    <span className={styles.size}>{mascota.gender}</span>
                    <button className={styles.btn}>
                      <Link href={`/detail/${mascota._id}`}>Ver detalle</Link>
                    </button>
                    <button
                      className={styles.corazon}
                      onClick={(e) => handlerFavorite(e, mascota)}
                    >
                      ♡
                    </button>
                  </div>
                );
              })}
              <div />
            </div>
          </div>
        </div>

        {/* CONTENDOR PAGINADO : PAGING */}
        <div className={styles.paging}>
          <input
            className={styles.paginate}
            type="button"
            value="🡸"
            onClick={(e) => handlerPage(e)}
          />
          {paging.map((page) => (
            <input
              className={styles.paginate}
              type="button"
              value={page}
              key={page}
              onClick={(e) => handlerPage(e)}
            />
          ))}
          <input
            className={styles.paginate}
            type="button"
            value="🡺"
            onClick={(e) => handlerPage(e)}
          />
        </div>
      </div>
    </LayoutGlobal>
  );
}
