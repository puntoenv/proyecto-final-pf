import Link from "next/link";
import Card from "../../components/Card/index.js";
import { useState } from "react";
import { getPets, searchPet } from "../../stores/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function PetAdoption() {
  const [search, setSearch] = useState("");
  const [filtros, setFiltros] = useState({
    type: "",
    size: "",
    age: "",
    location: "",
  });
  const dispatch = useDispatch();
  const pets = useSelector((state) => state.mascotas.mascotas);

  useEffect(() => {
    dispatch(getPets());
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
          <select>
            <option value="" hidden>
              Tamaño
            </option>
            <option value="pequeño">Pequeño</option>
            <option value="mediano">Mediano</option>
            <option value="grande">Grande</option>
          </select>
          <select>
            <option value="" hidden>
              Género
            </option>
            <option value="hembre">Hembra</option>
            <option value="macho">Macho</option>
          </select>
          <select>
            <option value="" hidden>
              Edad
            </option>
            <option value="inicial">Inicial</option>
            <option value="intermedia">Intermedia</option>
            <option value="avanzada">Avanzada</option>
          </select>
          <select>
            <option value="" hidden>
              Ubicacion
            </option>
          </select>
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
