import Image from "next/image";
import Link from "next/link";

export default function Card({
  id,
  nombre,
  imagen,
  edad,
  genero,
  tamaño,
  tipo,
  locacion,
}) {
  return (
    <div>
      <Link href={`/detail/${id}`}>
        <h3>Nombre: {nombre}</h3>
      </Link>
      <img src={imagen} width={100} height={100} alt="imagen de la mascota" />
      {edad ? <p>Edad: {edad}</p> : null}
      {genero ? <p>Género: {genero}</p> : null}
      {tamaño ? <p>Tamaño: {tamaño}</p> : null}
      {tipo ? <p>Tipo: {tipo}</p> : null}
      {locacion ? <h4>Locación:</h4> : null}
      {locacion?.lon ? <p>Longitud: {locacion.lon}</p> : null}
      {locacion?.lat ? <p>Latitud: {locacion.lat}</p> : null}
      {locacion?.provincia ? <p>Provincia: {locacion.provincia}</p> : null}
      {locacion?.municipio ? <p>Municipio: {locacion?.municipio}</p> : null}
    </div>
  );
}
