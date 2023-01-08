import Link from "next/link";
import Card from "../../components/Card/index.js";
import { useState } from "react";
import {
  getPets,
  searchPet,
  getper,
  filtrarMascotas,
} from "../../stores/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// FILTERS----------------
import { handlerOnChange } from "../../controller/filtersPets.js";
import { setFilteredPets } from "../../stores/actions";
//PAGINADO
import Pagina from "../../components/paginated/pagina.js";
import Layout from "../layout.js";
import NavBar from "../../components/NavBar/NavBar.js";
import styles from "./styles.module.css"

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

  const handlerSearch = (e) => {
    setSearch(e.target.value);
  };
  const handlerSearchButton = () => {
    dispatch(searchPet(search));
    setSearch("");
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
  return (
    <div>
      <Layout title="Mascotas" />
      <div></div>
      <div>
        <div>
          <input
          className={styles.search}
            type="text"
            placeholder="Mascota..."
            onChange={handlerSearch}
            value={search}
          />
          <button onClick={handlerSearchButton}>Buscar</button>
        </div>
        <div>
          <button onClick={handlerTodas}>todas las mascotas</button>
        </div>
        {/* ----------------------------------FILTROS------------------------------------ */}
        <form
          onChange={(e) =>
            handlerOnChange(e, filter, setFilter, pets, dispatch)
          }
        >
          <select name="type" id="">
            <option value="animal">animal</option>
            <option value="perros">perros</option>
            <option value="gatos">gatos</option>
            <option value="conejos">conejos</option>
            <option value="aves">aves</option>
            <option value="peces">peces</option>
            <option value="hamsters">hamsters</option>
          </select>
          <select name="size" id="">
            <option value="tamaño">tamaño</option>
            <option value="pequeño">pequeño</option>
            <option value="mediano">mediano</option>
            <option value="grande">grande</option>
          </select>
          <select name="gender" id="">
            <option value="genero">genero</option>
            <option value="macho">macho</option>
            <option value="hembra">hembra</option>
          </select>
          <input type="number" name="age" placeholder="edad" />
        </form>
        {/* ----------------------------------------------------------------------- */}
        <div>
          {pet?.map((mascota) => (
            <Card
              id={mascota._id}
              nombre={mascota.name}
              imagen={mascota.image}
              genero={mascota.gender}
            />
          ))}
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
    </div>
  );
}
