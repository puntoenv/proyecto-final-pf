import Link from "next/link";
import {
  handlerOnChange,
  handlerOnClick,
} from "../../controller/loginAndRegister";
import Register from "../../components/FormAuth/Register";
import Layout from "../layout";
import style from "../adoptionForm/style.module.css";
import styles from "../login/styles.module.css";

export default function () {
  return (
    <div className={style.container}>
      <Layout title="Iniciar Sesión" />
      {session ? (
        <div>
          <h1>¡Ya iniciaste sesión!</h1>
          <p>
            Ve al perfil de <Link href={"/mi-perfil"}>{session.user.name}</Link>
            .
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

          <p className={styles.div}>
            ¿Ya tienes una cuenta?{" "}
            <Link className={styles.link} href={"/signup"}>
              Inicia Sesion
            </Link>
          </p>
          <br />
          <div className={styles.div}>
            <h1 className={style.title}>INGRESA CON GOOGLE O FACEBOOK</h1>
            <button onClick={() => signIn()}>
              Ingresa con Google o Facebook
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
