import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { store } from "../stores/store";
import { Provider } from "react-redux";

export default function App({ Component, pageProps, session }) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}
