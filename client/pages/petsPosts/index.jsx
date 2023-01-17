import Link from "next/link";
import { useState } from "react";
import {
  getPets,
  searchPet,
  getper,
  sorts,
  getTypes,
} from "../../stores/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LayoutGlobal from "../../components/LayoutGlobal/Layout";
import Layout from "../layout.js";
import styles from "./styles.module.css";
import Image from "next/image";

export default function PetAdoption({ favorite, addAgregar }) {
  //console.log(favorite);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({});
  const dispatch = useDispatch();
  const pets = useSelector((state) => state.mascotas.mascotas);
  const data = useSelector((state) => state.mascotas.data);
  const types = useSelector((state) => state.mascotas.types);
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
    console.log(value);
  };

  const handlerOnSearch = (e) => {
    e.preventDefault();
    dispatch(searchPet(search, 1));
    // setSearch("");
    console.log(e);
    e.target.reset();
  };

  const handlerTodas = (e) => {
    e.preventDefault();
    dispatch(getPets(1));
    e.target.reset();
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
        console.log(value);
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
    console.log(filter);
    setFilter({});
  };

  return (
    <LayoutGlobal>
      <Layout title="Mascotas" />
      <div className={styles.containerAllPets}>
        <div className={styles.container2}>
          <form
            className={styles.form}
            onChange={(e) => handlerFilter(e)}
            onSubmit={(e) => handlerTodas(e)}
          >
            <div>
              <input type="submit" className={styles.all} value="Ver Todas" />
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
            <button className={styles.all2} onClick={(e) => handlerSubmit(e)}>
              Aplicar Filtros
            </button>
          </form>

          {/* <select className="select" onChange={handlerSort}>
          <option value=" ">Ordenar</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
          </select> */}
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
            <div className={styles.big_container}>
              <div className={styles.posts_Container}></div>
              {pets?.map((mascota) => {
                return (
                  <div key={mascota._id} className={styles.card}>
                    <Image
                      className={styles.img}
                      width="400"
                      height="240"
                      src={mascota.image}
                      alt="image"
                    />
                    <h3 className={styles.name}>{mascota.name}</h3>
                    <span className={styles.size}>{mascota.gender}</span>
                    <button className={styles.btn}>
                      <Link href={`/detail/${mascota._id}`}>Ver detalle</Link>
                    </button>
                    <button
                      className={styles.btn}
                      onClick={(e) => handlerFavorite(e, mascota)}
                    >
                      Favorito
                    </button>
                  </div>
                );
              })}
              <div />
            </div>
          </div>
        </div>
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
