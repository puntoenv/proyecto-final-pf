import styles from './pets.module.css'
import Link from 'next/link'
import Image from 'next/image'
function Petscrea({response}) {
   const {pets} = response
  return (
    <div>
      <h2>posteo de mascotas</h2>
      {pets?.map((mascota) => {
        console.log(mascota._id)
        return (
          <div key={mascota._id} className={styles.card}>
            <Image
              className={styles.img}
              width="300"
              height="240"
              src={mascota.image}
              alt="image"
            />
            <h1 className={styles.name}>{mascota.name}</h1>
            <h2 className={styles.size}>{mascota.gender}</h2>
            <button className={styles.btn}>
              <Link href={`/detail/${mascota._id}`}>Ver detalle</Link>
            </button>
          </div>
        );
      })}</div>
  )
}

export default Petscrea