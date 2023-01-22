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
import Maps from "../../../GoogleMap/Maps";

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
    // directions: [direction1, direction2, direction3]
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
    directions: '',
  });

  const [edit, setEdit] = useState(false);

  const handleMaps = (coord) => {
    setInput({
      ...input,
      ubication: coord,
    });
  };

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
        <div className={styles.bar}></div>
        <div className={styles.divImage}>
          <div className={styles.backImage}>
            <img
              className={styles.image}
              src={response.image ? response.image : imgAux}
              alt={user.name}
            />
          </div>

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
                  className={styles.input}
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
            <p className={styles.Error}>{error.bio ? error.bio : ""}</p>
          </p>
          <p>
            <p>Nombre:</p>

            {!edit ? (
              nameUpper ? (
                nameUpper
              ) : (
                "No especificado"
              )
            ) : (
              <>
                <input
                  className={styles.input}
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

            <p className={styles.Error}>{error.name ? error.name : ""}</p>
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
                  className={styles.input}
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

            <p className={styles.Error}>{error.age ? error.age : ""}</p>
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
                  className={styles.input}
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
            <p className={styles.Error}>
              {error.ubication ? error.ubication : ""}
            </p>
            {/* <div className={styles.containMap}>
              <Maps setLocationPet={handleMaps} />
            </div> */}
          </p>
        </div>
        <div className={styles.infoEnvio}>
          <p>Información de envíos:</p>
          <div className={styles.inputEnvios}>
            <p>
              <p>Ubicación 1: </p>
              {!edit ? (
                response.directions ? (
                  response.directions[0]
                ) : (
                  "No especificado"
                )
              ) : (
                <>
                  <input
                    className={styles.inputEnviosStyle}
                    type="text"
                    placeholder="Calle, Altura, CP"
                    name="directions"
                    onChange={(event) => {
                      hanldeOnChange(event, setInput, input, setResult),
                        validateForm(event, setError, error);
                    }}
                  />
                </>
              )}
              <span>{error.directions ? error.directions : ""}</span>
            </p>
            <p>
              <p>Ubicación 2: </p>
              {!edit ? (
                response.directions && response.directions[1] ? (
                  response.directions[1]
                ) : (
                  "No especificado"
                )
              ) : (
                <>
                  <input
                    className={styles.inputEnviosStyle}
                    type="text"
                    placeholder="Calle, Altura, CP"
                    name="directions"
                    onChange={(event) => {
                      hanldeOnChange(event, setInput, input, setResult),
                        validateForm(event, setError, error);
                    }}
                  />
                </>
              )}
              <span>{error.directions ? error.directions : ""}</span>
            </p>
            <p>
              <p>Ubicación 3: </p>
              {!edit ? (
                response.directions && response.directions[2] ? (
                  response.directions[2]
                ) : (
                  "No especificado"
                )
              ) : (
                <>
                  <input
                    className={styles.inputEnviosStyle}
                    type="text"
                    placeholder="Calle, Altura, CP"
                    name="directions"
                    onChange={(event) => {
                      hanldeOnChange(event, setInput, input, setResult),
                        validateForm(event, setError, error);
                    }}
                  />
                </>
              )}
              <span>{error.directions ? error.directions : ""}</span>
            </p>
          </div>
        </div>
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
            setError({
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
            Guardar información
            <HiCheck size={20}></HiCheck>
          </button>
        )}
      </form>
    </div>
  );
};

export default ContentProfile;
