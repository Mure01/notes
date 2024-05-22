const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { isAdmin, verifyTokenMiddleware } = require("./middleware");
const {
  deleteCompany,
  getAllCompany,
  getCompany,
  editCompany,
  addCompany,
} = require("../controllers/companyController");

router.get("/companies", (req, res) => {
  res.send("Company");
});

/**
 * @swagger
 * /add_company:
 *   post:
 *     summary: Stvaranje nove kompanije
 *     description: Stvaranje nove kompanije s pruženim id, nazivom, brojem zaposlenih i adresom.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID kompanije
 *               name:
 *                 type: string
 *                 description: Naziv kompanije
 *               employed:
 *                 type: integer
 *                 description: Broj zaposlenih
 *               address:
 *                 type: string
 *                 description: Adresa kompanije
 *     responses:
 *       '201':
 *         description: Uspješno stvoreno
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID novo stvorene kompanije
 */
router.post(
  "/companies",
  [
    check("unique_name", "Id kompanije je obavezan").exists().not().isEmpty(),
    check("name", "Naziv kompanije je obavezan").exists().not().isEmpty(),
    check("employed", "Broj uposlenih kompanije je obavezan")
      .exists()
      .not()
      .isEmpty(),
    check("address", "Adresa kompanije je obavezna").exists().not().isEmpty(),
  ],
  addCompany
);

/**
 * @swagger
 * /edit_company/{id}:
 *   put:
 *     summary: Edit company
 *     description: Edit a company with the provided id.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the company to edit
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 address:
 *                   type: string
 *                 employed:
 *                   type: integer
 *     responses:
 *       '200':
 *         description: Kompanija uspješno uređena
 *       '401':
 *         description: Neuspješna autorizacija
 */
router.put("/companies/:id", verifyTokenMiddleware, isAdmin, editCompany);

/**
 * @swagger
 * /get_company/{id}:
 *   get:
 *     summary: Dohvaćanje informacija o kompaniji
 *     description: Dohvaćanje informacija o određenoj kompaniji.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID kompanije koju dohvaćate
 *     responses:
 *       '200':
 *         description: Uspješno dohvaćene informacije
 *       '404':
 *         description: Kompanija nije pronađena
 */
router.get("/companies/:id", getCompany);

/**
 * @swagger
 * /get_all_company:
 *   get:
 *     summary: Dohvaćanje svih kompanija
 *     description: Dohvaćanje svih kompanija registriranih u sustavu.
 *     responses:
 *       '200':
 *         description: Uspješno dohvaćene sve kompanije
 *       '404':
 *         description: Nema registriranih kompanija
 */
router.get("/allCompanies", getAllCompany);

/**
 * @swagger
 * /delete_company/{id}:
 *   delete:
 *     summary: Brisanje kompanije
 *     description: Brisanje određene kompanije iz sustava.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID kompanije koju brišete
 *     responses:
 *       '200':
 *         description: Kompanija uspješno obrisana
 *       '401':
 *         description: Neuspješna autorizacija
 */
router.delete(
  "/companies/:id",
  verifyTokenMiddleware,
  isAdmin,
  deleteCompany
);

module.exports = router;
