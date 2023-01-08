import "../styles/globals.css";
import { store } from "../stores/store";
import { Provider } from "react-redux";
import "../styles/NavBar/NavBar.css";
import "../styles/NavBar/DashBoardUser.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";

const clientId = process.env.AUHT0_CLIENT_ID;

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <UserProvider client_id={clientId}>
        <Component {...pageProps} />
      </UserProvider>
    </Provider>
  );
}
