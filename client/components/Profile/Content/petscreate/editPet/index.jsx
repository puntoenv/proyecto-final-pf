import React from "react";
import { useState } from "react";
import styles from "./styles.module.css";

  const ages = [];
  for (let i = 1; i <= 40; i++) {
    ages.push(i);
  }

const EditProfile = ({ handlerClickEdit,  setEdit, pet}) => {    

    console.log(pet)

    const [input, setInput] = useState()

    const handleInputChange = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
    }
console.log(input)
  return (
    <>
      <div className={styles.containerForm}>
        <h1>Formulario de edicion de {pet && pet.name.toUpperCase()}</h1>
        <button
          onClick={() => {
            handlerClickEdit();
            setInput();
          }}
        >
          {" "}
          x
        </button>
        <form className={styles.form}>
          <label htmlFor="submitEdit">Nombre:</label>
          <input
            placeholder={pet?.name}
            name="name"
            onChange={(event) => handleInputChange(event)}
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
                />
                Grande
              </label>
            </div>
          </label>

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
              Edad
            </option>
            {ages.map((age) => (
              <option key={age} value={age}>
                {age}
              </option>
            ))}
          </select>

          <label htmlFor="gender" className={styles.stretchGenSize}>
            Genero:
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
            Salud
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
              Describe su condición de salud:
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
        </form>
      </div>
    </>
  );
};

export default EditProfile;
