const { validationResult } = require("express-validator");

var notes = [];

const add_note = (req, res) => {
  if (!validationResult(req).isEmpty()) return res.json(validationResult(req));

  var newNote = req.body;

  newNote = {
    ...newNote,
    user_id: req.session.user_logged.username,
    company_id: req.session.user_logged.company_id,
  };
  const notes_exist = notes.find(
    (n) => n.title == newNote.title && n.user_id == newNote.user_id
  );
  if (notes_exist) {
    return res.send("Zabiljeska sa tim naslovom vec postoji!");
  }
  notes.push(newNote);
  res.send(notes);
};

const edit_note = (req, res) => {
  if (!validationResult(req).isEmpty()) return res.json(validationResult(req));

  const title = req.params.title;

  const index = notes.findIndex((n) => n.title === title);
  if (index < 0) {
    return res.send("Nema takve zabiljeske");
  }

  notes[index] = {
    ...notes[index],
    ...req.body,
  };
  res.send(notes);
};

const delete_note = (req, res) => {
  const title = req.params.title;
  const username = req.session.user_logged.username;

  const index = notes.findIndex(
    (n) => n.title == title && n.user_id == username
  );
  if (index < 0) {
    res.send("Vasa zabiljeska ne postoji!");
  }
  notes.splice(index, 1);
  res.send({ "Uspjesno ste obrisali zabiljesku": notes });
};

const get_note = (req, res) => {
  const title = req.params.title;
  const username = req.session.user_logged.username;

  const note = notes.find((n) => n.title === title && n.user_id === username);
  if (!note) {
    res.send("Zabiljeska ne postoji");
  }
  res.send(note);
};

const get_all_notes = (req, res) => {
  const username = req.session.user_logged.username;

  const notes_usera = notes.filter((n) => n.user_id == username);
  if (notes_usera.length < 1) {
    return res.send("Nemate zabiljeski");
  }
  res.send(notes_usera);
};

const get_all_notes_company = (req, res) => {
  const company_id = req.session.user_logged.company_id;

  const notes_company = notes.filter((n) => n.company_id == company_id);
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
