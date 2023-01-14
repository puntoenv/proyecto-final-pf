import styles from "./pets.module.css";
import Link from "next/link";
import Image from "next/image";
function Petscrea({ response }) {
  const { pets } = response;
  console.log(response)
 // console.log(response);
  return (
    <div>
      <div className={styles.container_animal}>
        <h2 className={styles.letra}>posteo de mascotas</h2>
        <div className={styles.container_post}>
          {!pets.length ? <h1 className={styles.letra}>no hay historial de compra</h1> : pets?.map((mascota) => {
            return (
              <div key={mascota._id} className={styles.card}>
                <img
                  className={styles.img}
                  src={mascota.image}
                  width="200px"
                  height="150px"
                  alt="image"
                />
                <h1 className={styles.name}>{mascota.name}</h1>
                <h2 className={styles.size}>{mascota.gender}</h2>
                <button className={styles.btn}>
                  <Link href={`/detail/${mascota._id}`}>Ver detalle</Link>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Petscrea;
