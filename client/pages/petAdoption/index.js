import Link from 'next/link'
import Card from '../../components/Card'
const hard = [
  { nombre: 'firu', edad: 15, genero: 'masculino' },
  { nombre: 'pepe', edad: 11, genero: 'masculino' },
  { nombre: 'pepa', edad: 13, genero: 'femenino' },
  { nombre: 'yei', edad: 3, genero: 'femenino' },
  { nombre: 'paper', edad: 9, genero: 'masculino' },
  { nombre: 'key', edad: 15, genero: 'femenino' },
  { nombre: 'mia', edad: 8, genero: 'femenino' },
  { nombre: 'firulais', edad: 5, genero: 'masculino' }
]

export default function PetAdoption () {
  return (
        <div>
         <div>
          <nav>
            <Link href='/nosotros'>Nosotros</Link>
            <Link href='/contactanos'>Contactanos</Link>
            <Link href='/perfil'>Perfil</Link>
          </nav>
        </div>
        <div>
            <div>
                <input type='text' placeholder='Mascota...'/>
                <button>Buscar</button>
            </div>
            <div className='filtros'>
                <select>
                    <option value=''hidden>Tamaño</option>
                    <option value='pequeño'>Pequeño</option>
                    <option value='mediano'>Mediano</option>
                    <option value='grande'>Grande</option>
                </select>
                <select>
                    <option value=''hidden>Género</option>
                    <option value='femenino'>Femenino</option>
                    <option value='masculino'>Masculino</option>
                </select>
                <select>
                    <option value=''hidden>Edad</option>
                    <option value='inicial'>Inicial</option>
                    <option value='intermedia'>Intermedia</option>
                    <option value='avanzada'>Avanzada</option>
                </select>
                <select>
                    <option value=''hidden>Ubicacion</option>
                </select>
            </div>
            <div>
                { hard.map(mascota => <Card nombre={ mascota.nombre} edad={ mascota.edad} genero={ mascota.genero}/>) }
            </div>
        </div>
        </div>
  )
};
