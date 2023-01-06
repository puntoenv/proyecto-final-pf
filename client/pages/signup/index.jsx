import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import Login from "../../components/FormAuth/Login";
import {
  handlerOnChange,
  handlerOnClick,
} from "../../controller/loginAndRegister";

export default function SignUp() {
  return (
    <>
      <Login
        handlerOnChange={handlerOnChange}
        handlerOnClick={handlerOnClick}
      />
    </>
  );
}
