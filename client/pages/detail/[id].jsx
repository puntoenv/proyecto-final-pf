import Image from "next/image";
import styles from "./detail.module.css";

export default function Detail({ data }) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.detail}>
          <div className={styles.text}>
            <div>
              <h4> Nombre: </h4>
              <span> {data.name} </span>
            </div>
            <div>
              <h4> Edad: </h4>
              <span> {data.age} </span>
            </div>
            <div>
              <h4> Tamaño: </h4>
              <span> {data.size} </span>
            </div>
            <div>
              <h4> Sexo: </h4>
              <span> {data.gender} </span>
            </div>
            <div>
              <h4> Descripción: </h4>
              <span> {data.description} </span>
            </div>
            <div>
              <h4>Ubicación</h4>
              <span>Provincia: {data.location.provincia} </span>
              <span> Municipio: {data.location.municipio}</span>
            </div>
            <div>
              <h4>Especie: </h4>
              <span>{data.type}</span>
            </div>
            <div>
              <h4></h4>
            </div>
          </div>
          <Image
            className={styles.image}
            width="1000"
            height="1000"
            src={data.image}
            alt="Imagen de la mascota."
          />
        </div>
      </div>
    </>
  );
}
export async function getServerSideProps({ params }) {
  try {
    const data = await (
      await fetch("http://localhost:3001/pets/detail/" + params.id)
    ).json();
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
