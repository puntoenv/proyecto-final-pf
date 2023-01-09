// import { handleAuth } from "@auth0/nextjs-auth0";

import { handleAuth, handleCallback, handleLogout } from "@auth0/nextjs-auth0";

const afterCallback = (req, res, session, state) => {
  console.log(req);
  if (!session.user.isAdmin) {
    res.setHeader("Location", "/home");
  }
  return session;
};

export default handleAuth({
  async callback(req, res) {
    try {
      await handleCallback(req, res, { afterCallback });
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  },
  logout: handleLogout({ returnTo: "http://localhost:3000/home" }),
});
