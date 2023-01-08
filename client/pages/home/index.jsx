import Head from "next/head";
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
// import hug from '../../img/hug.jpg'
// import shelter from '../../img/shelter.jpg'
// import kitten from '../../img/kitten.jpg'
//import Cat from "../../img/meal.png";
// import All from "../../img/all.png";
// import Join from "../../components/JoinUs/joinUs";
// import Alimento from "../../img/alimento.png";
// import Alim from "../../img/alim.png";
// import Al from "../../img/al.png";
// import Ali from "../../img/ali.png";

export default function Home() {
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
        <Nosotros />
        {/* <Image
          src={All}
          alt="hug"
          className={styles.all}
          width="auto"
          height="auto"
        />
        <Image
          src={Cat}
          alt="kitten"
          className={styles.kitten}
          width="auto"
          height="auto"
        />
        <Image
          src={Alimento}
          alt="shelter"
          className={styles.shelter}
          width="auto"
          height="auto"
        />
        <Image
          src={Alim}
          alt="shelter"
          className={styles.alim}
          width="auto"
          height="auto"
        />
        <Image
          src={Al}
          alt="shelter"
          className={styles.al}
          width="auto"
          height="auto"
        />
        <Image
          src={Ali}
          alt="shelter"
          className={styles.ali}
          width="auto"
          height="auto"
        /> */}
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
          {/* <Join /> */}
          <div className={styles.carruselEshop}>
            {/* <Link className={styles.linkEshop} href="/eshop">
              <h1>E-shop</h1>
            </Link> */}
            {/* <ProductSliderEshop /> */}
          </div>
          <Footer />
        </div>

        {/* <nav className={styles.navBar}>
          <h1 className={styles.textNav}>
          <Link href="/petAdoption">
            <h1>Adoptar </h1>
          </Link>
          <Link href="/Apóyanos">
            <h1>Apóyanos  </h1>
          </Link>
          <Link href="/login">
            <h1>Ingresar | Registrarse</h1>
          </Link>
          </h1>
        </nav> */}

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
