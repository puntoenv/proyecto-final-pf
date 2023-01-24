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
}) => {
  console.log(post);
  return (
    <div className={styles.form2}>
      <button
        className={styles.buttonAtras}
        type="button"
        onClick={() => setFirst(2)}
      >
        <IoIosArrowBack size={30}></IoIosArrowBack> Atrás
      </button>
      <label htmlFor="description" className={styles.stretchDescription}>
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
      {/********************** INPUT INFO CONTACT ************************/}
      <input
        className={styles.input}
        id="contactAdoption"
        type="text"
        name="contactAdoption"
        placeholder="Información de contacto"
        onChange={(e) => {
          handleSelector(e, setPost, post);
        }}
      />

      <div className={styles.divImgsPost}>
        <label
          htmlFor="image"
          className={styles.mi_archivo}
          name="image"
          onChange={(e) => {
            validation(e, errors, setError);
            handleFiles(e, setPost, post);
          }}
        >
          <HiArrowDownOnSquare className={styles.upImage} />
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
          {post.image && post.image.length !== 0 && (
            <>
              {post.image.map((img, i) => (
                <p>{img.slice(0, 20) + "..."}</p>
              ))}
              <span
                style={{ fontSize: 18, cursor: 'pointer' }}
                onClick={() =>
                  setPost({
                    ...post,
                    image: post.image.slice(0, post.image.length - 1),
                  })
                }
              >
                Deshacer
              </span>
            </>
          )}
        </span>
      </div>
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
