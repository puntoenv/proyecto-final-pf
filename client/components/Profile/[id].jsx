import React from "react";
import Link from "next/link";
import style from "./styles.module.css";
import styles from "./Loading.module.css";
import Favorites from "..//..//pages/favorites/index"



  

export default function Perfil({user, isLoading}) {

  const Use = "63bc80eaae370a0013940854";

  const imgAux =
    "https://www.pngkit.com/png/detail/128-1280585_user-icon-fa-fa-user-circle.png";


  return (
    <div className={style.mainContainer}>
      {isLoading && (
        <div className={styles.container}>
          <div className={styles.loader}></div>
          <p>Loading...</p>
        </div>
      )}
      {user && (
        <div>
          <div className={style.secondContainer}>
            <div className={style.thirdContainer}>
              <div className={style.imageContainer}>
                <img
                  src={user.picture || imgAux}
                  width={150}
                  height={150}
                  style={{ borderRadius: "50%" }}
                  alt={user.name}
                />
              </div>
              <button className={style.button}>
                <Link href={"/api/auth/logout"}>
                  <b>Cerrar Sesión</b>
                </Link>
              </button>
            </div>
            <div className={style.infoContainer}>
              <div>
                <h1 className={style.h1}>Mi perfil </h1>
                <p>{user.name}</p>
              </div>
              <div className={style.buttons}>
                <button className={style.button}>
                  <Link href={"/petsPosts"}>
                    <b>Ver todas las mascotas</b>
                  </Link>
                </button>
                <button className={style.button}>
                  <Link href={"/adoptionForm"}>
                    <b>Postea una adopción</b>
                  </Link>
                </button>
                <button className={style.button}>
                <Link href={{
            pathname: '/favorites',
            query: { id: `${Use}` },
          }} >
                    <b>Mis favoritos</b>
                  </Link>
                </button>
                {/* <button className={style.button}>
                  <Link href={"/profile"}>
                    <b>Adopta</b>
                  </Link>
                </button> */}
              </div>
            </div>
          </div>
          <div className={style.link}>
            <Link href={"/home"}>
              <b>Página principal</b>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

