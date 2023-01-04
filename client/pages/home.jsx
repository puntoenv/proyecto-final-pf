import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import Link from "next/link";

//const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className={styles.home}>
        <nav className={styles.navBar}>
          <h1 className={styles.textNav}>
          <Link href="/adoptar">
            <h1>Adoptar </h1>
          </Link>
          <Link href="/Apóyanos">
            <h1>Apóyanos  </h1>
          </Link>
          <Link href="/ingresoRegistro">
            <h1>Ingresar | Registrarse</h1>
          </Link>
          </h1>
        </nav>

        <div>
          <form className={styles.searchBar}>
            <input
              className={styles.inputSearch}
              type="text"
              placeholder="Buscador..."
            />
            <button className={styles.buttonSearch} type="submit">
              Buscar
            </button>
          </form>
        </div>

        <p className={styles.adopcion}> Parrafo sobre adopcion</p>

        <div className={styles.sobreNosotros}>
          <p className={styles.textoNosotros}>
            Nosotros somos Little Paws y nuestro objetivo es poder buscarles un
            hogar y buenas condiciones de vida a los animalitos que estan
            abandonados en la calle. Además contamos con un e-shop donde podes
            comprarle comida, juguetes y muchas mas cosas a tu peludito. Con las
            ganancias del e-shop, nosotros nos podemos financiar en mejorar
            nuestro servicio y tambien ayudar a refugios y fundaciones de
            animalitos.
          </p>
        </div>
      </div>
    </>
  );
}
