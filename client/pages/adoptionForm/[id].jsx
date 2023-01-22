import React, { useState, useEffect } from "react";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import styles from "./style.module.css";
import style from "../../components/Profile/Loading.module.css";
import { useDispatch } from "react-redux";
import { getper, getmuni, PostAdop } from "../../stores/actions";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Layout from "../layout";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/footer";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import AdoptionForm1 from "../../components/AdoptionForm/AdoptionForm1";
import AdoptionForm2 from "../../components/AdoptionForm/AdoptionForm2";
import AdoptionForm3 from "../../components/AdoptionForm/AdoptionForm3";
import {
  validation,
  handleSelector,
  handleLocation,
  handleFiles,
  handleSubmit,
  handleDisableInput,
} from "../../controller/validationPostPet";

const ages = [];
for (let i = 0; i <= 40; i++) {
  ages.push(i);
}

export function form(props) {
  const { isLoading, user } = useUser();
  const idUser = user?.sub.split("|")[1];
  const router = useRouter();
  const dispatch = useDispatch();
  const provi = useSelector((state) => state.caracter.provi.provincias);
  const munici = useSelector((state) => state.caracter.municipios.municipios);
  const [errors, setError] = useState({});
  const [post, setPost] = useState({
    image: [],
    userId: idUser,
  });
  const [position, setFirst] = useState(1);

  const handlerCoords = (coords) => {
    handleLocation(post, setPost, coords);
  };

  useEffect(() => {
    dispatch(getper()).then((_) => console.log(provi));
  }, [dispatch]);

  return (
    <>
      {isLoading && (
        <div className={style.container}>
          <div className={style.loader}></div>
          <p>Loading...</p>
        </div>
      )}
      {props.user && (
        <>
          <Layout title="Publicar Mascota" />
          <NavBar />
          <div className={styles.container}>
            <div className={styles.containFirstDiv}>
              <span className={styles.spanObligatorio}>
                TODOS LOS CAMPOS SON OBLIGATORIOS
              </span>
              <div className={styles.divTips}>
                <p className={styles.tips}>
                  - En el campo de contacto si no quieres ingresar tu número
                  telefónico puedes ingresar el <b>link</b> de alguna de tus
                  redes sociales
                </p>
              </div>
              <div className={styles.divTips}>
                <p className={styles.tips}>
                  - Recomendamos que por tu seguridad y evitar malas
                  experiencias no ingresar tu ubicación exacta, puedes poner un
                  lugar de referencia que tengas cerca, un lugar público como
                  una plaza o un parque por ejemplo
                </p>
              </div>
            </div>
            <form
              className={styles.form}
              onSubmit={(e) =>
                handleSubmit(e, PostAdop, post, router, errors, Swal)
              }
            >
              <span className={styles.title}>Datos de la Mascota</span>
              {position === 1 ? (
                <AdoptionForm1
                  setError={setError}
                  setPost={setPost}
                  post={post}
                  errors={errors}
                  position={position}
                  setFirst={setFirst}
                  handleSelector={handleSelector}
                  validation={validation}
                />
              ) : position === 2 ? (
                <AdoptionForm2
                  errors={errors}
                  post={post}
                  setFirst={setFirst}
                  validation={validation}
                  handleSelector={handleSelector}
                  handleFiles={handleFiles}
                  setPost={setPost}
                  setError={setError}
                  handleDisableInput={handleDisableInput}
                  dispatch={dispatch}
                  getmuni={getmuni}
                  handlerCoords={handlerCoords}
                  provi={provi}
                  munici={munici}
                />
              ) : (
                <AdoptionForm3
                  errors={errors}
                  post={post}
                  setFirst={setFirst}
                  validation={validation}
                  handleSelector={handleSelector}
                  handleFiles={handleFiles}
                  setPost={setPost}
                  setError={setError}
                  handleDisableInput={handleDisableInput}
                  dispatch={dispatch}
                  getmuni={getmuni}
                  provi={provi}
                  munici={munici}
                />
              )}
            </form>
          </div>
        </>
      )}
      <Footer />
    </>
  );
}

export default withPageAuthRequired(form, {
  onRedirecting: () => (
    <div className={style.container}>
      <div className={style.loader}></div>
      <p>Loading...</p>
    </div>
  ),

  onError: (error) => <ErrorMessage>{error.message}</ErrorMessage>,
});

export async function getServerSideProps({ params }) {
  try {
    const response = await (
      await fetch(
        "https://proyecto-final-pf-production.up.railway.app/user/" + params.id
      )
    ).json();
    return {
      props: {
        response,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
