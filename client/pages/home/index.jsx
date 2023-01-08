import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "./styles.module.css";
import Link from "next/link";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/footer";
import Nosotros from "../../components/infoHome/nosotros";
import Layout from "../layout";
// import ProductSliderEshop from "../../components/ProductSlider/ProductSliderEshop";
//const inter = Inter({ subsets: ['latin'] })
// import ProductSlider from "../../components/ProductSlider/ProductSlider";
import home from "../../img/prueba.jpeg";
import logo from "../../img/logo.jpeg";
import Cat from "../../img/meal.png";
import Join from "../../components/JoinUs/joinUs";

export default function Home() {
  const clientId = process.env.AUHT0_CLIENT_ID;
  return (
    <>
      <Layout title="Inicio" />
      <div className={styles.home}>
        <NavBar />
        <Link href={"/home"} classname="logo">
          <Image
            src={logo}
            alt="logo"
            className={styles.logo}
            width="auto"
            height="auto"
          />
        </Link>
        <p className={styles.friend}>Encuentra a tu nuevo mejor amigo</p>
        <Image
          src={home}
          alt="home"
          className={styles.home}
          width="auto"
          height="auto"
        />
        <div className={styles.barGreen}></div>
        <div className={styles.divAlimento}></div>
        {/* <span className={styles.catAlimento}></span> */}
        <div className={styles.containKitten}>
          <Image
            src={Cat}
            alt="kitten"
            className={styles.kitten}
            width="auto"
            height="auto"
          />
        </div>

        <Nosotros />

        <div className={styles.carruselAnimals}>
          <Link className={styles.linkAdoptar} href="/petsPosts">
            <h1>¡Adoptame! --- (acá abajo va el carrousel)</h1>
          </Link>
          {/* <ProductSlider /> */}
          <h1 className={styles.tituloAdopcion}>Info Adopciones</h1>
          <p className={styles.infoAdopcion}>
            Nuestra plataforma permite a los usuarios visualizar todas las
            mascotas disponibles para adopción, como así también filtar las
            mismas por tamaño, ubicación, genero, etc. Tener una mascota es una
            responsabilidad, por lo tanto, exigimos compromiso al momento de
            adoptar a un nuevo integrante. También esperamos compromiso para con
            los usuarios que llevan a cabo las publicaciones de los posteos.
          </p>
          <Join />

          <div className={styles.carruselEshop}>
            {/* <Link className={styles.linkEshop} href="/eshop">
              <h1>E-shop</h1>
            </Link> */}
            {/* <ProductSliderEshop /> */}
          </div>
          <Footer />
        </div>

        <button onClick={() => console.log(clientId)}>.env</button>
      </div>
    </>
  );
}
