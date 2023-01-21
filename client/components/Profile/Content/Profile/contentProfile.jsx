import React from "react";
import {
  HiCheck,
  HiPencilSquare,
  HiCamera,
  HiArrowDownOnSquare,
} from "react-icons/hi2";
import { GoX } from "react-icons/go";
import styles from "./styles.module.css";
import { useState } from "react";
import {
  handleAdoption,
  handleFiles,
  validateForm,
} from "../../../../controller/validationUpdateP";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const ContentProfile = ({ user, response, handleOnSubmit, hanldeOnChange }) => {
  const imgAux =
    "https://www.pngkit.com/png/detail/128-1280585_user-icon-fa-fa-user-circle.png";
  const nameUpper =
    response.name && response.name[0].toUpperCase() + response.name.slice(1);

  const idUser = user?.sub.split("|")[1];

  const [show, setShow] = useState(false);

  const [input, setInput] = useState({
    name: "",
    age: "",
    bio: "",
    image: "",
    ubication: "",
  });

  const [result, setResult] = useState({
    error: "",
    success: "",
  });

  const [error, setError] = useState({
    name: "",
    age: "",
    bio: "",
    image: "",
    ubication: "",
  });

  const [edit, setEdit] = useState(false);

  const disabledHandle = () => {
    if (
      error.name ||
      error.age ||
      error.bio ||
      error.image ||
      error.ubication
    ) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div className={styles.mainContainer}>
      <form
        className={styles.userContent}
        onSubmit={(event) =>
          handleOnSubmit(event, setResult, setInput, input, idUser)
        }
      >
        <div className={styles.divImage}>
          <img
            className={styles.image}
            src={response.image ? response.image : imgAux}
            alt={user.name}
          />

          <div className={styles.editImage}>
            {edit ? (
              <>
                <label
                  for="mi_archivo"
                  className={styles.mi_archivo}
                  name="image"
                  onChange={(event) => handleFiles(event, setInput, input)}
                >
                  <HiArrowDownOnSquare size={30}></HiArrowDownOnSquare>
                  Subir imagen
                  <span>
                    <input
                      type="file"
                      className={styles.hiddenInput}
                      name="mi_archivo"
                      id="mi_archivo"
                    ></input>
                  </span>
                </label>

                {input.image && (
                  <div className={styles.imageSpan}>
                    <span
                      className={styles.cleanInput}
                      onClick={() => {
                        setInput({ ...input, image: "" });
                      }}
                    >
                      <GoX size={25}></GoX>
                    </span>
                    <span>{input.image.slice(0, 20) + "..."}</span>
                  </div>
                )}
              </>
            ) : (
              <div className={styles.profileDiv}>
                <h1>Mi perfil</h1>
                <p>{response.name ? nameUpper : user.email}</p>
              </div>
            )}
          </div>
        </div>
        <div className={styles.info}>
          <p>
            <p>Bio: </p>

            {!edit ? (
              response.bio ? (
                response.bio
              ) : (
                "No especificado "
              )
            ) : (
              <>
                <textarea
                  type="text"
                  placeholder="Breve descripción sobre ti"
                  name="bio"
                  onChange={(event) => {
                    hanldeOnChange(event, setInput, input, setResult),
                      validateForm(event, setError, error);
                  }}
                />
              </>
            )}
            <span>{error.bio ? error.bio : ""}</span>
          </p>
          <p>
            <p>Nombre completo:</p>

            {!edit ? (
              nameUpper ? (
                nameUpper
              ) : (
                "No especificado"
              )
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Ej: Pedro Pérez"
                  name="name"
                  onChange={(event) => {
                    hanldeOnChange(event, setInput, input, setResult),
                      validateForm(event, setError, error);
                  }}
                />
              </>
            )}

            <span>{error.name ? error.name : ""}</span>
          </p>
          <p>
            <p>Edad: </p>

            {!edit ? (
              response.age ? (
                response.age
              ) : (
                "No especificado"
              )
            ) : (
              <>
                <input
                  type="number"
                  placeholder="Ej: 28"
                  name="age"
                  onChange={(event) => {
                    hanldeOnChange(event, setInput, input, setResult),
                      validateForm(event, setError, error);
                  }}
                />
              </>
            )}

            <span>{error.age ? error.age : ""}</span>
          </p>
          <p>
            <p>Provincia: </p>

            {!edit ? (
              response.ubication ? (
                response.ubication
              ) : (
                "No especificado"
              )
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Ej: Buenos Aires"
                  name="ubication"
                  onChange={(event) => {
                    hanldeOnChange(event, setInput, input, setResult),
                      validateForm(event, setError, error);
                  }}
                />
              </>
            )}
            <span>{error.ubication ? error.ubication : ""}</span>
          </p>
        </div>
        {/* <div style={{ display: "flex", flexWrap: "wrap", maxWidth: '40%' }}>
          <p>Información de envíos:</p>
          <p style={{ display: "flex" }}>
            <p>Ubicación 1: </p>
            {!edit ? (
              response.age ? (
                response.age
              ) : (
                "No especificado"
              )
            ) : (
              <>
                <input
                  type="number"
                  placeholder="Ej: 28"
                  name="age"
                  onChange={(event) => {
                    hanldeOnChange(event, setInput, input, setResult),
                      validateForm(event, setError, error);
                  }}
                />
              </>
            )}
            <span>{error.age ? error.age : ""}</span>
          </p>
          <p style={{ display: "flex" }}>
            <p>Ubicación 2: </p>
            {!edit ? (
              response.age ? (
                response.age
              ) : (
                "No especificado"
              )
            ) : (
              <>
                <input
                  type="number"
                  placeholder="Ej: 28"
                  name="age"
                  onChange={(event) => {
                    hanldeOnChange(event, setInput, input, setResult),
                      validateForm(event, setError, error);
                  }}
                />
              </>
            )}
            <span>{error.age ? error.age : ""}</span>
          </p>
          <p style={{ display: "flex" }}>
            <p>Ubicación 3: </p>
            {!edit ? (
              response.age ? (
                response.age
              ) : (
                "No especificado"
              )
            ) : (
              <>
                <input
                  type="number"
                  placeholder="Ej: 28"
                  name="age"
                  onChange={(event) => {
                    hanldeOnChange(event, setInput, input, setResult),
                      validateForm(event, setError, error);
                  }}
                />
              </>
            )}
            <span>{error.age ? error.age : ""}</span>
          </p>
        </div> */}
        <span
          className={styles.editInfo}
          onClick={() => {
            setEdit(!edit),
              setInput({
                name: "",
                age: "",
                bio: "",
                image: "",
                ubication: "",
              });
          }}
        >
          Editar Perfil
          <HiPencilSquare size={18}></HiPencilSquare>
        </span>
        {edit && (
          <button disabled={disabledHandle()} type="submit">
            <HiCheck size={20}></HiCheck>
          </button>
        )}
      </form>
    </div>
  );
};

export default ContentProfile;
