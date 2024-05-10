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

const {isAdmin, isLogged, isLoggedAlready } = require('./middleware')
 
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