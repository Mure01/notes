const { validationResult } = require("express-validator");
const noteModel = require('../models/Note')
var notes = [];

const add_note = async (req, res) => {
  if (!validationResult(req).isEmpty()) return res.json(validationResult(req));

  var newNote = req.body;

  newNote = {
    ...newNote,
    user: req.session.user_logged._id,
    company_id: req.session.user_logged.company_id,
  };

  const newNoteM = new noteModel({...newNote})
  await newNoteM.save()
  res.send(newNoteM);
};

const edit_note = async (req, res) => {
  if (!validationResult(req).isEmpty()) return res.json(validationResult(req));

  const id = req.params.title;

  const note_update = await noteModel.findByIdAndUpdate(id, req.body, {new: true})
  if (!note_update) {
    return res.send("Nema takve zabiljeske");
  }

  res.send(note_update);
};

const delete_note = async (req, res) => {
  const id = req.params.title;
  const note_delete = await noteModel.findByIdAndDelete(id)
  if (!note_delete) {
    res.send("Vasa zabiljeska ne postoji!");
  }
  res.send({ "Uspjesno ste obrisali zabiljesku": note_delete });
};

const get_note = async  (req, res) => {
  const id = req.params.title;

  const note = await noteModel.findById(id) 
  if (!note) {
    res.send("Zabiljeska ne postoji");
  }
  res.send(note);
};

const get_all_notes = async (req, res) => {
  const id_usera = req.session.user_logged._id;

  const notes_usera = await noteModel.find({user: id_usera})
  if (notes_usera.length < 1) {
    return res.send("Nemate zabiljeski");
  }
  res.send(notes_usera);
};

const get_all_notes_company = async (req, res) => {
  const company_id = req.session.user_logged.company_id;

  const notes_company = await noteModel.find({company_id: company_id});
  if (notes_company.length < 1) {
    return res.send("Vasa kompanija nema zabiljeski");
  }
  res.send(notes_company);
};

module.exports = {
  add_note,
  edit_note,
  delete_note,
  get_all_notes,
  get_all_notes_company,
  get_note,
};
