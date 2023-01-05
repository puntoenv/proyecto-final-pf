import Link from "next/link";
import Card from "../../components/Card";
import { useState } from "react";
import { getPets } from "../../stores/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const hard = [
  { nombre: "firu", edad: 15, genero: "masculino", id: 1 },
  { nombre: "pepe", edad: 11, genero: "masculino", id: 2  },
  { nombre: "pepa", edad: 13, genero: "femenino", id: 3  },
  { nombre: "yei", edad: 3, genero: "femenino", id: 4 },
  { nombre: "paper", edad: 9, genero: "masculino", id: 5  },
  { nombre: "key", edad: 15, genero: "femenino", id: 6  },
  { nombre: "mia", edad: 8, genero: "femenino", id: 7  },
  { nombre: "firulais", edad: 5, genero: "masculino", id: 8  },
];

export default function PetAdoption() {
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()
 /*  const pets = useSelector((state) =>{state.mascotas.mascotas}) */

  useEffect(()=>{
    dispatch(getPets())
  },[])

  const handlerSearch = (e) => {
    setSearch(e.target.value)
  }
  const handlerSearchButton = () => {
    alert(`buscando a ${search}`);
    setSearch('');
  }
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
          <input type="text" placeholder="Mascota..." onChange={handlerSearch} value={search}/>
          <button onClick={handlerSearchButton}>Buscar</button>
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
            <option value="femenino">Femenino</option>
            <option value="masculino">Masculino</option>
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
          {hard.map((mascota) => (
            <Card key={mascota.id}
              nombre={mascota.nombre}
              edad={mascota.edad}
              genero={mascota.genero}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
