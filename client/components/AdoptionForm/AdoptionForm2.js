import React from "react";
import styles from "../../pages/adoptionForm/style.module.css";
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
}) => {
  return (
    <div className={styles.form2}>
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
          <label classNamee={styles.label} htmlFor="good">
            <input
              classNamee={styles.input}
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
          <div className={styles.check}></div>
          <label classNamee={styles.label} htmlFor="needy">
            <input
              classNamee={styles.input}
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
          <div className={styles.check}></div>
          <label classNamee={styles.label} htmlFor="unknown">
            <input
              classNamee={styles.input}
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
          <div className={styles.check}></div>
        </div>
      </label>

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
        <HiArrowDownOnSquare size={20}></HiArrowDownOnSquare>
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
          // disabled={
          //   // !post.age ||
          //   // !post.name ||
          //   // !post.description ||
          //   // !post.location.provincia ||
          //   // !post.image ||
          //   // !post.size ||
          //   // !post.gender ||
          //   // !post.type ||
          //   // !post.location.municipio ||
          //   // ///////////////////////////////////////////////////
          //   // errors.name !== null ||
          //   // errors.age !== null ||
          //   // errors.description !== null ||
          //   // errors.size !== null ||
          //   // errors.gender !== null ||
          //   // errors.ciudad !== null ||
          //   // errors.provincia !== null ||
          //   // errors.type !== null ||
          //   // errors.image !== null ||
          //   // errors.health !== null ||
          //   // errors.sociability !== null ||
          //   // errors.condition !== null
          //   () => handleDisableInput(post, errors, Swal)
          // }
          // onClick={event => handleDisableInput(event, post, errors, Swal)}
        >Subir Mascota</button>
      </label>
    </div>
  );
};

export default AdoptionForm2;
