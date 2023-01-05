const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) return res.json("Acceso denegado");

  try {
    const verified = jwt.verify(token, process.env.JWT_TOKEN_SECRET);

    req.user = verified;

    next;
  } catch (error) {
    res.status(400).json(error.message);
  }
};
