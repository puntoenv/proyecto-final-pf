import axios from "axios";
import { getPersonajes, getmunicipios, getuser } from "./slice";
import {
  getAllProducts,
  addProductCart,
  getCategories,
  productsFilter,
} from "./products";
import { getMascotas, orderPets } from "./mascotas";
import { getUserId } from "./User";

import Swal from "sweetalert2/dist/sweetalert2.js";

import "sweetalert2/src/sweetalert2.scss";

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

export const PostAdop = (post) => {
  console.log(post)
  return (
    axios
      .post("/pets/post-pet", post)
      .then((res) => {
        // Swal.fire({
        //   title: 'Mascota publicada correctamente',
        //   width: 600,
        //   padding: '3em',
        //   color: '#716add',
        //   // background: '#fff url(/images/trees.png)',
        //   backdrop: `
        //     rgba(0,0,123,0.4)
        //     url("./giphy.gif")
        //     left top
        //     no-repeat
        //   `
        // })
        Swal.fire({
          title: "🐾 Mascota publicada correctamente 🐾",
          icon: "success",
          color: "#437042",
          confirmButtonColor: "#437042",
          confirmButtonAriaLabel: "#437042",

          // background: '#fff url(/images/trees.png)'
        });
        // Swal.fire({
        //   position: "top-end",
        //   icon: "success",
        //   title: "Mascota publicada correctamente",
        //   showConfirmButton: false,
        //   timer: 3000,
        // });
        // alert("Mascota publicada correctamente.");
        return res.data;
      })
      // .then((id) => fetch(`http://localhost:3001/pets/detail/${id}`))
      // .then((response) => response.url.split("/").pop())
      // .then((id) => router.push(`detail/${id}`))
      .catch(
        (err) =>
          Swal.fire({
            title: "Error. No se pudo publicar la mascota",
            icon: "error",
            color: "#437042",
            confirmButtonColor: "#437042",
            confirmButtonAriaLabel: "#437042",

            // background:'#fff url(../backAlerts.png)',
          })
        //   Swal.fire({
        //     position: "top-end",
        //     icon: "error",
        //     title: "No se pudo publicar la mascota",
        //     showConfirmButton: false,
        //     timer: 3000,
        //   })
      )
  );
};

// export const postUser = (payload) => {
//   // return async function(dispatch){
//   //     const response = await axios('http://localhost:3001/cards')
//   //     return dispatch({type: GET_ALL_DOGS, payload: response.data})
//   // }

//   return async function () {
//     try {
//       console.log(payload);
//       const response = await axios.post("/auth/register", payload);
//       return response;
//     } catch (err) {
//       return err.response;
//     }
//   };
// };

export const getUserById = (id) => async (dispatch) => {
  await axios.get(`/user/${id}`).then((res) => {
    console.log(res.data);
    dispatch(getUserId(res.data));
  });
};

/*export const GetUs = (id) =>  (dispatch) => {

   fetch(`http://localhost:3001/user/${id}`).then(res => res.json()).then(res => console.log(res))
};*/

// export const setFilteredPets = (filter) => (dispatch) => {
//   dispatch(getMascotas(mascotas));
// };

// export const filterPets = (params) => (dispatch) => {
//   return dispatch(petsFilter(params));
// };

export const getProducts = (page) => async (dispatch) => {
  try {
    let products = await axios(`/products/${page}`);
    dispatch(getAllProducts(products.data));
  } catch (error) {
    console.error(error);
  }
};

export const searchProduct = (product, page) => async (dispatch) => {
  try {
    let productoEncontrado = await axios(
      `/products/by-name/${page}?name=${product}`
    );
    if (productoEncontrado.data.docs.length === 0) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "No hay productos con ese nombre",
        showConfirmButton: false,
        timer: 1500,
      });
      // Swal.fire({
      //   title: "No hay productos con ese nombre",
      //   icon: "error",
      //   color: "#437042",
      //   confirmButtonColor: "#437042",
      //   confirmButtonAriaLabel: "#437042",
      // });
      // alert("No existen productos con ese nombre.");
      productoEncontrado = await axios("/products/1");
    }
    dispatch(getAllProducts(productoEncontrado.data));
  } catch (error) {
    console.error(error);
  }
};

export const searchPet = (pet, page) => async (dispatch) => {
  try {
    let petEncontrado = await axios(`/pets/by-name/${page}?name=${pet}`);
    if (petEncontrado.data.docs.length === 0) {
      Swal.fire({
        title: "No hay mascotas con ese nombre",
        icon: "error",
        color: "#437042",
        confirmButtonColor: "#437042",
        confirmButtonAriaLabel: "#437042",
      });
      // alert("No hay mascotas con ese nombre.");
      petEncontrado = await axios.get(`/pets/1`);
    }
    dispatch(getMascotas(petEncontrado.data));
  } catch (error) {
    console.error(error);
  }
};

export const getPets = (page, filters) => async (dispatch) => {
  try {
    let res = {};
    if (filters) {
      let query = "?" + new URLSearchParams(filters);
      res = await axios.get(`/pets/${page}/${query}`);
      if (res.data.docs.length === 0) {
        Swal.fire({
          title: "No hay mascotas",
          icon: "error",
          color: "#437042",
          confirmButtonColor: "#437042",
          confirmButtonAriaLabel: "#437042",
        });
        // alert("No hay mascotas");
        res = await axios.get(`/pets/1`);
      }
    } else {
      res = await axios.get(`/pets/${page}`);
    }
    dispatch(getMascotas(res.data));
  } catch (error) {
    console.error(error);
  }
};

export const addCart = (id) => async (dispatch) => {
  try {
    dispatch(addProductCart(id));
  } catch (error) {
    console.error(error);
  }
};

// export const sorts=(payload)=> (dispatch)=>{
//   // console.log(payload)
//   return dispatch(orderPets(payload))

// }

// export const filterPets = (params) => (dispatch) => {
//   return dispatch(petsFilter(params));
// };
export const filterProducts = (input, page) => async (dispatch) => {
  try {
    let products = {};
    if (input.category || input.price) {
      let query = "?" + new URLSearchParams(input);
      products = await axios.get(`/FilteredProducts/${page}/${query}`);
    } else {
      products = await axios.get(`/FilteredProducts/${page}`);
    }
    console.log(products.data.docs);
    dispatch(productsFilter(products.data));
  } catch (error) {}
};

export const allcategories = () => async (dispatch) => {
  try {
    let categories = await axios.get("/categories");
    dispatch(getCategories(categories.data));
  } catch (error) {}
};
