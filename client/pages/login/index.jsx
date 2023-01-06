import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import {
  handlerOnChange,
  handlerOnClick,
} from "../../controller/loginAndRegister";
import Register from "../../components/FormAuth/Refister";

export default function () {
  const { data: session } = useSession();

  // const dispatch = useDispatch();
  // const [input, setInput] = useState({
  //   name: "",
  //   age: 0,
  //   bio: "",
  //   image: "",
  //   email: "",
  //   password: "",
  // });

  return (
    <>
      {session ? (
        <div>
          <h1>¡Ya iniciaste sesión!</h1>
          <p>
            Ve al perfil de <Link href={"/profile"}>{session.user.name}</Link>.
          </p>
          <Link href={"/"}>Home</Link>
          <br />
          <button onClick={() => signOut()}>Cerrar Sesión</button>
        </div>
      ) : (
        <div>
          <Register
            handlerChange={handlerOnChange}
            handlerClick={handlerOnClick}
          />

          <p>
            ¿Ya tienes una cuenta? <Link href={"/signup"}>Inicia Sesion</Link>
          </p>
          <br />
          <div>
            <h1>SIGN IN WITH FACEBOOK OR GOOGLE</h1>
            <button onClick={() => signIn()}>
              Sign in with Facebook or Google
            </button>
          </div>
        </div>
      )}
    </>
  );
}
