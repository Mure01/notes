const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { isAdmin, isLogged } = require("./middleware");
const {
  add_company,
  edit_company,
  get_company,
  delete_company,
  get_all_company,
} = require("../controllers/companyController");

router.get("/company", (req, res) => {
  res.send("Company");
});

router.post(
  "/add_company",
  [
    check("id", "Id kompanije je obavezan").exists().not().isEmpty(),
    check("name", "Naziv kompanije je obavezan").exists().not().isEmpty(),
    check("employed", "Broj uposlenih kompanije je obavezan")
      .exists()
      .not()
      .isEmpty(),
    check("address", "Adresa kompanije je obavezna").exists().not().isEmpty(),
  ],
  isAdmin,
  isLogged,
  add_company
);
router.put("/edit_company/:id", isAdmin, isLogged, edit_company);
router.get("/get_company/:id", get_company);
router.get("/get_all_company", get_all_company);
router.delete("/delete_company/:id", isAdmin, isLogged, delete_company);

module.exports = router;
