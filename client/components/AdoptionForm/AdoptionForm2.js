import React from "react";
import styles from "./styles.module.css";
import { HiArrowDownOnSquare } from "react-icons/hi2";
import { IoIosArrowBack } from "react-icons/io";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const AdoptionForm2 = ({
  errors,
  post,
  setFirst,
  validation,
  handleSelector,
  handleFiles,
  setPost,
  setError,
  handleDisableInput,
  handleProvincia,
  handleCiudad,
  dispatch,
  getmuni,
  provi,
  munici,
}) => {
  return (
    <div className={styles.form2}>
      <label htmlFor="condition" className={styles.condition}>
        Condición
        <div className={styles.radio2}>
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

      <label htmlFor="sociability" className={styles.sociability}>
        ¿Cómo es su interacción con otros animales?
        <div className={styles.radio2}>
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

      <label className={styles.location}>
        <label htmlFor="provincia" className={styles.stretch}>
          <span className={styles.title2}>Provincia</span>
          <span className={styles.errors}>{errors.provincia}</span>
          <select
            className={styles.locat_select}
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
            className={styles.locat_select}
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

      <label htmlFor="description" className={styles.stretch}>
        Descripción:
        <span className={styles.errors}>
          {errors.description && errors.description}
        </span>
        <textarea
          className={styles.input}
          id="description"
          type="text"
          name="description"
          rows="3"
          placeholder=" Describa a la mascota..."
          onChange={(e) => {
            validation(e, errors);
            handleSelector(e, setPost, post);
          }}
        />
      </label>

      {/* <label htmlFor="image" className={styles.stretch}>
        Imagen:
        <span className={styles.errors}>{errors.image}</span>
        <input
          id="image"
          type="file"
          name="image"
          onChange={(e) => {
            validation(e, errors);
            handleFiles(e, setPost, post);
          }}
        />
      </label> */}
      <label
        htmlFor="image"
        className={styles.mi_archivo}
        name="image"
        onChange={(e) => {
          validation(e, errors, setError);
          handleFiles(e, setPost, post);
        }}
      >
        <HiArrowDownOnSquare size={15}></HiArrowDownOnSquare>
        Subir imagen
        <span className={styles.errors}>{errors.image && errors.image}</span>
        <input
          type="file"
          className={styles.hiddenInput}
          name="image"
          id="image"
        ></input>
      </label>
      <span style={{ textAlign: "center" }}>
        {post.image && post.image.slice(0, 40) + "..."}
      </span>
      {/* <label htmlFor="email">
                Email de confirmación de publicación
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Ingrese el email..."
                onChange={(e) => handleSelector(e)}
              /> */}
      <button
        className={styles.buttonAtras}
        type="button"
        onClick={() => setFirst(true)}
      >
        <IoIosArrowBack size={30}></IoIosArrowBack> Atrás
      </button>
      <label htmlFor="submit" className={styles.submit}>
        <button
          className={styles.inputSubmit}
          id="submit"
          type="submit"
          value="Subir Mascota"
        >
          Publicar
        </button>
      </label>
    </div>
  );
};

export default AdoptionForm2;
