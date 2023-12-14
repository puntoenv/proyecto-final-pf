import React, { useEffect, useMemo, useState } from "react";
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
  handlerCoords,
  setPost,
}) => {
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
        {/********************* INPUT CONDITION **********************/}
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
                checked={post.condition === "embarazada" ? true : false}
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
                checked={post.condition === "castrado/a" ? true : false}
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
                checked={post.condition === "desconocida" ? true : false}
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
                checked={post.sociability === "buena" ? true : false}
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
                checked={post.sociability === "normal" ? true : false}
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
                checked={post.sociability === "mala" ? true : false}
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
                checked={post.sociability === "desconocida" ? true : false}
              />
              Desconozco
            </label>
          </div>
        </label>
      </div>

      <div className={styles.containMap}>
        <Maps
          setLocationPet={handlerCoords}
          coords={post.location}
          search={true}
        />
      </div>

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
