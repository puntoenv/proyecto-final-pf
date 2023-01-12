import React from "react";
import Link from "next/link";
import style from "./styles.module.css";
import styles from "./Loading.module.css";
import Favorite from '..//../pages/favorites/index'

export default function Perfil({user, isLoading, response}) {
  const nameUpper =
  response.name && response.name[0].toUpperCase() + response.name.slice(1);
  const lastnameUpper =
  response.lastname &&
  response.lastname[0].toUpperCase() + response.lastname.slice(1);

  const {_id}=response

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
                  src={response.image ? response.image : imgAux}
                  width={150}
                  height={150}
                  style={{ borderRadius: "50%" }}
                  alt={user.name}
                />
              </div>
              <p>{nameUpper ? nameUpper : user.name}</p>
              <button className={style.button}>
                <Link href={"/api/auth/logout"}>
                  <b>Cerrar Sesión</b>
                </Link>
              </button>
            </div>
            <div className={style.infoContainer}>
              <div>
                <h1 className={style.h1}>Mi perfil </h1>
              </div>
              <div>
                <div>
                  <p>
                    Nombre:{" "}
                    {nameUpper && lastnameUpper
                      ? `${nameUpper} ${lastnameUpper}`
                      : nameUpper && !lastnameUpper
                      ? nameUpper
                      : "No especificado"}
                  </p>
                  <p>Edad: {response.age ? response.age : "No especificado"}</p>
                  <p>Bio: {response.bio ? response.bio : "No especificado"}</p>
                  <p>
                    Provincia:{" "}
                    {response.ubication
                      ? response.ubication
                      : "No especificado"}
                  </p>
                </div>
                <div>
                  <Link href={`/updateProfile/${user.sub.split("|")[1]}`}>
                    <p style={{ color: "blue" }}>Editar Perfil</p>
                  </Link>
                </div>
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
                <button className={style.button} >
                <Link href={{
            pathname: '/favorites',
            query: { id: `${_id}` },
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
