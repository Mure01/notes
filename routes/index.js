const express = require("express");
const router = express.Router();
const {add_user, get_users, edit_user} = require('../controllers/userController')

router.get("/", (req, res) => {
  res.send("Helloo world!!!!");
});

module.exports = router;
