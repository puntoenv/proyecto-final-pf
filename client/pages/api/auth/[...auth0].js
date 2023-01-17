import { handleAuth, handleLogout, handleLogin } from "@auth0/nextjs-auth0";

export default handleAuth({
  login: handleLogin({
    returnTo: "http://localhost:3000/home",
  }),
  logout: handleLogout({
    returnTo: "http://localhost:3000/home",
  }),
});
