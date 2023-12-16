import Image from "next/image";
import styles from "./styles.module.css";
import Link from "next/link";
import Nosotros from "../../components/infoHome/nosotros";
import Layout from "../layout";
import home from "../../img/prueba.jpeg";
import Cat from "../../img/meal.png";
import Join from "../../components/JoinUs/joinUs";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PetsCard from "../../components/Carousel/petsCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPets, getProducts } from "../../stores/actions";
import React from "react";
import LayoutGlobal from "../../components/LayoutGlobal/Layout";
import { useUser } from "@auth0/nextjs-auth0/client";
import { authUser } from "../../stores/actions";
import ProductCard from "../../components/CarouselEshop/productsCard";
import "sweetalert2/src/sweetalert2.scss";

const fn = (user, dispatch, setNumCall) => {
  if (user) {
    const sub = user.sub.split("|");

    if (sub[0] === "google-oauth2") {
      dispatch(
        authUser(`${user.nickname}@gmail.com`, user.name || user.nickname)
      );
    } else {
      dispatch(authUser(user.name, null));
    }
  }
  setNumCall(1);
};

export default function Home({}) {
  const { user } = useUser();
  const dataPets = useSelector((data) => data.mascotas.mascotas);
  const productos = useSelector((state) => state.products.allProducts);
  const dispatch = useDispatch();
  const userAuth = useSelector((state) => state.userAuth.userData);
  const [numCall, setNumCall] = useState(0);
  !numCall && user && fn(user, dispatch, setNumCall);
  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1700,
    autoplaySpeed: 1700,
    cssEase: "linear",
  };
  useEffect(() => {
    (function (d, m) {
      var kommunicateSettings = {
        appId: process.env.NEXT_PUBLIC_APP_CHATBOT_ID,
        popupWidget: true,
        automaticChatOpenOnNavigation: true,
      };
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0];
      h.appendChild(s);
      window.kommunicate = m;
      m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
    dispatch(getPets(1));
    dispatch(getProducts(1));
  }, []);

  return (
    <LayoutGlobal authUser={userAuth}>
      <Layout title="Inicio" />
      <div className={styles.home}>
        <Image src={home} alt="home" className={styles.picture} />
        <div className={styles.barGreen}></div>
        <div className={styles.divAlimento}></div>
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
        <div className={styles.containSlider}>
          <h1 className={styles.titleCarrusel}> Animalitos en adopción</h1>
          <button className={styles.buttonRoute}>
            <Link href="/petsPosts">Ver mas</Link>
          </button>

          <div className={styles.contentCarrousel}>
            <Slider {...settings} className="arrowsSlides">
              {dataPets.slice(0, 9).map((mascota) => (
                <PetsCard
                  id={mascota._id}
                  nombre={mascota.name}
                  imagen={mascota.image}
                  genero={mascota.gender}
                  tamano={mascota.size}
                />
              ))}
            </Slider>
          </div>
        </div>

        <div className={styles.containSlider}>
          <div className={styles.titleRoute}>
            <h1 className={styles.titleCarrusel}> Nuestros productos</h1>
            <button className={styles.buttonRoute}>
              <Link href="/eShop">Ver mas</Link>
            </button>
          </div>
          <div className={styles.contentCarrousel}>
            <Slider {...settings} className="arrowsSlides">
              {productos.slice(0, 9).map((producto) => {
                return <ProductCard key={producto._id} info={producto} />;
              })}
            </Slider>
          </div>
        </div>

        <div className={styles.containerAdopciones}>
          <h2 className={styles.tituloAdopcion}>INFO ADOPCIONES</h2>
          <p className={styles.infoAdopcion}>
            Nuestra plataforma permite a los usuarios visualizar todas las
            mascotas disponibles para adopción, como así también filtar las
            mismas por tamaño, ubicación, genero, etc. Tener una mascota es una
            responsabilidad, por lo tanto, exigimos compromiso al momento de
            adoptar a un nuevo integrante. También esperamos compromiso para con
            los usuarios que llevan a cabo las publicaciones de los posteos.
          </p>
        </div>
        <Join user={user} />
      </div>
    </LayoutGlobal>
  );
}
