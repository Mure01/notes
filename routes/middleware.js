const jwt = require("jsonwebtoken");

const isAdmin = (req, res, next) => {
  if (req.userData?.role == "admin") {
    next();
  } else {
    return res.status(401).send("Ne mozete pristupiti ovoj ruti!");
  }
};

const isLoggedAlready = (req, res, next) => {
  if (req.session.user_logged) {
    return res.status(401).send("Vec ste prijavljeni!");
  } else {
    next();
  }
};

const verifyTokenMiddleware = (req, res, next) => {
  const token = req.headers.authorization || req.session.user_logged;
  if (!token) {
    return res
      .status(401)
      .json({ message: "Niste autorizirani, token nije pronađen." });
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    req.userData = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Niste autorizirani, token nije valjan." });
  }
};

module.exports = { isAdmin, isLoggedAlready, verifyTokenMiddleware };
