import Image from "next/image";
import styles from "./detail.module.css";
import NavBar from "../../components/NavBar/NavBar";
import Layout from "../layout";
import Footer from "../../components/Footer/footer";
import Link from "next/link";
import logo from "../../img/logo.jpeg";

export default function Detail({ data }) {
  console.log(data);
  return (
    <div className={styles.containerAll}>
      <Layout title={data.name.toUpperCase()} />
      <NavBar />

      <div className={styles.containDetail}>
        <div className={styles.button}>
          <Link className={styles.back} href="/petsPosts">
            Volver
          </Link>
        </div>
        <h1 className={styles.namePet}> {data.name.toUpperCase()} </h1>
        <div className={styles.containCardDetail}>
          <img
            className={styles.image}
            src={data.image}
            alt="Imagen de la mascota"
          />

          <div class={styles.divCharacteristics}>
            <div class={styles.divSize}>
              <b>Tamaño: </b>
              <span>{data.size}</span>
            </div>
            <div class={styles.divHealth}>
              <b>Salud: </b>
              <span>{data.health}</span>
            </div>
            <div class={styles.divSpecie}>
              <b>Especie: </b>
              <span>{data.type}</span>
            </div>
            <div class={styles.divCondition}>
              <b>Condición: </b>
              <span>{data.condition}</span>
            </div>
            <div class={styles.divProvince}>
              <b>Provincia: </b>
              <span>{data.location.provincia}</span>
            </div>
            <div class={styles.divCity}>
              <b>Ciudad: </b>
              <span>{data.location.municipio}</span>
            </div>
            <div class={styles.divGender}>
              <b>Genero: </b>
              <span>{data.gender}</span>
            </div>
            <div class={styles.divAge}>
              <b>Edad: </b>
              <span>{data.age}</span>
            </div>
            <div class={styles.divSocial}>
              <b>Interacción con otros animales: </b>
              <span>{data.sociability}</span>
            </div>
          </div>
        </div>

        <div className={styles.divDescription}>
          <h3 className={styles.titleDescription}>Descripición</h3>
          <p className={styles.description}>{data.description}</p>
          {/* <p className={styles.description}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p> */}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const data = await (
      await fetch(
        "https://proyecto-final-pf-production.up.railway.app/pets/detail/" +
          params.id
      )
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
