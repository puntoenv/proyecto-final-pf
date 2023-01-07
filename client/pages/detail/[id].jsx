import Image from "next/image";
import styles from "./detail.module.css";
import NavBar from "../../components/NavBar/NavBar";

export default function Detail({ data }) {

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <div className={styles.title}>
          <h1> {data.name.toUpperCase()} </h1>
        </div>
        <div className={styles.detail}>
          <Image
            className={styles.image}
            width="1000"
            height="1000"
            src={data.image}
            alt="Imagen de la mascota."
          />
          <div className={styles.text}>
            <div>
              <h4> DESCRIPCIÓN </h4>
              <span> {data.description} </span>
            </div>
            <div>
              <h4> EDAD </h4>
              <span> {data.age} años</span>
            </div>
            <div>
              <h4> TAMAÑO </h4>
              <span> {data.size} </span>
            </div>
            <div>
              <h4> GENERO </h4>
              <span> {data.gender} </span>
            </div>
            <div>
              <h4> UBICACIÓN </h4>
              <span>Provincia: {data.location.provincia} </span>
              <span> Municipio: {data.location.municipio}</span>
            </div>
            <div>
              <h4> ESPECIE </h4>
              <span>{data.type}</span>
            </div>
          </div>
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