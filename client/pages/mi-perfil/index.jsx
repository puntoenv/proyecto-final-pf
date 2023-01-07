import React, { useEffect } from "react";
import Image from "next/image";
import { useSession, signOut, getSession } from "next-auth/react";
import { getLocalStorage } from "../../sesionStorage";

export default function Profile() {
  const { data: session } = useSession();

  const userLocal = getLocalStorage("session");
  console.log(userLocal["token"]);
  useEffect(() => {
    if (
      typeof userLocal.token === "undefined" ||
      // typeof token === "null" ||
      userLocal.token === null
    ) {
      console.log("no esta el token");
      // router.push("/auth");
    }
  }, [userLocal, getLocalStorage("session")]);

  return (
    <div>
      {/* {session || token ? (
        <div>
          <Image
            src={session.user.image || token}
            width={150}
            height={150}
            style={{ borderRadius: "50%" }}
            alt={session.user.name}
          ></Image>
          <h1>Bienvenido, {session.user.name}</h1>z
          <button onClick={() => signOut()}>Cerrar Sesión</button>
        </div>
      ) : (
        <div>
          <p>No iniciaste sesión</p>
        </div>
      )} */}
    </div>
  );
}

export async function getServerSideProps({ context }) {
  try {
    const session = getSession(context);
    console.log(session);
    if (!session) {
      return {
        redirect: {
          destination: "/login",
        },
      };
    }

    return {
      props: { session: session },
    };
  } catch (error) {
    console.log(error);
  }
}
