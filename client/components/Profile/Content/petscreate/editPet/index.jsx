import React from "react";
import { useState } from "react";
import Maps from "../../../../GoogleMap/Maps";
import styles from "./styles.module.css";
import { HiArrowDownOnSquare } from "react-icons/hi2";
import { PutPets } from "../../../../../stores/actions";
import { MdDelete } from "react-icons/md";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { validationUpdatePet } from "../../../../../controller/validationPetUpdate";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const EditProfile = ({ handlerClickEdit, pet, input, setInput }) => {
  const ages = [];
  for (let i = 1; i <= 40; i++) {
    ages.push(i);
  }
  const [error, setError] = useState();
  const [form, setForm] = useState(1);

  const handleInputChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const handleFiles = (event) => {
    const { files } = event.target;
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = () => {
      if (input.image.length < 4) {
        setInput({
          ...input,
          image: input.image
            ? [...input.image, reader.result]
            : [reader.result],
        });
      }
    };
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    if (
      (error?.name && error?.name !== null) ||
      (error?.description && error?.description !== null) ||
      !input.image.length
    ) {
      Swal.fire({
        title: "Información inválida, corrige los errores para avanzar",
        icon: "error",
        color: "#437042",
        confirmButtonColor: "#437042",
        confirmButtonAriaLabel: "#437042",
      });
    } else {
      PutPets(pet._id, input);
      setInput();
      setError();
      setForm(1);
    }
  };
  const handleMaps = (coord) => {
    setInput({
      ...input,
      location: coord,
    });
  };


  return (
    <>
      <div className={styles.containerForm}>
        <div className={styles.secondContainerForm}>
          <button
            onClick={() => {
              handlerClickEdit();
              setInput();
              setError();
              setForm(1);
            }}
          >
            x
          </button>
          <h1>Edita a {pet && pet.name.toUpperCase()}</h1>
        </div>{" "}
        <form
          className={styles.form}
          onSubmit={(event) => handleOnSubmit(event)}
        >
          {form === 1 ? (
            <>
              {/* NOMBRE!!!!! */}

                <span className={styles.error}>{error?.name}</span>
              <div className={styles.containerFormInfo}>
                <label htmlFor="submitEdit">
                  <p>Nombre:</p>
                </label>
                <input
                  className={styles.input}
                  placeholder={pet?.name}
                  name="name"
                  onChange={(event) => {
                    handleInputChange(event),
                      validationUpdatePet(event, input, setError, error);
                  }}
                  type="text"
                ></input>
              </div>

              {/* TAMAÑO!!!!! */}

              <div className={styles.containerFormInfo}>
                <label htmlFor="size" className={styles.stretchGenSize}>
                  <p>Tamaño:</p>
                  {/* <span className={styles.errors}>{errors.size}</span> */}
                  <div className={styles.radio}>
                    <label htmlFor="pequeño">
                      <input
                        type="radio"
                        id="pequeño"
                        value="pequeño"
                        name="size"
                        onChange={(event) => handleInputChange(event)}
                        checked={input?.size === "pequeño" ? true : false}
                      />
                      Pequeño
                    </label>
                    <label htmlFor="mediano">
                      <input
                        type="radio"
                        id="mediano"
                        value="mediano"
                        name="size"
                        onChange={(event) => handleInputChange(event)}
                        checked={input?.size === "mediano" ? true : false}
                      />
                      Mediano
                    </label>
                    <label htmlFor="grande">
                      <input
                        type="radio"
                        id="grande"
                        value="grande"
                        name="size"
                        onChange={(event) => handleInputChange(event)}
                        checked={input?.size === "grande" ? true : false}
                      />
                      Grande
                    </label>
                  </div>
                </label>
              </div>
              {/* ESPECIE!!!!! */}

              <div className={styles.containerFormInfo}>
                <label>
                  <p>Especie:</p>
                  <select
                    className={styles.input}
                    id="type"
                    name="type"
                    onChange={(event) => handleInputChange(event)}
                  >
                    <option defaultValue={true} value="select">
                      {pet?.type}
                    </option>
                    <option value="ave">Ave</option>
                    <option value="conejo">Conejo</option>
                    <option value="gato">Gato</option>
                    <option value="hamster">Hamster</option>
                    <option value="perro">Perro</option>
                    <option value="pez">Pez</option>
                    <option value="tortuga">Tortuga</option>
                    <option value="otra">otra</option>
                  </select>
                </label>
              </div>

              {/* EDAD!!!!! */}

              <div className={styles.containerFormInfo}>
                <label>
                  {" "}
                  <p>Edad:</p>
                  <select
                    name="age"
                    id="age"
                    className={styles.input}
                    onChange={(event) => {
                      //   validation(event, errors);
                      handleInputChange(event);
                    }}
                  >
                    <option defaultValue={true} value="">
                      {pet?.age}
                    </option>
                    {ages.map((age) => (
                      <option key={age} value={age}>
                        {age}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              {/* GENERO!!!!! */}

              <div className={styles.containerFormInfo}>
                <label htmlFor="gender" className={styles.stretchGenSize}>
                  <p>Genero:</p>
                  {/* <span className={styles.errors}>{errors.gender}</span> */}
                  <div className={styles.radio}>
                    <label htmlFor="macho">
                      <input
                        type="radio"
                        value="macho"
                        id="macho"
                        name="gender"
                        onChange={(event) => {
                          //   validation(event, errors);
                          handleInputChange(event);
                        }}
                        checked={input?.gender === "macho" ? true : false}
                      />
                      Macho
                    </label>
                    <label htmlFor="hembra">
                      <input
                        type="radio"
                        value="hembra"
                        id="hembra"
                        name="gender"
                        onChange={(event) => {
                          //   validation(event, errors);
                          handleInputChange(event);
                        }}
                        checked={input?.gender === "hembra" ? true : false}
                      />
                      Hembra
                    </label>
                  </div>
                </label>
              </div>

              {/* SALUD!!!!! */}

              <div className={styles.containerFormInfo}>
                <label htmlFor="health" className={styles.stretchHealt}>
                  <p>Salud:</p>
                  {/* <span className={styles.errors}>{errors.health}</span> */}
                  <div className={styles.radio}>
                    <label htmlFor="good">
                      <input
                        type="radio"
                        value="buena"
                        id="good"
                        name="health"
                        onChange={(event) => {
                          //   validation(event, errors);
                          handleInputChange(event);
                        }}
                        checked={input?.health === "buena" ? true : false}
                      />
                      Buena
                    </label>
                    <label htmlFor="needy">
                      <input
                        type="radio"
                        value="necesita atención"
                        id="needy"
                        name="health"
                        onChange={(event) => {
                          //   validation(event, errors);
                          handleInputChange(event);
                        }}
                        checked={
                          input?.health === "necesita atención" ? true : false
                        }
                      />
                      Necesita atención
                    </label>
                    <label htmlFor="unknown">
                      <input
                        type="radio"
                        value="desconocida"
                        id="unknown"
                        name="health"
                        onChange={(event) => {
                          //   validation(event, errors);
                          handleInputChange(event);
                        }}
                        checked={input?.health === "desconocida" ? true : false}
                      />
                      Desconozco
                    </label>
                  </div>
                </label>
              </div>

              {/* EXTRA - SALUD!!!!! */}

              {input?.health === "necesita atención" && (
                <div className={styles.containerFormInfo}>
                  <label htmlFor="healthExtra" className={styles.stretch}>
                    <p>Describe su condición de salud:</p>
                    {/* {errors.healthExtra ? (
                <span className={styles.errors}>{errors.healthExtra}</span>
              ) : (
                ""
              )} */}
                    <textarea
                      className={styles.input}
                      id="healthExtra"
                      type="text"
                      name="healthExtra"
                      placeholder={pet?.healthExtra}
                      onChange={(event) => {
                        //   validation(event, errors);
                        handleInputChange(event);
                      }}
                    />
                  </label>
                </div>
              )}

              {/* CONDICION!!!!! */}

              <div className={styles.containerFormInfo}>
                {" "}
                <label htmlFor="condition" className={styles.stretchGenSize}>
                  <p>Condición:</p>

                  <div className={styles.radio}>
                    <label htmlFor="pregnant">
                      <input
                        type="radio"
                        value="embarazada"
                        id="pregnant"
                        name="condition"
                        onChange={(event) => {
                          //   validation(event, errors);
                          handleInputChange(event);
                        }}
                        checked={
                          input?.condition === "embarazada" ? true : false
                        }
                      />
                      Embarazada
                    </label>
                    <label htmlFor="castrated">
                      <input
                        type="radio"
                        value="castrado/a"
                        id="castrated"
                        name="condition"
                        onChange={(event) => {
                          //   validation(event, errors);
                          handleInputChange(event);
                        }}
                        checked={
                          input?.condition === "castrado/a" ? true : false
                        }
                      />
                      Castrado/a
                    </label>
                    <label htmlFor="_unknown">
                      <input
                        type="radio"
                        value="desconocida"
                        id="_unknown"
                        name="condition"
                        onChange={(event) => {
                          //   validation(event, errors);
                          handleInputChange(event);
                        }}
                        checked={
                          input?.condition === "desconocida" ? true : false
                        }
                      />
                      Desconozco
                    </label>
                  </div>
                </label>
              </div>

              {/* SOCIABILIDAD!!!!! */}

              <div className={styles.containerFormInfo}>
                <label htmlFor="sociability" className={styles.stretchGenSize}>
                  <p>¿Cómo es su interacción con otros animales?</p>
                  <div className={styles.radio}>
                    <label htmlFor="_good">
                      <input
                        type="radio"
                        value="buena"
                        id="_good"
                        name="sociability"
                        onChange={(event) => {
                          //   validation(event, errors);
                          handleInputChange(event);
                        }}
                        checked={input?.sociability === "buena" ? true : false}
                      />
                      Buena
                    </label>
                    <label htmlFor="normal">
                      <input
                        type="radio"
                        value="normal"
                        id="normal"
                        name="sociability"
                        onChange={(event) => {
                          //   validation(event, errors);
                          handleInputChange(event);
                        }}
                        checked={input?.sociability === "normal" ? true : false}
                      />
                      Normal
                    </label>
                    <label htmlFor="bad">
                      <input
                        type="radio"
                        value="mala"
                        id="bad"
                        name="sociability"
                        onChange={(event) => {
                          //   validation(event, errors);
                          handleInputChange(event);
                        }}
                        checked={input?.sociability === "mala" ? true : false}
                      />
                      Mala
                    </label>
                    <label htmlFor="__unknown">
                      <input
                        type="radio"
                        value="desconocida"
                        id="__unknown"
                        name="sociability"
                        onChange={(event) => {
                          //   validation(event, errors);
                          handleInputChange(event);
                        }}
                        checked={
                          input?.sociability === "desconocida" ? true : false
                        }
                      />
                      Desconozco
                    </label>
                  </div>
                </label>
              </div>

              {/* LOCACION!!!!! */}

              <div className={styles.containMap}>
                <Maps setLocationPet={handleMaps} />
              </div>
            </>
          ) : (
            <>
              {/* DESCRIPCION!!!!! */}

              <div
                className={styles.containerFormInfo}
                style={{ width: "24rem" }}
              >
                <span>{error?.description}</span>
                <label
                  htmlFor="description"
                  className={styles.stretchDescription}
                >
                  <p>Descripción:</p>
                  {/* <span className={styles.errors}>
              {errors.description && errors.description}
            </span> */}
                  <textarea
                    className={styles.inputDescription}
                    value={
                      input?.description ? input.description : pet?.description
                    }
                    id="description"
                    type="text"
                    name="description"
                    placeholder=" Describa a la mascota..."
                    onChange={(event) => {
                      handleInputChange(event),
                        validationUpdatePet(event, input, setError, error);
                    }}
                  />
                </label>
              </div>

              {/* CONTACTO!!!!! */}

              <div className={styles.containerFormInfo}>
                <label htmlFor="contactAdoption">
                  <p>Contacto:</p>
                  <input
                    className={styles.input}
                    id="contactAdoption"
                    type="text"
                    name="contactAdoption"
                    placeholder={pet?.contactAdoption}
                    onChange={(event) => {
                      //   validation(event, errors);
                      handleInputChange(event);
                    }}
                  />
                </label>
              </div>

              {/* IMAGENES!!!!! */}

              <div className={styles.divImgsPost}>
                <label
                  htmlFor="image"
                  className={styles.mi_archivo}
                  name="image"
                  onChange={(event) => {
                    // validationImage(event, input, setError, error),
                    handleFiles(event);
                  }}
                >
                  <HiArrowDownOnSquare className={styles.upImage} />
                  Subir imagen
                  {/* <span className={styles.errors}>
                {errors.image && errors.image}
              </span> */}
                  <input
                    type="file"
                    className={styles.hiddenInput}
                    name="image"
                    id="image"
                  ></input>
                </label>
                <span className={styles.imagesContainer}>
                  {input?.image && input?.image.length !== 0 ? (
                    <>
                      {input.image.length > 0 &&
                        input.image.map((img, i) => (
                          <div className={styles.cointainerImageIndiv}>
                            <img src={img} className={styles.img} alt={i} />
                            <MdDelete
                              className={styles.deleteIcon}
                              size={20}
                              onClick={() =>
                                setInput({
                                  ...input,
                                  image: input.image.filter(
                                    (ele) => ele !== input.image[i]
                                  ),
                                })
                              }
                            ></MdDelete>
                            {/* <p>{img.slice(20, 30) + "..."}</p> */}
                          </div>
                        ))}
                      {/* <span
                    style={{
                      fontSize: 14,
                      cursor: "pointer",
                      background: "#e74",
                      padding: "5px",
                      borderRadius: "10px",
                      margin: "10px",
                    }}
                    onClick={() =>
                      setInput({
                        ...input,
                        image: input.image.slice(0, input.image.length - 1),
                      })
                    }
                  >
                    Deshacer
                  </span> */}
                    </>
                  ) : (
                    <>
                      <p>
                        {input?.image.length > 0
                          ? input.image.slice(0, 20) + "..."
                          : ""}
                      </p>
                      <span>
                        {input && !input.image.length
                          ? "Debes subir al menos una imagen"
                          : ""}
                      </span>
                    </>
                  )}
                </span>
                <span className={styles.error}>
                  {input?.image.length === 4
                    ? "Llegaste al máximo de imágenes"
                    : ""}
                </span>
              </div>
              <div className={styles.containerBtn}>
                <button className={styles.btn} type="submit">
                  Guardar informacion
                </button>
              </div>
            </>
          )}
        </form>
        {form === 1 ? (
          <div className={styles.prev}>
            <p style={{ cursor: "pointer" }} onClick={() => setForm(2)}>
              Siguiente
            </p>
            <IoIosArrowForward size={20}></IoIosArrowForward>
          </div>
        ) : (
          <div className={styles.next}>
            <IoIosArrowBack size={20}></IoIosArrowBack>
            <p style={{ cursor: "pointer" }} onClick={() => setForm(1)}>
              Anterior
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default EditProfile;
