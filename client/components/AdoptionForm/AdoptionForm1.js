import React from "react";
import styles from "./styles.module.css";
import { IoIosArrowForward } from "react-icons/io";
import Swal from "sweetalert2/dist/sweetalert2.js";

const AdoptionForm1 = ({
  errors,
  setFirst,
  handleDisableInput,
  handleSelector,
  validation,
  setPost,
  post,
}) => {
  const ages = [];
  for (let i = 1; i <= 40; i++) {
    ages.push(i);
  }
  return (
    <div className={styles.containForm1}>
      {/******************INPUT NAME******************/}
      <span className={styles.errors}>{errors.name}</span>
      <input
        className={styles.input}
        id="name"
        type="text"
        name="name"
        placeholder="Nombre..."
        onChange={(e) => {
          validation(e, errors);
          handleSelector(e, setPost, post);
        }}
      />
      {/******************SELECTS TYPES-AGE******************/}
      <span className={styles.errors}>{errors.age}</span>
      <select
        name="age"
        id="age"
        className={styles.input}
        onChange={(e) => {
          validation(e, errors);
          handleSelector(e, setPost, post);
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
      <span className={styles.errors}>{errors.type}</span>
      <select
        className={styles.input}
        id="type"
        name="type"
        onChange={(e) => {
          validation(e, errors);
          handleSelector(e, setPost, post);
        }}
      >
        <option defaultValue={true} value="select">
          Especie
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

      {/******************RADIOS GENERO******************/}
      <label htmlFor="gender" className={styles.stretch}>
        Genero:
        <span className={styles.errors}>{errors.gender}</span>
        <div className={styles.radio}>
          <label htmlFor="macho">
            <input
              type="radio"
              value="macho"
              id="macho"
              name="gender"
              onChange={(e) => {
                validation(e, errors);
                handleSelector(e, setPost, post);
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
              onChange={(e) => {
                validation(e, errors);
                handleSelector(e, setPost, post);
              }}
            />
            Hembra
          </label>
        </div>
      </label>

      {/******************RADIOS SALUD******************/}
      <label htmlFor="size" className={styles.stretch}>
        Tamaño:
        <span className={styles.errors}>{errors.size}</span>
        <div className={styles.radio}>
          <label htmlFor="pequeño">
            <input
              type="radio"
              id="pequeño"
              value="pequeño"
              name="size"
              onChange={(e) => {
                validation(e, errors);
                handleSelector(e, setPost, post);
              }}
            />
            Pequeño
          </label>
          <label htmlFor="mediano">
            <input
              type="radio"
              id="mediano"
              value="mediano"
              name="size"
              onChange={(e) => {
                validation(e, errors);
                handleSelector(e, setPost, post);
              }}
            />
            Mediano
          </label>
          <label htmlFor="grande">
            <input
              type="radio"
              id="grande"
              value="grande"
              name="size"
              onClick={(e) => {
                validation(e, errors);
                handleSelector(e, setPost, post);
              }}
            />
            Grande
          </label>
        </div>
      </label>
      <label htmlFor="health" className={styles.health}>
        Salud
        {/* <span className={styles.errors}>{errors.health}</span> */}
        <div className={styles.radio2}>
          <label htmlFor="good">
            <input
              type="radio"
              value="buena"
              id="good"
              name="health"
              onChange={(e) => {
                validation(e, errors);
                handleSelector(e, setPost, post);
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
              onChange={(e) => {
                validation(e, errors);
                handleSelector(e, setPost, post);
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
              onChange={(e) => {
                validation(e, errors);
                handleSelector(e, setPost, post);
              }}
            />
            Desconozco
          </label>
        </div>
      </label>
      <button
        type="button"
        className={styles.buttonSiguiente}
        onClick={() => setFirst(false)}
      >
        Siguiente <IoIosArrowForward size={30}></IoIosArrowForward>
      </button>
    </div>
  );
};

export default AdoptionForm1;

// const AdoptionForm2 = ({ setFirst }) => {
//   return (
//     <div>
//       <h1>hola</h1>
//       <button type="button" onClick={() => setFirst(true)}>
//         Atras
//       </button>
//     </div>
//   );
// };
