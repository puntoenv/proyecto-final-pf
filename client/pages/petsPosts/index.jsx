import Link from "next/link";
import { useState } from "react";
import { getPets, searchPet, getper } from "../../stores/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LayoutGlobal from "../../components/LayoutGlobal/Layout";
import Layout from "../layout.js";
import NavBar from "../../components/NavBar/NavBar.js";
import styles from "./styles.module.css";
import Image from "next/image";
import logo from "../../img/logo.jpeg";
import Footer from "../../components/Footer/footer";

export default function PetAdoption() {
  const [filter, setFilter] = useState({});
  const dispatch = useDispatch();
  const pets = useSelector((state) => state.mascotas.mascotas);
  const data = useSelector((state) => state.mascotas.data);
  const paging = [];
  const ages = [];
  for (let i = 0; i <= 40; i++) {
    ages.push(i);
  }
  for (let i = 1; i <= data.pages; i++) {
    paging.push(i);
  }

  const handlerSearch = (e) => {
    dispatch(searchPet(e.target.value));
  };

  const handlerTodas = (e) => {
    e.preventDefault();
    dispatch(getPets(1));
  };

  useEffect(() => {
    dispatch(getPets(1));
    dispatch(getper());
  }, [dispatch]);

  const handlerPage = (e) => {
    e.preventDefault();
    let { value } = e.target;
    if (value === "next" && data.page !== data.pages) {
      let next = data.page + 1;
      if (filter) {
        dispatch(getPets(next, filter));
      } else {
        dispatch(getPets(next));
      }
    } else if (value === "prev" && data.page !== 1) {
      let prev = data.page - 1;
      if (filter) {
        dispatch(getPets(prev, filter));
      } else {
        dispatch(getPets(prev));
      }
    } else if (value !== "next" && value !== "prev") {
      if (filter) {
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
    return console.log(filter);
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    dispatch(getPets(1, filter));
    console.log(filter);
    return setFilter({});
  };

  return (
    <LayoutGlobal>
      <Layout title="Mascotas" />
      <Link href={"/home"} className="logo">
        <Image
          src={logo}
          alt="logo"
          className={styles.logo}
          width="auto"
          height="auto"
        />
      </Link>

      <div className={styles.containerAllPets}>
        <div className={styles.search}>
          <input
            className={styles.input}
            type="search"
            placeholder="Buscar..."
            onChange={handlerSearch}
          />
          {/* <button className={styles.searchB} onClick={handlerSearch}>
          Buscar
        </button> */}
        </div>

        {/* ----------------------------------FILTROS------------------------------------ */}

        <div className={styles.container2}>
          <form className={styles.form} onChange={(e) => handlerFilter(e)}>
            <div>
              <button className={styles.all} onClick={(e) => handlerTodas(e)}>
                Ver todas
              </button>
            </div>
            <h1 className={styles.title}>Animal</h1>
            <select className={styles.select} id="type">
              <option className={styles.option} value="animal">
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

            <h1 className={styles.title}>Edades</h1>
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
              value="Aplicar Filtros"
              onClick={(e) => handlerSubmit(e)}
            />
          </form>

          {/* ----------------------------------------------------------------------- */}
          <div className={styles.big_container}>
            <div className={styles.posts_Container}></div>
            {pet?.map((mascota) => {
              return (
                <div key={mascota._id} className={styles.card}>
                  <Image
                    className={styles.img}
                    width="300"
                    height="240"
                    src={mascota.image}
                    alt="image"
                  />
                  <h3 className={styles.name}>{mascota.name}</h3>
                  <span className={styles.size}>{mascota.gender}</span>
                  <button className={styles.btn}>
                    <Link href={`/detail/${mascota._id}`}>Ver detalle</Link>
                  </button>
                </div>
              );
            })}

            <div />
          </div>
        </div>
        <div className={styles.paging}>
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
        </div>

        {/* <Link href={`/detail/${pets._id}`}>
        <h1>Ver mascota</h1>
      </Link> */}

        {/* <button className={styles.next} onClick={onNextClick} value='Next'>Next</button> */}
      </div>
    </LayoutGlobal>
  );
}
