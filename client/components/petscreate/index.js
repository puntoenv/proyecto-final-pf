import styles from "./pets.module.css";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { PutPets } from "../../stores/actions";
import { useDispatch } from "react-redux";
function Petscrea({ response }) {
  const dispatch = useDispatch();

  const [pet, setpet] = useState([]);
  const { pets } = response;
  const arrayPets = pets.slice();
  const handleClick = (id, obj) => {
    /*const arrPets = arrayPets.filter((items) => items.hidden !== true);
    setpet(arrPets);*/
    PutPets(id, obj);
  };
  console.log(pets);
  return (
    <div>
      <div className={styles.container_animal}>
        <h2 className={styles.letra}>Tus publicaciones</h2>
        <div className={styles.container_post}>
          {!pets.length ? (
            <h1 className={styles.letra}>No hay historial de creaciones</h1>
          ) : (
            pets?.map((mascota) => {
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
                  <button
                    className={styles.delet}
                    onClick={(e) => handleClick(mascota._id, { hidden: true })}
                  >
                    x
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default Petscrea;
