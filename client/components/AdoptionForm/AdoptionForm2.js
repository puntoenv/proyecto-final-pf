import React from "react";
import styles from "./styles.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import "sweetalert2/src/sweetalert2.scss";
import Maps from "../GoogleMap/Maps";

const AdoptionForm2 = ({
  errors,
  post,
  setFirst,
  validation,
  handleSelector,
  setPost,
  handleProvincia,
  handleCiudad,
  dispatch,
  getmuni,
  provi,
  munici,
}) => {
  console.log(post.image);
  return (
    <div className={styles.form2}>
      <button
        className={styles.buttonAtras}
        type="button"
        onClick={() => setFirst(1)}
      >
        <IoIosArrowBack size={30}></IoIosArrowBack> Atrás
      </button>

      <div className={styles.selectGenderSize}>
        <label htmlFor="condition" className={styles.stretchGenSize}>
          Condición
          <div className={styles.radio}>
            <label htmlFor="pregnant">
              <input
                type="radio"
                value="embarazada"
                id="pregnant"
                name="condition"
                onChange={(e) => {
                  validation(e, errors);
                  handleSelector(e, setPost, post);
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
                onChange={(e) => {
                  validation(e, errors);
                  handleSelector(e, setPost, post);
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
                onChange={(e) => {
                  validation(e, errors);
                  handleSelector(e, setPost, post);
                }}
              />
              Desconozco
            </label>
          </div>
        </label>

        <label htmlFor="sociability" className={styles.stretchGenSize}>
          ¿Cómo es su interacción con otros animales?
          <div className={styles.radio}>
            <label htmlFor="_good">
              <input
                type="radio"
                value="buena"
                id="_good"
                name="sociability"
                onChange={(e) => {
                  validation(e, errors);
                  handleSelector(e, setPost, post);
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
                onChange={(e) => {
                  validation(e, errors);
                  handleSelector(e, setPost, post);
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
                onChange={(e) => {
                  validation(e, errors);
                  handleSelector(e, setPost, post);
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
                onChange={(e) => {
                  validation(e, errors);
                  handleSelector(e, setPost, post);
                }}
              />
              Desconozco
            </label>
          </div>
        </label>
      </div>

      <div className={styles.containMap}>
        <Maps lat />
      </div>
      {/*  <span className={styles.errors}>{errors.provincia}</span>
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
        {munici?.map((el) => (
          <option key={el.nombre} value={el.nombre}>
            {el.nombre}
          </option>
        ))}
      </select> */}

      <button
        type="button"
        className={styles.buttonSiguiente}
        onClick={() => setFirst(3)}
      >
        Siguiente <IoIosArrowForward size={30}></IoIosArrowForward>
      </button>
    </div>
  );
};

export default AdoptionForm2;
