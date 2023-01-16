import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "./styles.module.css";
import Link from "next/link";
import Nosotros from "../../components/infoHome/nosotros";
import Layout from "../layout";
import home from "../../img/prueba.jpeg";
import logo from "../../img/logo.jpeg";
import Cat from "../../img/meal.png";
import Join from "../../components/JoinUs/joinUs";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PetsCard from "../../components/Carousel/petsCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPets, getProducts } from "../../stores/actions";
import React, { Component } from "react";
import LayoutGlobal from "../../components/LayoutGlobal/Layout";
import ProductCard from "../../components/CarouselEshop/productsCard";

export default function Home() {
  {
    // const settings = {
    //   dots: true,
    //   infinite: true,
    //   slidesToShow: 3,
    //   slidesToScroll: 1,
    //   autoplay: true,
    //   speed: 2000,
    //   autoplaySpeed: 1700,
    //   cssEase: "linear",
    // };
    const settings = {
      arrows: false,
      infinite: true,
      dots: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
    };

    const dataPets = useSelector((data) => data.mascotas.mascotas);
    const productos = useSelector((state) => state.products.allProducts);
    const data = useSelector((state) => state.products.data);

    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getPets(1));
      dispatch(getProducts(1));
    }, []);
    // useEffect(()=>{
    //   dispatch(getProducts(1))
    // },[dispatch])

    return (
      <LayoutGlobal>
        <Layout title="Inicio" />
        <div className={styles.home}>
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

          <div className={styles.containSlider}>
            <div className={styles.titleRoute}>
            <h1 className={styles.titleCarrusel}> Animalitos en adopción</h1>

            <button className={styles.buttonRoute}>
              <Link href='/petsPosts'>Ver mas</Link>
            </button>
            </div>

            <Slider {...settings} className="arrowsSlides">
              {dataPets.slice(0, 9).map((mascota) => (
                <PetsCard
                  key={mascota._id}
                  nombre={mascota.name}
                  imagen={mascota.image}
                  genero={mascota.gender}
                  tamano={mascota.size}
                />
              ))}
            </Slider>
          </div>

       

          <div className={styles.containSlider}>
          <div className={styles.titleRoute}>
            <h1 className={styles.titleCarrusel}> Nuestros productos</h1>
            <button className={styles.buttonRoute}>
              <Link href='/eShop'>Ver mas</Link>
            </button>
            </div>
            
            
            <Slider {...settings} className="arrowsSlides">
              {productos.slice(0, 9).map((producto) => (
                <ProductCard
                  key={producto._id}
                  info={producto}
                  // addToCart={addToCart}
                  // key={producto._id}
                  // nombre={producto.name}
                  // imagen={producto.image}
                  // precio={producto.price}
                />
              ))}
            </Slider>
          </div>

          <div className={styles.containerAdopciones}>
            <h2 className={styles.tituloAdopcion}>Info Adopciones</h2>
            <p className={styles.infoAdopcion}>
              Nuestra plataforma permite a los usuarios visualizar todas las
              mascotas disponibles para adopción, como así también filtar las
              mismas por tamaño, ubicación, genero, etc. Tener una mascota es
              una responsabilidad, por lo tanto, exigimos compromiso al momento
              de adoptar a un nuevo integrante. También esperamos compromiso
              para con los usuarios que llevan a cabo las publicaciones de los
              posteos.
            </p>
          </div>
          <Join />
        </div>
      </LayoutGlobal>
    );
  }
}
