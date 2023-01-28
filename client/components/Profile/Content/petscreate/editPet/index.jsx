import React from "react";
import { useState } from "react";
import Maps from "../../../../GoogleMap/Maps";
import styles from "./styles.module.css";
import { HiArrowDownOnSquare } from "react-icons/hi2";
import { PutPets } from "../../../../../stores/actions";
import { MdDelete } from "react-icons/md";
import { validationImage, validationUpdatePet } from "../../../../../controller/validationPetUpdate";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const EditProfile = ({ handlerClickEdit, pet, input, setInput }) => {
  const ages = [];
  for (let i = 1; i <= 40; i++) {
    ages.push(i);
  }
  const [error, setError] = useState();

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
      setInput({
        ...input,
        image: input.image ? [...input.image, reader.result] : [reader.result],
      });
    };
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    if ( 
      error?.name ||
      error?.description ||
      error?.name === null ||
      error?.description === null ||
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
    }
  };
  const handleMaps = (coord) => {
    setInput({
      ...input,
      location: coord,
    });
  };

console.log(!input?.image.length);
  console.log(error);

  return (
    <>
      <div className={styles.containerForm}>
        <h1>Formulario de edicion de {pet && pet.name.toUpperCase()}</h1>
        <button
          onClick={() => {
            handlerClickEdit();
            setInput();
            setError();
          }}
        >
          {" "}
          x
        </button>
        <form
          className={styles.form}
          onSubmit={(event) => handleOnSubmit(event)}
        >
          <span>{error?.name}</span>
          <label htmlFor="submitEdit">Nombre:</label>
          <input
            placeholder={pet?.name}
            name="name"
            onChange={(event) => {
              handleInputChange(event),
                validationUpdatePet(event, input, setError, error);
            }}
            type="text"
          ></input>
          <label htmlFor="size" className={styles.stretchGenSize}>
            Tamaño:
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

          <label>
            Especie:
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

          <label>
            {" "}
            Edad:
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

          <label htmlFor="gender" className={styles.stretchGenSize}>
            Genero: {pet?.gender}
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
                />
                Hembra
              </label>
            </div>
          </label>

          <label htmlFor="health" className={styles.stretchHealt}>
            Salud: {pet?.health}
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
                />
                Desconozco
              </label>
            </div>
          </label>

          {input?.health === "necesita atención" && (
            <label htmlFor="healthExtra" className={styles.stretch}>
              Describe su condición de salud: {pet?.healthExtra}
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
                placeholder="Descripción detallada"
                onChange={(event) => {
                  //   validation(event, errors);
                  handleInputChange(event);
                }}
              />
            </label>
          )}

          <label htmlFor="condition" className={styles.stretchGenSize}>
            Condición: {pet?.condition}
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
                />
                Desconozco
              </label>
            </div>
          </label>

          <label htmlFor="sociability" className={styles.stretchGenSize}>
            ¿Cómo es su interacción con otros animales?: {pet?.sociability}
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
                />
                Desconozco
              </label>
            </div>
          </label>

          <div className={styles.containMap}>
            <Maps setLocationPet={handleMaps} />
          </div>
          <span>{error?.description}</span>
          <label htmlFor="description" className={styles.stretchDescription}>
            Descripción:
            {/* <span className={styles.errors}>
              {errors.description && errors.description}
            </span> */}
            <textarea
              className={styles.input}
              value={input?.description ? input.description : pet?.description}
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

          <label htmlFor="contactAdoption">
            Contacto: {pet?.contactAdoption}
            <input
              className={styles.input}
              id="contactAdoption"
              type="text"
              name="contactAdoption"
              placeholder="Información de contacto"
              onChange={(event) => {
                //   validation(event, errors);
                handleInputChange(event);
              }}
            />
          </label>

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
            <span style={{ textAlign: "center", fontSize: 14 }}>
              {input?.image && input?.image.length !== 0 ? (
                <>
                  {input?.image.map((img, i) => (
                    <div style={{ width: "100px", height: "100px" }}>
                      <MdDelete
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
                      <img src={img} alt={i} />
                      <p>{img.slice(0, 20) + "..."}</p>
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
                    {input?.image ? input.image.slice(0, 20) + "..." : ""}
                  </p>
                  <span>{input && !input.image.length ? "Debes subir al menos una imagen": "" }</span>
                </>
              )}
            </span>
          </div>
          <button type="submit">Guardar informacion</button>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
