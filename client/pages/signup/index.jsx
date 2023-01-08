import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import Login from "../../components/FormAuth/Login";
import {
  handlerOnChange,
  handlerOnClick,
} from "../../controller/loginAndRegister";
import Layout from "../layout";

export default function SignUp() {
  return (
    <>
      <Layout title="Registrarse" />
      <Login
        handlerOnChange={handlerOnChange}
        handlerOnClick={handlerOnClick}
      />
    </>
  );
}
