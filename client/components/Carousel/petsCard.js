import Image from "next/image"
import styles from '../../styles/carrusel.module.css'
import Link from 'next/link'

export default function PetsCard({
  nombre,
  imagen,
  genero,
}) {
  return (
    <Link href={'/petsPosts'}>
    <div className={styles.container}> 
      <h3 className={styles.name}>  {nombre}</h3>
      <Image className={styles.image} src={imagen} width={100} height={100} alt="imagen de la mascota" /> 
      <h1 className={styles.gender}> {genero}</h1>
    </div>
    </Link>
  );
}
//falta ruta que te lleve al ID cuando clickeas en el nombre o foto