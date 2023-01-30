import React from "react";
import styles from "./join.module.css";
import Link from "next/link";
import Image from "next/image";
import Cat from "../../img/cat.png";
import Gif from "../../img/gif.webp";
import { IoLogoInstagram } from "react-icons/io";

const Join = ({ user }) => {
  return (
    <div className={styles.container}>
      <div className={styles.containerTwo}>
        <Image className={styles.cat} src={Cat} width="auto" height="auto" />

        <div className={styles.containGeneral}>
          <div className={styles.containJoin}>
            <span className={styles.join}>
              {!user
                ? `Sumate a nuestra comunidad para poder adoptar o ayudar a las
            mascotas`
                : `¿Te interesa acompañarnos en nuestra misión? ¡Apoyanos!`}
            </span>
            <button className={styles.joinBtn}>
              {!user ? (
                <Link href="/api/auth/login">Sumarme</Link>
              ) : (
                <Link href="/eShop">Ver Productos</Link>
              )}
            </button>
          </div>
          <div className={styles.divGif}>
            <Image
              className={styles.gif}
              src={Gif}
              width="auto"
              height="auto"
            />
          </div>
        </div>
        <span className={styles.containInsta}>
          Siguenos en instagram
          <a
            target={"_blank"}
            href={"https://www.instagram.com/pets_littlepaws/"}
          >
            <IoLogoInstagram className={styles.icon}></IoLogoInstagram>
          </a>
        </span>
      </div>
    </div>
  );
};

export default Join;
