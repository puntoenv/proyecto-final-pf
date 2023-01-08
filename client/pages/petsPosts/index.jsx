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
          placeholder="Mascota..."
          onChange={handlerSearch}
        />
        <button className={styles.searchB} onClick={handlerSearch}>
          Buscar
        </button>
      </div>
      <div>
        <button className={styles.all} onClick={handlerTodas}>
          Ver todas
        </button>
      </div>
      {/* ----------------------------------FILTROS------------------------------------ */}
      <form onChange={(e) => typeFilter(e)}>
        <select id="type">
          <option value="animal">Animal</option>
          <option value="perro">Perros</option>
          <option value="gato">Gatos</option>
          <option value="conejo">Conejos</option>
          <option value="ave">Aves</option>
          <option value="pez">Peces</option>
          <option value="hamster">Hamsters</option>
          <option value="tortuga">Tortuga</option>
        </select>
        <select id="size">
          <option value="tamaño">Tamaño</option>
          <option value="pequeño">Pequeño</option>
          <option value="mediano">Mediano</option>
          <option value="grande">Grande</option>
        </select>
        <select id="gender">
          <option value="genero">Genero</option>
          <option value="macho">Macho</option>
          <option value="hembra">Hembra</option>
        </select>
        <select
          id="age"
          className={styles.input}
          onChange={(e) => {
            validation(e);
            handleNumber(e);
          }}
        >
          <option defaultValue={true} value="">
            Edad en años...
          </option>
          {ages.map((age) => (
            <option key={age} value={age}>
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
