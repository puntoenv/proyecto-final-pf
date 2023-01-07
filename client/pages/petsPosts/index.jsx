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
//PAGINADO
import Pagina from "../../components/paginated/pagina.js";
/* { type, size*, age*, gender*, location? } querys de filtros*/
export default function PetAdoption() {
  const [search, setSearch] = useState("");
  const [filtros, setFiltros] = useState({
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
  const handlerFiltrado = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };
  const handlerAplicar = () => {
    dispatch(filtrarMascotas(filtros));
    setFiltros({
      type: "",
      size: "",
      age: "",
      gender: "",
      location: "",
    });
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
  }, []);
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
      <div>
        <nav>
          <Link href="/nosotros">Nosotros</Link>
          <Link href="/contactanos">Contactanos</Link>
          <Link href="/perfil">Perfil</Link>
        </nav>
      </div>
      <div>
        <div>
          <input
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
        <div className="filtros">
          <select name="size" onClick={handlerFiltrado}>
            <option value="" hidden>
              Tamaño
            </option>
            <option value="pequeño">Pequeño</option>
            <option value="mediano">Mediano</option>
            <option value="grande">Grande</option>
          </select>
          {/* <input type="text" placeholder="filtrar por edad" /> */}
          <select name="gender" onClick={handlerFiltrado}>
            <option value="" hidden>
              Género
            </option>
            <option value="hembra">Hembra</option>
            <option value="macho">Macho</option>
          </select>
          <select name="age" onClick={handlerFiltrado}>
            <option value="" hidden>
              Edad
            </option>
            <option value="inicial">Inicial</option>
            <option value="intermedia">Intermedia</option>
            <option value="avanzada">Avanzada</option>
          </select>
          <button onClick={handlerAplicar}>aplicar filtros</button>
          {/* <select name="location" onClick={handlerFiltrado}>
            <option value="" hidden>
              Locacion
            </option>
            {ubi?.map((el) => (
              <option key={el.nombre} value={el.nombre}>
                {el.nombre}
              </option>
            ))}
          </select> */}
        </div>
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
