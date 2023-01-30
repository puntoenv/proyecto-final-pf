import axios from "axios";
import { getPersonajes, getmunicipios, getuser } from "./slice";
import {
  getAllProducts,
  addProductCart,
  getCategories,
  products,
  productsFilter,
  getRelatedProducts,
} from "./products";
import { get_User, get_authUser } from "./userAuth";
import {
  getAdminPets,
  getMascotas,
  getRelatedPets,
  typesGet,
  getReported,
} from "./mascotas";
import { getUserId, getAllUsers } from "./User";
import { getSales } from "./sales";
import Swal from "sweetalert2/dist/sweetalert2.js";

import "sweetalert2/src/sweetalert2.scss";

const baseUrl = process.env.NEXT_PUBLIC_URL_BACK;

export const sales = () => async (dispatch) => {
  try {
    let allSales = await axios("/buyHistory");
    dispatch(getSales(allSales.data));
  } catch (error) {
    console.error(error);
  }
};

export const reported = () => async (dispatch) => {
  try {
    let pets = await axios("/pets/reported");
    dispatch(getReported(pets.data));
  } catch (error) {
    console.error(error);
  }
};

export const authUser = (email, name) => async (dispatch) => {
  try {
    const res = await axios.get(`${baseUrl}user-by-email/${email}`);
    const finded = res.data;

    if (!finded.error) {
      dispatch(get_User(finded.user));
      return;
    } else {
      const response = await axios.post(`/create-user`, {
        email,
        name,
      });
      const data = response.data;
      dispatch(get_User(data));
    }
  } catch (error) {
    console.log(error);
  }
};

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

export const PutReview = async (obj, id) => {
  try {
    const res = await axios.put(`/updateProduct/reviews/${id}`, obj);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const PutPets = async (id, obj) => {
  console.log(id, obj);
  try {
    const respo = await axios.put(`/updatePet/${id}`, obj).then((response) => {
      console.log("Update SUCCESS!");
    });
    return respo;
  } catch (e) {
    console.log(e);
  }
};

export const PostAdop = (post) => {
  console.log(post);
  return axios
    .post("/pets/post-pet", post)
    .then((res) => {
      Swal.fire({
        title: "🐾 Mascota publicada correctamente 🐾",
        icon: "success",
        color: "#437042",
        confirmButtonColor: "#437042",
        confirmButtonAriaLabel: "#437042",

        // background: '#fff url(/images/trees.png)'
      });
      return res.data;
    })
    .catch((err) => {
      Swal.fire({
        title: "Error. No se pudo publicar la mascota",
        icon: "error",
        color: "#437042",
        confirmButtonColor: "#437042",
        confirmButtonAriaLabel: "#437042",

        // background:'#fff url(../backAlerts.png)',
      });
    });
};

export const getUserById = (id) => async (dispatch) => {
  await axios.get(`/user/${id}`).then((res) => {
    console.log(res.data);
    dispatch(getUserId(res.data));
  });
};

export const getProducts = (page) => async (dispatch) => {
  try {
    let products = await axios(`/products/${page}`);
    dispatch(getAllProducts(products.data));
  } catch (error) {
    console.error(error);
  }
};

export const getProductsRelated = (id) => async (dispatch) => {
  try {
    let related = await axios.get(`/productsRelated/${id}`);
    //http://localhost:3001/productsRelated/63b6fa9ec2e6c5bd60363236
    dispatch(getRelatedProducts(related.data));
  } catch (error) {
    console.log(error);
  }
};

export const getPetsRelated = (id) => async (dispatch) => {
  try {
    let related = await axios.get(`/petsRelated/${id}`);
    dispatch(getRelatedPets(related.data));
  } catch (error) {
    console.log(error);
  }
};

export const adminProducts = () => async (dispatch) => {
  try {
    let adProducts = await axios("/products");
    dispatch(products(adProducts.data));
  } catch (error) {
    console.error(error);
  }
};

export const adminPets = () => async (dispatch) => {
  try {
    let adPets = await axios("/pets");
    dispatch(getAdminPets(adPets.data));
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
  } catch (error) {
    console.log(error);
  }
};

export const UpdateProduct = async (id, obj) => {
  try {
    const respo = await axios.put(`/updateProduct/${id}`, obj);
    respo
      ? Swal.fire({
          title: "Producto editado con éxito",
          icon: "success",
          color: "#437042",
          confirmButtonColor: "#437042",
          confirmButtonAriaLabel: "#437042",
        })
      : null;
    return respo;
  } catch (e) {
    console.log(e);
  }
};

export const addProduct = async (post) => {
  console.log(post);
  try {
    const res = await axios.post("/products/post", post);
    res
      ? Swal.fire({
          title: "Producto agregado",
          icon: "success",
          color: "#437042",
          confirmButtonColor: "#437042",
          confirmButtonAriaLabel: "#437042",
        })
      : null;
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const allcategories = () => async (dispatch) => {
  try {
    let categories = await axios.get("/categories");
    dispatch(getCategories(categories.data));
  } catch (error) {
    console.log(error);
  }
};

export const getTypes = () => async (dispatch) => {
  try {
    let types = await axios.get("/types");
    dispatch(typesGet(types.data));
  } catch (error) {
    console.log(error);
  }
};

export const allUsers = () => async (dispatch) => {
  try {
    let users = await axios("/users");
    dispatch(getAllUsers(users.data));
  } catch (error) {
    console.log(error);
  }
};
export const updateUser = async (id, obj) => {
  console.log(id, obj);
  try {
    const respo = await axios.put(`/updateProfile/${id}`, obj);
    respo
      ? Swal.fire({
          title: "Usuario editado con éxito",
          icon: "success",
          color: "#437042",
          confirmButtonColor: "#437042",
          confirmButtonAriaLabel: "#437042",
        })
      : null;
    console.log(respo);
    return respo;
  } catch (e) {
    console.log(e);
  }
};

export function getDescription(post) {
  return async function (dispatch) {
    try {
      let query = "?" + new URLSearchParams(post);
      const response = await axios.get(`/descriptionAI${query}`);
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  };
}

export function adoptPet(petId, hidden) {
  return async function (dispatch) {
    return axios
      .put(`/updatePet/${petId}`, hidden)
      .then(() => axios.get(`/adoptEmail/?petId=${petId}&userId=${userId}`))
      .catch((error) => console.log(error));
  };
}
