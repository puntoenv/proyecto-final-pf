import axios from "axios";
import url from "url";
import { getPersonajes, getmunicipios, getuser } from "./slice";
import { backFilter, getMascotas, petsFilter } from "./mascotas";

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

/*export const filtersize = async (fil) => {
    const {size, type, age, gender, location} = fil
    const filtros = await axios.get(`http://localhost:3001/pets/filter?size=${size}&type=${type}&age=${age}&gender=${gender}&location=${location}`)
    return filtros
  }*/

export const PostAdop = (post) => {
  return (
    axios
      .post("/pets/post-pet", post)
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
        "/auth/register",
        payload
      );
      return response;
    } catch (err) {
      return err.response;
    }
  };
};

export const GetUs = () => async (dispatch) => {
  await axios
    .get("/user/63b773434f2e71676e855f8a")
    .then((res) => dispatch(getuser(res.data)));
};

// export const setFilteredPets = (filter) => (dispatch) => {
//   dispatch(getMascotas(mascotas));
// };

export const getPets = () => async (dispatch) => {
  try {
    let allPets = await axios("/pets");
    dispatch(getMascotas(allPets.data));
  } catch (error) {
    console.error(error);
  }
};

export const searchPet = (pet) => async (dispatch) => {
  try {
    const petEncontrado = await axios(
      `/pets/by-name?name=${pet}`
    );
    dispatch(getMascotas(petEncontrado.data));
  } catch (error) {
    console.error(error);
  }
};

// export const filterPets = (params) => (dispatch) => {
//   return dispatch(petsFilter(params));
// };

export const filterBack = (filters) => (dispatch) => {
  let params = new URLSearchParams(filters);
  return axios(`/pets?${params}`)
    .then((res) => res.data)
    .then((data) => dispatch(backFilter(data)));
};
