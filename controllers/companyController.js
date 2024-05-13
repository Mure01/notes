const { validationResult } = require("express-validator");

 company = [];

const add_company = (req, res) => {
  if (!validationResult(req).isEmpty()) return res.json(validationResult(req));

  var newCompany = req.body;

  const company_exist = company.find((c) => c.id == newCompany.id);
  if (company_exist) {
    return res.send("Kompanija sa tim id-jem vec postoji!");
  }
  company.push(newCompany);
  res.send(company);
};

const edit_company = (req, res) => {
  if (!validationResult(req).isEmpty()) return res.json(validationResult(req));

  const id = req.params.id;

  const index = company.findIndex((c) => c.id === id);
  if (index < 0) {
    return res.send("Nema takve kompanije");
  }

  company[index] = {
    ...company[index],
    ...req.body,
  };
  res.send(company);
};

const delete_company = (req, res) => {
  const id = req.params.id;

  const index = company.findIndex((c) => c.id == id);
  if (index < 0) {
    res.send("Vasa kompanija ne postoji!");
  }
  company.splice(index, 1);
  res.send({ "Uspjesno ste obrisali kompaniju": company });
};

const get_company = (req, res) => {
  const id = req.params.id;

  const com = company.find((k) => k.id === id);
  if (!com) {
    res.send("Kompanija ne postoji");
  }
  res.send(com);
};

const get_all_company = (req, res) => {
  res.send(company);
};

module.exports = {
  add_company,
  edit_company,
  delete_company,
  get_company,
  get_all_company,
};
