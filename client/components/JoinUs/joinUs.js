import React from "react";
import styles from "./join.module.css";
import Link from "next/link";
import Image from "next/image";
import Cat from "../../img/cat.png";
import Gif from "../../img/gif.webp";

const Join = ({user}) => {
  return (
    <div className={styles.container}>
      <Image className={styles.cat} src={Cat} width="auto" height="auto" />

      <div className={styles.containGeneral}>
        <div className={styles.containJoin}>
          <span className={styles.join}>
            {!user
              ? `Sumate a nuestra comunidad para poder adoptar o ayudar a las
            mascotas`
              : `¿Te interesa ayudarnos en nuestra misión? ¡Apoyanos!`}
          </span>
        </div>
        <div className={styles.divGif}>
          <Image className={styles.gif} src={Gif} width="auto" height="auto" />
        </div>
        <button className={styles.joinBtn}>
          {!user ? (
            <Link href="/api/auth/login">Sumarme</Link>
          ) : (
            <Link href="/eShop">Productos</Link>
          )}
        </button>
      </div>
    </div>
  );
};

export default Join;
