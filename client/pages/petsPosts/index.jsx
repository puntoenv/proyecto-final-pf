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
          {pets?.map((mascota) => (
            <Card
              id={mascota._id}
              nombre={mascota.name}
              imagen={mascota.image}
              edad={mascota.age}
              genero={mascota.gender}
              tamaño="pequeño"
              tipo={mascota.type}
              locacion={mascota.location}
              key={mascota._id}
            />
          ))}
        </div>
      </div>

      {/* <Link href={`/detail/${pets._id}`}>
        <h1>Ver mascota</h1>
      </Link> */}
    </div>
  );
}
