import React from "react";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import style from "./styles.module.css";
import styles from "./Loading.module.css";

export default function Perfil() {
  const { isLoading, user } = useUser();

  return (
    <div className={style.mainContainer}>
      {isLoading && (
        <div className={styles.container}>
          <div className={styles.loader}>
            <p>Loading...</p>
          </div>
        </div>
      )}
      {user && (
        <div>
          <div className={style.secondContainer}>
            <div className={style.thirdContainer}>
              <div className={style.imageContainer}>
                <Image
                  src={user.picture}
                  width={150}
                  height={150}
                  style={{ borderRadius: "50%" }}
                  alt={user.name}
                ></Image>
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

// export default profile;

// export const getServerSideProps = async (context) => {
//   const session = await getSession(context);
//   if (!session) {
//     return {
//       redirect: {
//         destination: "/login",
//       },
//     };
//   }

//   return {
//     props: { session },
//   };
// };
