import axios from "axios";
import { getPersonajes, getmunicipios } from "./slice";

export const getper = () => async (dispatch) => {
  await fetch("https://apis.datos.gob.ar/georef/api/provincias")
    .then((res) => (res.ok ? res.json() : promise.reject(res)))
    .then((res) => dispatch(getPersonajes(res)));
};

export const getmuni = (municipios) => async (dispatch) => {
  await fetch(
    `https://apis.datos.gob.ar/georef/api/municipios?provincia=${municipios}`
  )
    .then((res) => (res.ok ? res.json() : promise.reject(res)))
    .then((res) => dispatch(getmunicipios(res)));
};

export const PostAdop = async (post) => {
  console.log(post);
  let res = await axios.post("http://localhost:3001/pets/post-pet", post);
  return res;
};
