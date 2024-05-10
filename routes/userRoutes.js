const express = require("express");
const router = express.Router();
const {add_user, get_users, edit_user, delete_user} = require('../controllers/userController')

router.post("/add_user", add_user);
router.get("/get_users", get_users);
router.put("/edit_user/:username", edit_user)
router.delete("/delete_user/:username", delete_user)

module.exports = router;
