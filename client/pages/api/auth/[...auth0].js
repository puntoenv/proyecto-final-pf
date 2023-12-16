import { handleAuth, handleLogout, handleLogin } from "@auth0/nextjs-auth0";

export default handleAuth({
  login: handleLogin({
    returnTo: "https://proyecto-final-pf.vercel.app/home",
  }),
  logout: handleLogout({
    returnTo: "https://proyecto-final-pf.vercel.app/home",
  }),
});
