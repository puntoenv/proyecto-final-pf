import React from "react";
import { useSession, signOut, getSession } from "next-auth/react";
import Image from "next/image";
import { getLocalStorage } from "../../sesionStorage";
// import styles from '../styles/profile.module.css'

export default function Profile() {
  const { data: session } = useSession();
  console.log(session);
  const token = getLocalStorage("auth-token");
  console.log(token);
  return (
    <div>
      {session || token ? (
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
