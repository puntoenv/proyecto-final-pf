import React from "react";
import { HiCheck, HiPencilSquare, HiArrowDownOnSquare } from "react-icons/hi2";
import {MdDelete} from 'react-icons/md'
import { GoX } from "react-icons/go";
import styles from "./styles.module.css";
import { useState } from "react";
import {
  handleFiles,
  validateForm,
} from "../../../../controller/validationUpdateP";
import Maps from "../../../GoogleMap/Maps";

const ContentProfile = ({ user, response, handleOnSubmit, hanldeOnChange }) => {
  const imgAux =
    "https://www.pngkit.com/png/detail/128-1280585_user-icon-fa-fa-user-circle.png";
  const nameUpper =
    response.name && response.name[0].toUpperCase() + response.name.slice(1);

  const idUser = user?.sub.split("|")[1];

  const [show, setShow] = useState(false);

  const [directions, setDirections] = useState({
    direction1: "",
    direction2: "",
    direction3: "",
  });

  const [input, setInput] = useState({
    name: "",
    age: "",
    bio: "",
    image: "",
    gender: "",
    ubication: "",
    directions: "",
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
    directions: "",
  });

  const [edit, setEdit] = useState(false);

  const handleMaps = (coord) => {
    setInput({
      ...input,
      ubication: [...input.ubication, coord],
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
                <p>{user.name}</p>
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
            <p>Género: </p>

            {!edit ? (
              response.gender ? (
                response.gender
              ) : (
                "No especificado"
              )
            ) : (
              <>
                {/* <input
                  className={styles.input}
                  type="text"
                  placeholder="Ej: Buenos Aires"
                  name="ubication"
                  onChange={(event) => {
                    hanldeOnChange(event, setInput, input, setResult),
                      validateForm(event, setError, error);
                  }}
                /> */}
                <select
                  className={styles.input}
                  onChange={(event) => {
                    hanldeOnChange(event, setInput, input, setResult),
                      validateForm(event, setError, error);
                  }}
                  name="gender"
                >
                  <option></option>
                  <option value="Femenino" name="gender">
                    Femenino
                  </option>
                  <option value="Masculino" name="gender">
                    Masculino
                  </option>
                  <option value="Prefiero no decirlo" name="gender">
                    Prefiero no decirlo
                  </option>
                </select>
              </>
            )}
            <p className={styles.Error}>
              {error.ubication ? error.ubication : ""}
            </p>
          </p>
        </div>
        <div className={styles.infoEnvio}>
          <p>Información de envíos:</p>
          <div className={styles.inputEnvios}>
            <p>
              <p>Ubicación 1: </p>
              {response.directions && response.directions[0] ? (
                <>{response.directions[0]}</>
              ) : (
                "No especificado"
              )}
            </p>
            <p>
              <p>Ubicación 2: </p>
              {response.directions && response.directions[1] ? (
                <>{response.directions[1]}</>
              ) : (
                "No especificado"
              )}
            </p>
            <p>
              <p>Ubicación 3: </p>
              {response.directions && response.directions[2] ? (
                <>{response.directions[2]}</>
              ) : (
                "No especificado"
              )}
            </p>
          </div>
        </div>
        {edit && (
          <div className={styles.containMap}>
            <div style={{ width: "14rem", height: "auto" }}>
              <Maps
                setLocationPet={handleMaps}
                setInput={setInput}
                input={input}
              />
            </div>
            <div className={styles.inputMaps}>
              {input.directions && input.directions[0] && (
                <div>
                  <MdDelete
                    size={20}
                    onClick={() =>
                      setInput({
                        ...input,
                        directions: input.directions.filter(
                          (ele) => ele !== input.directions[0]
                        ),
                      })
                    }
                  ></MdDelete>
                  <p className={styles.infoDir}>{input.directions[0]}</p>
                </div>
              )}
              {input.directions && input.directions[1] && (
                <div>
                  <MdDelete
                    size={20}
                    onClick={() =>
                      setInput({
                        ...input,
                        directions: input.directions.filter(
                          (ele) => ele !== input.directions[1]
                        ),
                      })
                    }
                  ></MdDelete>
                  <p className={styles.infoDir}>{input.directions[1]}</p>
                </div>
              )}
              {input.directions && input.directions[2] && (
                <div>
                  <MdDelete
                    size={20}
                    onClick={() =>
                      setInput({
                        ...input,
                        directions: input.directions.filter(
                          (ele) => ele !== input.directions[2]
                        ),
                      })
                    }
                  ></MdDelete>
                  <p className={styles.infoDir}>{input.directions[2]}</p>
                </div>
              )}
              {input.directions && input.directions.length === 3 && (
                <p className={styles.Error}>
                  Llegaste al máximo de direcciones
                </p>
              )}
            </div>
          </div>
        )}
        <div className={styles.containEdit}>
          <span
            className={styles.editInfo}
            onClick={() => {
              setEdit(!edit),
                setInput({
                  name: "",
                  age: "",
                  bio: "",
                  image: "",
                  gender: "",
                  ubication: "",
                  directions: response.directions ? response.directions : "",
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
            <button
              className={styles.buttonSubmit}
              disabled={disabledHandle()}
              type="submit"
            >
              Guardar información
              {/* <HiCheck size={20}></HiCheck> */}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ContentProfile;
