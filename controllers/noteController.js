const { validationResult } = require('express-validator');
const noteModel = require('../models/Note');

const addNote = async (req, res) => {
  if (!validationResult(req).isEmpty()) return res.json(validationResult(req));

  var newNote = req.body;

  newNote = {
    ...newNote,
    user: req.userData.id,
    company_id: req.userData.company_id,
  };

  const newNoteM = new noteModel({ ...newNote });
  await newNoteM.save();
  res.send(newNoteM);
};

const editNote = async (req, res) => {
  if (!validationResult(req).isEmpty()) return res.json(validationResult(req));

  const id = req.params.title;
  const note_update = await noteModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!note_update) {
    return res.send('Nema takve zabiljeske');
  }

  res.send(note_update);
};

const deleteNote = async (req, res) => {
  const id = req.params.title;
  const note_delete = await noteModel.findByIdAndDelete(id);
  if (!note_delete) {
    res.send('Vasa zabiljeska ne postoji!');
  }
  res.send({ 'Uspjesno ste obrisali zabiljesku': note_delete });
};

const getNote = async (req, res) => {
  const id = req.params.title;

  const note = await noteModel.findById(id);
  if (!note) {
    res.send('Zabiljeska ne postoji');
  }
  res.send(note);
};

const getAllNotes = async (req, res) => {
  const id_usera = req.userData._id;

  const notes_usera = await noteModel.find({ user: id_usera });
  if (notes_usera.length < 1) {
    return res.send('Nemate zabiljeski');
  }
  res.send(notes_usera);
};

const getAllNotesCompany = async (req, res) => {
  const company_id = req.userData.company_id;

  const notes_company = await noteModel
    .find({ company_id: company_id })
    .populate('user');
  if (notes_company.length < 1) {
    return res.send('Vasa kompanija nema zabiljeski');
  }
  res.send(notes_company);
};

module.exports = {
  addNote,
  editNote,
  deleteNote,
  getNote,
  getAllNotes,
  getAllNotesCompany,
};
