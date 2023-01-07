import React from "react";
import Profile from "../../components/Profile/Profile";
import { getCsrfToken, getSession } from "next-auth/react";

export default function MiPerfil({ ses }) {
  return <Profile sesion={ses}></Profile>;
}

export async function getServerSideProps({ context }) {
  try {
    console.log("entro");
    const session = await getCsrfToken();
    console.log(session);
    if (false) {
      return {
        redirect: {
          destination: "/login",
        },
      };
    }

    return {
      props: { ses: session },
    };
  } catch (error) {
    console.log(error);
  }
}
