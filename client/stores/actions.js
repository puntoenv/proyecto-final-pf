import axios from "axios";
import { getPersonajes, getmunicipios } from "./slice";
import { getMascotas /* getMascotaEncontrada */ } from "./mascotas";
import { getUser } from './User';
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

export const PostAdop = async (post) => {
  let res = await axios.post("http://localhost:3001/pets/post-pet", post);
  return res;
};

export const GetUs = () => async (dispatch) => {
  await axios.get('http://localhost:3001/user/63b773434f2e71676e855f8a').then(res => dispatch(getUser(res.data)))
}