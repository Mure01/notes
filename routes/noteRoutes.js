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

/** 
 * @swagger
 * /add_note:
 *   post:
 *     summary: Create a new note
 *     description: Create a new note with the provided title, description, and status.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               desc:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [todo, inprogress, done]
 *     responses:
 *       201:
 *         description: Successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the newly created note.
 */
router.post("/add_note", isLogged, add_note);

/** 
 * @swagger
 * /edit_note/{title}:
 *   put:
 *     summary: Edit note
 *     description: Edit a note with the provided title, and update its description and status.
 *     parameters:
 *       - in: path
 *         name: title
 *         schema:
 *           type: string
 *         required: true
 *         description: The title of the note to edit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               desc:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated
 *       404:
 *         description: Note not found
 */
router.put("/edit_note/:title", isLogged, edit_note);

/** 
 * @swagger
 * /delete_note/{title}:
 *   delete:
 *     summary: Delete note
 *     description: Delete a note with the provided title.
 *     parameters:
 *       - in: path
 *         name: title
 *         schema:
 *           type: string
 *         required: true
 *         description: The title of the note to delete
 *     responses:
 *       200:
 *         description: Successfully deleted
 *       404:
 *         description: Note not found
 */
router.delete("/delete_note/:title", isLogged, delete_note);

/** 
 * @swagger
 * /get_note/{title}:
 *   get:
 *     summary: Get note
 *     description: Retrieve a note with the provided title.
 *     parameters:
 *       - in: path
 *         name: title
 *         schema:
 *           type: string
 *         required: true
 *         description: The title of the note to retrieve
 *     responses:
 *       200:
 *         description: A single note object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       404:
 *         description: Note not found
 */
router.get("/get_note/:title", isLogged, get_note);

/**
 * @swagger
 * /get_all_notes:
 *   get:
 *     summary: Get all notes
 *     description: Retrieve a list of all notes.
 *     responses:
 *       200:
 *         description: A list of notes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 */
router.get("/get_all_notes", isLogged, get_all_notes);

/**
 * @swagger
 * /get_all_notes_company:
 *   get:
 *     summary: Get all notes for a company
 *     description: Retrieve a list of all notes belonging to a company.
 *     responses:
 *       200:
 *         description: A list of notes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 */
router.get("/get_all_notes_company", isAdmin, isLogged, get_all_notes_company);

module.exports = router;
