import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "./styles.module.css";
import Link from "next/link";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/footer";
import Nosotros from "../../components/infoHome/nosotros";
import Layout from "../layout";
import home from "../../img/prueba.jpeg";
import logo from "../../img/logo.jpeg";
import Cat from "../../img/meal.png";
//import All from "../../img/all.png";
import Join from "../../components/JoinUs/joinUs";
import Alimento from "../../img/alimento.png";
import Alim from "../../img/alim.png";
import Al from "../../img/al.png";
import Ali from "../../img/ali.png";
import Alimen from "../../img/alimen.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PetsCard from "../../components/Carousel/petsCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPets } from "../../stores/actions";
import React, { Component } from "react";

export default function Home() {
  {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
    };

    const data = useSelector((data) => data.mascotas.mascotas);

    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getPets());
    }, []);

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

          
            <Slider {...settings}>
              {data.slice(0, 9).map((mascota) => (
                <PetsCard
                  key={mascota._id}
                  nombre={mascota.name}
                  imagen={mascota.image}
                  genero={mascota.gender}
                />
              ))}
            </Slider>
            <div className={styles.containerAdopciones}>
          <h1 className={styles.tituloAdopcion}>Info Adopciones</h1>
          <p className={styles.infoAdopcion}>
            Nuestra plataforma permite a los usuarios visualizar todas las
            mascotas disponibles para adopción, como así también filtar las
            mismas por tamaño, ubicación, genero, etc. Tener una mascota es una
            responsabilidad, por lo tanto, exigimos compromiso al momento de
            adoptar a un nuevo integrante. También esperamos compromiso para con
            los usuarios que llevan a cabo las publicaciones de los posteos.
          </p>
          </div>
          <Join />

          <Footer />
        </div>
      </>
    );
  }
}
