const express = require("express");
const router = express.Router();
const { isAdmin, isLogged } = require("./middleware");
const {
  add_note,
  edit_note,
  delete_note,
  get_all_notes,
  get_all_notes_company,
  get_note,
} = require("../controllers/noteController");

router.get("/notes", (req, res) => {
  res.send("Notes");
});

router.post("/add_note", isLogged, add_note);
router.put("/edit_note/:title", isLogged, edit_note);
router.delete("/delete_note/:title", isLogged, delete_note);
router.get("/get_note/:title", isLogged, get_note);
router.get("/get_all_notes", isLogged, get_all_notes);
router.get("/get_all_notes_company", isAdmin, isLogged, get_all_notes_company);


module.exports = router;
