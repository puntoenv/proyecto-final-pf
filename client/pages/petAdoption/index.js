import Link from "next/link";
import Card from "../../components/Card";
import { useState } from "react";
import { getPets } from "../../stores/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


export default function PetAdoption() {

  const [search, setSearch] = useState('')
  const dispatch = useDispatch()
  const pets = useSelector( state => state.mascotas.mascotas)

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
            {pets?.map((mascota) => (
            <Card key={mascota._id}
              nombre={mascota.name}
              /* imagen={mascota.image} */ 
              edad={mascota.age}
              genero={mascota.gender}
            />
          ))} 
        </div>
      </div>
    </div>
  );
}