import axios from "axios";
import { getPersonajes, getmunicipios, getuser } from "./slice";
import { getMascotas } from "./mascotas";
import { useRouter } from "next/router";
// const router = useRouter();

export const getper = () => async (dispatch) => {
  try {
    await fetch("https://apis.datos.gob.ar/georef/api/provincias")
      .then((res) => (res.ok ? res.json() : promise.reject(res)))
      .then((res) => dispatch(getPersonajes(res)));
  } catch (error) {
    return console.error(error);
  }
};

export const getmuni = (municipios) => async (dispatch) => {
  try {
    await fetch(
      `https://apis.datos.gob.ar/georef/api/municipios?provincia=${municipios}`
    )
      .then((res) => (res.ok ? res.json() : promise.reject(res)))
      .then((res) => dispatch(getmunicipios(res)));
  } catch (error) {
    console.error(error);
  }
};

export const getPets = () => async (dispatch) => {
  try {
    let allPets = await axios("http://localhost:3001/pets/all");
    dispatch(getMascotas(allPets.data.pets));
  } catch (error) {
    console.error(error);
  }
};

export const searchPet = (pet) => async (dispatch) => {
  try {
    const petEncontrado = await axios(
      `http://localhost:3001/pets/by-name?name=${pet}`
    );
    dispatch(getMascotas(petEncontrado.data));
  } catch (error) {
    console.error(error);
  }
};

/*export const filtersize = async (fil) => {
    const {size, type, age, gender, location} = fil
   const filtros = await axios.get(`http://localhost:3001/pets/filter?size=${size}&type=${type}&age=${age}&gender=${gender}&location=${location}`)
   return filtros
}*/

export const PostAdop = (post) => {
  return (
    axios
      .post("http://localhost:3001/pets/post-pet", post)
      .then((res) => {
        alert("Mascota publicada correctamente.");
        return res.data;
      })
      // .then((id) => fetch(`http://localhost:3001/pets/detail/${id}`))
      // .then((response) => response.url.split("/").pop())
      // .then((id) => router.push(`detail/${id}`))
      .catch((err) => alert(err.response.data))
  );
};

export const postUser = (payload) => {
  // return async function(dispatch){
  //     const response = await axios('http://localhost:3001/cards')
  //     return dispatch({type: GET_ALL_DOGS, payload: response.data})
  // }

  return async function () {
    try {
      console.log(payload);
      const response = await axios.post(
        "http://localhost:3001/auth/register",
        payload
      );
      console.log(response);
      return response;
    } catch (err) {
      return err.response;
    }
  };
};

export const GetUs = () => async (dispatch) => {
  await axios
    .get("http://localhost:3001/user/63b773434f2e71676e855f8a")
    .then((res) => dispatch(getuser(res.data)));
};

export const filtrarMascotas = (mascotas) => (dispatch) => {
  try {
    const filtradas = axios(
      `http://localhost:3001/pets/filter?size=${mascotas.size}&age=${mascotas.age}&gender=${mascotas.gender}&type=${mascotas.type}`
    );
    dispatch(getMascotas(filtradas.data));
  } catch (error) {
    console.error(error);
  }
};
