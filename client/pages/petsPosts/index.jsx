import Link from "next/link";
//import Card from "../../components/Card/index.js";
import { useState } from "react";
import { getPets, searchPet, getper, filterPets } from "../../stores/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// FILTERS----------------
import { handlerOnChange } from "../../controller/filtersPets.js";
//import { setFilteredPets } from "../../stores/actions";
//PAGINADO
import Pagina from "../../components/paginated/pagina.js";
import Layout from "../layout.js";
import NavBar from "../../components/NavBar/NavBar.js";
import styles from "./styles.module.css";
import Image from "next/image";
const ages = [];
for (let i = 0; i <= 40; i++) {
  ages.push(i);
}
/* { type, size*, age*, gender*, location? } querys de filtros*/
export default function PetAdoption() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({
    type: "",
    size: "",
    age: "",
    gender: "",
    location: "",
  });
  const dispatch = useDispatch();
  const pets = useSelector((state) => state.mascotas.mascotas);

  /* const ubi = useSelector((state) => state.caracter.provi.provincias); */

  useEffect(() => {
    dispatch(getPets());
    dispatch(getper());
  }, [dispatch]);

  useEffect(() => {
    if (pets.length === 0) {
      dispatch(getPets());
    }
  }, [pets]);

  const handlerSearch = (e) => {
    dispatch(searchPet(e.target.value));
  };
  const handlerTodas = () => {
    dispatch(getPets());
  };
  //PAGINADO////
  const pg = 10;
  const [curren, setcurren] = useState(1);
  const [maxPageLimit, setMaxPageLimit] = useState(5);
  const [minPageLimit, setMinPageLimit] = useState(0);

  //movimiento del puntero
  const ultimo = curren * pg;
  const primero = ultimo - pg;
  const pet = pets.length ? pets.slice(primero, ultimo) : [];
  //console.log(pets)
  useEffect(() => {
    setcurren(1);
  }, [filter, pets, setFilter]);

  const Page = (pageNumber) => {
    setcurren(pageNumber);
  };
  const onPrevClick = () => {
    if ((curren - 1) % pg === 0) {
      setMaxPageLimit(maxPageLimit - pg);
      setMinPageLimit(minPageLimit - pg);
    }
    setcurren((prev) => prev - 1);
  };
  const onNextClick = () => {
    if (curren + 1 > maxPageLimit) {
      setMaxPageLimit(maxPageLimit + pg);
      setMinPageLimit(minPageLimit + pg);
    }
    setcurren((prev) => prev + 1);
  };
  const typeFilter = (e) => {
    e.preventDefault();
    let { id, value } = e.target;
    let params = { id, value };
    dispatch(filterPets(params));
    console.log(id, value, pet);
  };
  return (
    <div>
      <Layout title="Mascotas" />
      <NavBar />

      <div className={styles.search}>
        <input
          className={styles.input}
          type="text"
          placeholder="Buscar..."
          onChange={handlerSearch}
        />
        {/* <button className={styles.searchB} onClick={handlerSearch}>
          Buscar
        </button> */}
      </div>

      {/* ----------------------------------FILTROS------------------------------------ */}

      <div className={styles.container2}>
        <form className={styles.form} onChange={(e) => typeFilter(e)}>
          <div>
            <button className={styles.all} onClick={handlerTodas}>
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
          <select
            id="age"
            className={styles.select}
            onChange={(e) => {
              validation(e);
              handleNumber(e);
            }}
          >
            <option className={styles.option} defaultValue={true} value="">
              Todas
            </option>
            {ages.map((age) => (
              <option className={styles.option} key={age} value={age}>
                {age}
              </option>
            ))}
          </select>
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
                  height="260"
                  src={mascota.image}
                  alt="image"
                />
                <h1 className={styles.name}>{mascota.name}</h1>
                <h2 className={styles.size}>{mascota.gender}</h2>
                <button className={styles.btn}>
                  <Link href={`/detail/${mascota._id}`}>Ver detalle</Link>
                </button>
              </div>
            );
          })}

          <div />
        </div>
      </div>

      {/* <Link href={`/detail/${pets._id}`}>
        <h1>Ver mascota</h1>
      </Link> */}

      {
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
      }

      {/* <button className={styles.next} onClick={onNextClick} value='Next'>Next</button> */}
    </div>
  );
}
