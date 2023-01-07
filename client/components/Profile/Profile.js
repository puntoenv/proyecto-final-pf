import React from "react";
import { useSession, signOut, getSession } from "next-auth/react";
import Image from "next/image";
// import styles from '../styles/profile.module.css'

export default function Profile({ sesion }) {
  console.log(typeof sesion);
  const { data: session } = useSession();
  return (
    <div>
      {session ? (
        <div>
          <Image
            src={session.user.image}
            width={150}
            height={150}
            style={{ borderRadius: "50%" }}
            alt={session.user.name}
          ></Image>
          <h1>Bienvenido, {session.user.name}</h1>
          <button onClick={() => signOut()}>Cerrar Sesión</button>
        </div>
      ) : (
        <div>
          <p>No iniciaste sesión</p>
        </div>
      )}
    </div>
  );
}
