import Image from "next/image";
import React from "react";
import styles from "./styles.module.css";
import logo from '../../../img/logo.jpeg'
import Link from "next/link";


const HeaderTest = ({ user, response, setRender, authUser }) => {
  return (
    <div className={styles.headContainer}>
      <div className={styles.haedwrapper}>
        <div className={styles.title}>
          <h2>{`¡Hola, ${response.name ? response.name : response.email}!`}</h2>
          <p>Bienvenido/a a Little Paws</p>
        </div>
        <div
          className={styles.profile}
          onClick={(event) => {
            event.preventDefault();
            setRender("profile");
          }}
        >
          <img
            src={authUser.image ? authUser.image : user.picture}
            className={styles.image}
          ></img>
          <Link href={"/home"}>
            <Image src={logo} className={styles.logo}></Image>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeaderTest;
