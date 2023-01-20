import React, { useEffect, useState } from "react";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import "../styles/globals.css";
import { store } from "../stores/store";
import { Provider } from "react-redux";
import "../styles/NavBar/NavBar.css";
import "../styles/NavBar/DashBoardUser.css";
import "../styles/admin/index.css";
import "../styles/admin/Users.css";
import axios from "axios";
import { ContextProvider } from "../contexts/ContextProvider";
import { registerLicense } from "@syncfusion/ej2-base";
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
registerLicense(
  "Mgo+DSMBaFt/QHRqVVhjVFpFdEBBXHxAd1p/VWJYdVt5flBPcDwsT3RfQF5jSH9Sd0RgUXted3xWRg==;Mgo+DSMBPh8sVXJ0S0J+XE9HflRDX3xKf0x/TGpQb19xflBPallYVBYiSV9jS31Td0RiWH5deHBVQWlUUQ==;ORg4AjUWIQA/Gnt2VVhkQlFadVdJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxQdkRiWH5fc3xRRmhdVEQ=;OTIxODgyQDMyMzAyZTM0MmUzMGp0cERjMktTYVYzUDJJVHdBSi96Tm5UODJDSVlnTHRHLzBpQjFBaXNoZ0E9;OTIxODgzQDMyMzAyZTM0MmUzMFZXQmQ2WkZUMXNUa3d0cW15eFN3ekU5ZDFUSjZWT2VQSHc4YXA5d2ZJV0k9;NRAiBiAaIQQuGjN/V0Z+WE9EaFxKVmJLYVB3WmpQdldgdVRMZVVbQX9PIiBoS35RdUViWH5fcXddQmBUWEJ2;OTIxODg1QDMyMzAyZTM0MmUzMEpUVmNCR2NjWmpIZTRxbzZTRHNybXEyN2JNb3NKODNDMFdieUhFNWtNZFU9;OTIxODg2QDMyMzAyZTM0MmUzME5nSjJYRkxVZGxaYlJSenpLd0lTbGo1bEJuS2h2N3RvZTRlUVZaMVVnZ009;Mgo+DSMBMAY9C3t2VVhkQlFadVdJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxQdkRiWH5fc3xRRmlbUUQ=;OTIxODg4QDMyMzAyZTM0MmUzMFlwMWJGOFB5TUtLMFJ2eGFTWWNBUTltTTlyM3Y1OGg3SVpBY1JuUXFYcDg9;OTIxODg5QDMyMzAyZTM0MmUzMEQxZm93WG1rMjNpd25yQUNScFFMclh2cStoMEhwdWNPcEc1R2p5aDBTeVU9;OTIxODkwQDMyMzAyZTM0MmUzMEpUVmNCR2NjWmpIZTRxbzZTRHNybXEyN2JNb3NKODNDMFdieUhFNWtNZFU9"
);

axios.defaults.baseURL = `http://localhost:3001/`;

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
    <ContextProvider>
      <UserProvider client_id={clientId}>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
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
    </ContextProvider>
  );
}
