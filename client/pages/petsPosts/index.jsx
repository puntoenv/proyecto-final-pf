import styles from "./styles.module.css";
import NavBar from "../../components/NavBar/NavBar";
import Card from "../../components/Card/index.js";
import { useState } from "react";
import { getPets, searchPet, getper, filterPets } from "../../stores/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handlerOnChange } from "../../controller/filtersPets.js";
import { setFilteredPets } from "../../stores/actions";
import Pagina from "../../components/paginated/pagina.js";
import Layout from "../layout.js";
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
  useEffect(() => {
    dispatch(getPets());
    dispatch(getper());
    console.log(pets);
  }, [dispatch]);

  const handlerSearch = (e) => {
    e.preventDefault();
    dispatch(searchPet(e.target.value));
  };
  const handlerTodas = () => {
    dispatch(getPets());
  };
  const pg = 10;
  const [curren, setcurren] = useState(1);
  const [maxPageLimit, setMaxPageLimit] = useState(5);
  const [minPageLimit, setMinPageLimit] = useState(0);
  const ultimo = curren * pg;
  const primero = ultimo - pg;
  // const pet = pets.length > 0 ? pets.slice(primero, ultimo) : [];
  const pet = pets;
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
    <>
      <Layout title="Mascotas" />
      <NavBar />
      <div className={styles.page}>
        <div className={styles.filters}>
          <h1>version beta</h1>
          <div>
            <input
              type="search"
              placeholder="Mascota..."
              onChange={(e) => handlerSearch(e)}
            />
          </div>
          <div>
            <button className={styles.all} onClick={(e) => handlerTodas(e)}>
              Todas las mascotas
            </button>
          </div>

          {/* onChange={(e) =>
               handlerOnChange(e, filter, setFilter, pets, dispatch) */}
          <form onChange={(e) => typeFilter(e)}>
            <label htmlFor="type">
              <select name="type" id="type">
                <option value="">Seleccione la especie...</option>
                <option value="perros">Perros</option>
                <option value="gatos">Gatos</option>
                <option value="conejos">Conejos</option>
                <option value="aves">Aves</option>
                <option value="peces">Peces</option>
                <option value="hamsters">Hamsters</option>
                <option value="tortugas">Tortugas</option>
              </select>
            </label>
            <label htmlFor="size">
              <select name="size" id="size">
                <option value="tamaño">tamaño</option>
                <option value="pequeño">pequeño</option>
                <option value="mediano">mediano</option>
                <option value="grande">grande</option>
              </select>
            </label>
            <label htmlFor="gender">
              <select name="gender" id="gender">
                <option value="genero">genero</option>
                <option value="macho">macho</option>
                <option value="hembra">hembra</option>
              </select>
            </label>
            <input type="number" name="age" placeholder="edad" />
          </form>
        </div>
        <div className={styles.box}>
          <div className={styles.footer}>
            {/* <Pagina
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
            /> */}
          </div>
          {pet?.map((mascota) => (
            <Card
              key={mascota._id}
              id={mascota._id}
              nombre={mascota.name}
              imagen={mascota.image}
              genero={mascota.gender}
            />
          ))}
          <div className={styles.footer}>
            {/* <Pagina
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
            /> */}
          </div>
        </div>
      </div>
    </>
  );
}
