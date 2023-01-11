import React from "react";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import "../styles/globals.css";
import { store } from "../stores/store";
import { Provider } from "react-redux";
import "../styles/NavBar/NavBar.css";
import "../styles/NavBar/DashBoardUser.css";
import axios from 'axios'
axios.defaults.baseURL = "http://localhost:3001/";

const clientId = process.env.AUHT0_CLIENT_ID;

export default function App({ Component, pageProps }) {
  return (
    <UserProvider client_id={clientId}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </UserProvider>
  );
}
