import React, { useEffect, useState } from "react";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import "../styles/globals.css";
import { store } from "../stores/store";
import { Provider } from "react-redux";
import "../styles/NavBar/NavBar.css";
import "../styles/NavBar/DashBoardUser.css";
import "../styles/admin/index.css";
import "../styles/admin/Users.css";
import "../styles/user/user.css";
import axios from "axios";
import { addedProduct } from "../controller/functionsCart/addedProduct";
import {
  deleteCart,
  deleteItemOfCart,
  discountOneProduct,
} from "../controller/functionsCart/deleteProduct";
import { getProduct } from "../controller/functionsCart/getProduct";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { QueryClientProvider, QueryClient } from "react-query";

const baseUrl = process.env.NEXT_PUBLIC_URL_BACK;

axios.defaults.baseURL = baseUrl;

const queryClient = new QueryClient();

const clientId = process.env.AUHT0_CLIENT_ID;

export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState([]);
  const [favorite, setFavorite] = useState([]);

  const addToCart = (product) => {
    addedProduct(product, cart, setCart);
  };

  const discountItem = (id) => {
    discountOneProduct(cart, setCart, id);
  };

  const deleteOneProductToCart = (id) => {
    deleteItemOfCart(cart, setCart, id);
  };

  const favorito = {
    AddAgregar: (items) => {
      try {
        favorite.some((i) => i._id === items._id)
          ? Swal.fire({
              title: "Ups! mascota duplicada",
              icon: "error ",
              color: "#437042",
              confirmButtonColor: "#437042",
              confirmButtonAriaLabel: "#437042",
            })
          : Swal.fire({
              title: "Mascota agregada a favoritos",
              icon: "error ",
              color: "#437042",
              confirmButtonColor: "#437042",
              confirmButtonAriaLabel: "#437042",
            }),
          setFavorite([...favorite, items]);
      } catch (e) {
        alert(e, "error en agregar favorito");
      }
    },

    DeletFavori: (item) => {
      const deleFavorito = favorite.filter((ite) => ite._id !== item);
      setFavorite(deleFavorito);
    },
  };

  useEffect(() => {
    const carrito = JSON.parse(localStorage.getItem("cart")) ?? [];
    setCart(carrito);
    const favorito = JSON.parse(localStorage.getItem("favorite")) ?? [];
    setFavorite(favorito);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("favorite", JSON.stringify(favorite));
  }, [cart, favorite]);

  return (
    <UserProvider client_id={clientId}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          {/* <Script src="https://polyfill.io/v3/polyfill.min.js?features=default" />
          <Script
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAefJK2BxtwD4TJT3JP-QG8Ej4YMhRTM-4&callback=initMap&v=weekly"
          /> */}
          <Component
            {...pageProps}
            discountItem={discountItem}
            cart={cart}
            setCart={setCart}
            addToCart={addToCart}
            deleteCart={deleteOneProductToCart}
            deleteAllCart={deleteCart}
            productOfCart={getProduct}
            favorite={favorite}
            setFavorite={setFavorite}
            addAgregar={favorito.AddAgregar}
            DeletFavori={favorito.DeletFavori}
          />
        </Provider>
      </QueryClientProvider>
    </UserProvider>
  );
}
