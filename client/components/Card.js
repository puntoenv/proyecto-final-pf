import Image from 'next/image'


export default function Card ({ nombre, imagen, edad, genero, tamaño, tipo, locacion }) {

  return (
        <div>
            <h4>Nombre: { nombre }</h4>
            <Image
            src={imagen}
            width={100}
            height={100}
            alt='imagen de la mascota'
            />
            <p>Edad: { edad }</p>
            <p>Género: { genero }</p>
            <p>tamaño: {tamaño}</p>
            <p>tipo: {tipo}</p>
            <p>locacion</p>
            <p>provincia: { locacion.provincia }</p>
            <p>municipio: { locacion.municipio }</p>
        </div>
  )
};
