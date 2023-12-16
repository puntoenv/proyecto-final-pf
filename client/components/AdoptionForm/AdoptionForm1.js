import React from "react";
import styles from "./styles.module.css";
import { IoIosArrowForward } from "react-icons/io";

const AdoptionForm1 = ({
  errors,
  setFirst,
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
        value={post.name}
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
        value={post.age}
      >
        <option defaultValue={true} value={0}>
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
        value={post.type}
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

      <div className={styles.selectGenderSize}>
        {/******************RADIOS GENERO******************/}
        <label htmlFor="gender" className={styles.stretchGenSize}>
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
                checked={post.gender === "macho" ? true : false}
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
                checked={post.gender === "hembra" ? true : false}
              />
              Hembra
            </label>
          </div>
        </label>

        {/******************RADIOS TAMAÑO******************/}
        <label htmlFor="size" className={styles.stretchGenSize}>
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
                checked={post.size === "pequeño" ? true : false}
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
                checked={post.size === "mediano" ? true : false}
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
                checked={post.size === "grande" ? true : false}
              />
              Grande
            </label>
          </div>
        </label>
      </div>

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
              onChange={(e) => {
                validation(e, errors);
                handleSelector(e, setPost, post);
              }}
              checked={post.health === "buena" ? true : false}
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
              checked={post.health === "necesita atención" ? true : false}
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
              checked={post.health === "desconocida" ? true : false}
            />
            Desconozco
          </label>
        </div>
      </label>

      {post.health === "necesita atención" && (
        <label htmlFor="healthExtra" className={styles.stretch}>
          Describe su condición de salud:
          {errors.healthExtra ? (
            <span className={styles.errors}>{errors.healthExtra}</span>
          ) : (
            ""
          )}
          <textarea
            className={styles.input}
            id="healthExtra"
            type="text"
            name="healthExtra"
            placeholder="Descripción detallada"
            onChange={(e) => {
              validation(e, errors);
              handleSelector(e, setPost, post);
            }}
          />
        </label>
      )}

      <button
        type="button"
        className={styles.buttonSiguiente}
        onClick={() => setFirst(2)}
      >
        Siguiente <IoIosArrowForward size={30}></IoIosArrowForward>
      </button>
    </div>
  );
};

export default AdoptionForm1;
