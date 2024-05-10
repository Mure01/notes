const express = require("express");
const router = express.Router();

const {
  add_user,
  get_users,
  edit_user,
  delete_user,
  login_user,
  get_users_from_company,
  logout_user,
} = require("../controllers/userController");

const isAdmin = (req, res, next) => {
  if (req.session.user_logged?.role == "admin") {
    next();
  } else {
    return res.status(401).send("Ne mozete pristupiti ovoj ruti!");
  }
};

const isLogged = (req, res, next) => {
  if (req.session.user_logged) {
    next();
  } else {
    return res.status(401).send("Prijavite se!");
  }
};
const isLoggedAlready = (req, res, next) => {
  if (req.session.user_logged) {
    return res.status(401).send("Vec ste prijavljeni!");
  } else {
    next();
  }
};

router.post("/add_user", add_user);
router.get("/get_users", get_users);
router.get(
  "/get_users_from_company",
  isAdmin,
  isLogged,
  get_users_from_company
);
router.put("/edit_user/:username", isLogged, edit_user);
router.delete("/delete_user/:username", isLogged, delete_user);
router.post("/login_user", isLoggedAlready, login_user);
router.post("/logout_user", isLogged, logout_user);

module.exports = router;