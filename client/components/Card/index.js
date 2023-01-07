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
  description,
}) {
  return (
    <div>
      <Link href={`/detail/${id}`}>
        <h3>Nombre: {nombre}</h3>
      </Link>
      <img src={imagen} width={100} height={100} alt="imagen de la mascota" />
      <p>Edad: {edad}</p>
      <p>Género: {genero}</p>
      <p>Tamaño: {tamaño}</p>
      <p>Tipo: {tipo}</p>
      <h4>Locación:</h4>
      {locacion?.lon ? <p>Longitud: {locacion.lon}</p> : null}
      {locacion?.lat ? <p>Latitud: {locacion.lat}</p> : null}
      {locacion?.provincia ? <p>Provincia: {locacion.provincia}</p> : null}
      {locacion?.municipio ? <p>Municipio: {locacion?.municipio}</p> : null}
      <p>Descripcion: {description}</p>
    </div>
  );
}
