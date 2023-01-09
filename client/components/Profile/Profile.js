import React, { useState } from "react";
import Image from "next/image";
// import styles from '../styles/profile.module.css'

export default function Profile() {
  console.log(session);

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
