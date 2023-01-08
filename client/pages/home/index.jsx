import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "./styles.module.css";
import Link from "next/link";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/footer";
import Nosotros from "../../components/infoHome/nosotros";
// import ProductSliderEshop from "../../components/ProductSlider/ProductSliderEshop";
//const inter = Inter({ subsets: ['latin'] })
// import ProductSlider from "../../components/ProductSlider/ProductSlider";
export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <div className={styles.home}>
        <NavBar />
        <Nosotros />

        <div className={styles.carruselAnimals}>
          <Link className={styles.linkAdoptar} href="/petsPosts">
            <h1>Adoptame!</h1>
          </Link>
          {/* <ProductSlider /> */}

          <div className={styles.carruselEshop}>
            <Link className={styles.linkEshop} href="/eshop">
              <h1>E-shop</h1>
            </Link>
            {/* <ProductSliderEshop /> */}
          </div>
        </div>

        <Footer />

        {/* <div>
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
        </div> */}
      </div>
    </>
  );
}
