import React from "react";
import styles from "../../pages/adoptionForm/style.module.css";

const AdoptionForm2 = ({
  errors,
  post,
  setFirst,
  validation,
  handleSelector,
  handleFiles,
  setPost,
}) => {
  return (
    <div className={styles.form2}>
      <span className={styles.title}>Datos de la Mascota</span>

      <label htmlFor="health" className={styles.health}>
        Salud
        {/* <span className={styles.errors}>{errors.health}</span> */}
        <div className={styles.radio}>
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

      <label htmlFor="sociability" className={styles.sociability}>
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

      <label htmlFor="description" className={styles.stretch}>
        Descripción:
        <span className={styles.errors}>{errors.description}</span>
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

      <label htmlFor="image" className={styles.stretch}>
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
      </label>
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
        style={{ textAlign: "left" }}
        type="button"
        onClick={() => setFirst(true)}
      >
        Atras
      </button>
      <label htmlFor="submit">
        <input
          id="submit"
          type="submit"
          value="Subir Mascota"
          disabled={
            !post.age ||
            !post.name ||
            !post.description ||
            !post.location.provincia ||
            !post.image ||
            !post.size ||
            !post.gender ||
            !post.type ||
            !post.location.municipio ||
            ///////////////////////////////////////////////////
            errors.name !== null ||
            errors.age !== null ||
            errors.description !== null ||
            errors.size !== null ||
            errors.gender !== null ||
            errors.ciudad !== null ||
            errors.provincia !== null ||
            errors.type !== null ||
            errors.image !== null ||
            errors.health !== null ||
            errors.sociability !== null ||
            errors.condition !== null
          }
        />
      </label>
    </div>
  );
};

export default AdoptionForm2;
