const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const {
  logoutUser,
  loginUser,
  deleteUser,
  editUser,
  userCompany,
  getUserUsername,
  getUsers,
  addUser,
} = require('../controllers/userController');

const {
  isAdmin,
  isLoggedAlready,
  verifyTokenMiddleware,
} = require('./middleware');

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               surename:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [admin, user]
 *               company_id:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successfully created
 */
router.post(
  '/user',
  [
    check('name', 'Ime je obavezno!').exists().not().isEmpty(),
    check('surename', 'Prezime je obavezno').exists().not().isEmpty(),
    check('username', 'Username je obavezan!').exists().not().isEmpty(),
    check('password', 'Password zahtjeva minimalno 8 znakova!')
      .exists()
      .not()
      .isEmpty()
      .isLength({ min: 8 }), // Corrected chaining
    check('role', 'Uloga moze biti samo admin ili user')
      .exists()
      .not()
      .isEmpty()
      .isIn(['admin', 'user']),
    check('company_id', 'Kompanija je obavezna!').exists().not().isEmpty(),
  ],
  addUser
);

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         surname:
 *           type: string
 *         username:
 *           type: string
 *         password:
 *           type: string
 *         role:
 *           type: string
 *           enum: [admin, user]
 *         company_id:
 *           type: string
 * /user:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users.
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/user', getUsers);

/**
 * @swagger
 * /user/{username}:
 *   get:
 *     summary: Get user
 *     description: Retrieve a user with the provided username.
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: The username of the user to retrieve
 *     responses:
 *       200:
 *         description: A single user object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Note not found
 */
router.get(
  '/user/:username',
  [
    check('username', 'Username je obavezan').exists().not().isEmpty(),
    check('password', 'Password je obavezan').exists().not().isEmpty(),
  ],
  verifyTokenMiddleware,
  getUserUsername
);

/**
 * @swagger
 * /userCompany:
 *   get:
 *     summary: Get users from company
 *     description: Retrieve a list of users belonging to a company.
 *     security:
 *       - session: []
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#components/schemas/User'
 */
router.get('/userCompany', verifyTokenMiddleware, isAdmin, userCompany);

/**
 * @swagger
 * /user/{username}:
 *   put:
 *     summary: Update user details
 *     description: Update details of a user with the provided username.
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: The username of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                name:
 *                    type: string
 *                surename:
 *                    type: string
 *                company_id:
 *                    type: string
 *                password:
 *                    type: string
 *     responses:
 *       200:
 *         description: Successfully updated
 *       404:
 *         description: User not found
 */
router.put(
  '/user/:username',
  [
    check('name', 'Ime ne moze biti prazno!').not().isEmpty(),
    check('surename', 'Prezime ne moze biti prazno!').not().isEmpty(),
    check('password', 'Password zahtjeva minimalno 8 znakova!')
      .not()
      .isEmpty()
      .isLength({ min: 8 }), // Corrected chaining
    check('role', 'Uloga moze biti samo admin ili user')
      .not()
      .isEmpty()
      .isIn(['admin', 'user']),
    check('company_id', 'Kompanija je obavezna!').not().isEmpty(),
  ],
  verifyTokenMiddleware,
  editUser
);

/**
 * @swagger
 * /user/{username}:
 *   delete:
 *     summary: Delete user
 *     description: Delete a user with the provided username.
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: The username of the user to delete
 *     responses:
 *       200:
 *         description: Successfully deleted
 *       404:
 *         description: User not found
 */
router.delete('/user/:username', verifyTokenMiddleware, deleteUser);

/**
 * @swagger
 * /loginUser:
 *   post:
 *     summary: Log in user
 *     description: Log in with provided credentials.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully logged in
 *       401:
 *         description: Unauthorized - Invalid credentials
 */
router.post('/loginUser', isLoggedAlready, loginUser);

/**
 * @swagger
 * /logoutUser:
 *   post:
 *     summary: Log out user
 *     description: Log out the currently logged-in user.
 *     responses:
 *       200:
 *         description: Successfully logged out
 */
router.post('/logoutUser', verifyTokenMiddleware, logoutUser);

module.exports = router;
