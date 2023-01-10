import Image from "next/image";
import styles from "./detail.module.css";
import NavBar from "../../components/NavBar/NavBar";
import Layout from "../layout";
import Footer from "../../components/Footer/footer";
import Link from "next/link";
import logo from "../../img/logo.jpeg"

export default function Detail({ data }) {
  console.log(data)
  return (
    <>
      <Layout title={data.name.toUpperCase()} />
      <NavBar />
      <Link href={"/home"} className="logo">
      <Image
              src={logo}
              alt="logo"
              className={styles.logo}
              width="auto"
              height="auto"
            /></Link>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1 className={styles.name}> {data.name.toUpperCase()} </h1>
        </div>
        <div className={styles.detail}>
          <Image
            className={styles.image}
            width="500"
            height="400"
            src={data.image}
            alt="Imagen de la mascota."
          />
          <div className={styles.text}>
           <div className={styles.under}>
            <div>
              <span className={styles.data}> {data.age} años</span>
            </div>
           
            <div>
              <span className={styles.data}> {data.gender} </span>
            </div>
            
            </div>
            <div className={styles.size}>
            <h4 className={styles.h}> Tamaño: </h4>
              <span className={styles.size_data}> {data.size} </span>
            </div>
            <h4 className={styles.location_h}> Ubicación: </h4>
            <div className={styles.location}>
              <span className={styles.data}>Provincia: {data.location.provincia} </span>
              <span className={styles.data}> Municipio: {data.location.municipio}</span>
            </div>
            <div>
              <h4 className={styles.descrip_h}> Descripción: </h4>
              <span className={styles.descrip_data}> {data.description} </span>
            </div>
          </div>
        </div>
        <button className={styles.back}>
                <Link href={"/petsPosts"}>Volver</Link>
              </button>
      </div>
      <Footer />
    </>
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
