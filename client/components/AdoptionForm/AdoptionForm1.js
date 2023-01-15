import React from "react";
import styles from "../../pages/adoptionForm/style.module.css";
import { IoIosArrowForward } from "react-icons/io";

const AdoptionForm1 = ({
  errors,
  provi,
  munici,
  setFirst,
  handleProvincia,
  handleCiudad,
  handleSelector,
  validation,
  setPost,
  post,
  dispatch,
  getmuni,
}) => {
  const ages = [];
  for (let i = 0; i <= 40; i++) {
    ages.push(i);
  }
  return (
    <div>
      <label htmlFor="name" className={styles.stretch}>
        Nombre:
        <span className={styles.errors}>{errors.name}</span>
        <input
          className={styles.input}
          id="name"
          type="text"
          name="name"
          placeholder=" Ingrese el nombre de la mascota..."
          onChange={(e) => {
            validation(e, errors);
            handleSelector(e, setPost, post);
          }}
        />
      </label>
      {/* <label htmlFor="size" className={styles.stretch}>
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
      </label> */}
      <label htmlFor="age" className={styles.stretch}>
        Edad:
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
            Ingrese la edad de la mascota...
          </option>
          {ages.map((age) => (
            <option key={age} value={age}>
              {age}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="type" className={styles.stretch}>
        Especie:
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
            Seleccione la especie de la mascota...
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

      <label className={styles.stretch}>
        Ubicación:
        <label htmlFor="provincia" className={styles.stretch}>
          <span className={styles.title2}>Provincia</span>
          <span className={styles.errors}>{errors.provincia}</span>
          <select
            className={styles.input}
            name="provincia"
            id="provincia"
            onChange={(e) => {
              validation(e, errors);
              handleProvincia(e, setPost, post, dispatch, getmuni);
            }}
          >
            <option defaultValue={true} value="select">
              Seleccione la provincia...
            </option>
            {provi?.map((el) => (
              <option key={el.nombre} value={el.nombre}>
                {el.nombre}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="ciudad" className={styles.stretch}>
          <span className={styles.title2}>Ciudad</span>
          <span className={styles.errors}>{errors.ciudad}</span>
          <select
            className={styles.input}
            id="ciudad"
            name="ciudad"
            onChange={(e) => {
              validation(e, errors);
              handleCiudad(e, setPost, post);
            }}
          >
            <option defaultValue={true} value="select">
              Seleccione la ciudad...
            </option>
            <option value="Resistencia">Resistencia</option>
            {munici?.map((el) => (
              <option key={el.nombre} value={el.nombre}>
                {el.nombre}
              </option>
            ))}
          </select>
        </label>
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
