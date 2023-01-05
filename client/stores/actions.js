import axios from "axios";
import { getPersonajes, getmunicipios } from "./slice";
import { getMascotas /* getMascotaEncontrada */ } from "./mascotas";

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

export const getPets = () => async (dispatch) => {
  let allPets = await axios("http://localhost:3001/pets/all");
  dispatch(getMascotas(allPets.data.pets));
};

/*export const filtersize = async (fil) => {
    const {size, type, age, gender, location} = fil
   const filtros = await axios.get(`http://localhost:3001/pets/filter?size=${size}&type=${type}&age=${age}&gender=${gender}&location=${location}`)
   return filtros
}*/

export const PostAdop = async (post) => {
  console.log(post);
  let res = await axios.post("http://localhost:3001/pets/post-pet", post);
  return res;
};
