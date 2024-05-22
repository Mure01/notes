const { validationResult } = require("express-validator");
const companyModel = require("../models/Company");

const addCompany = async (req, res) => {
  if (!validationResult(req).isEmpty()) return res.json(validationResult(req));

  var newCompany = req.body;

  const company_exist = await companyModel.findOne({
    unique_name: newCompany.unique_name,
  });
  if (company_exist) {
    return res.send("Kompanija sa tim id-jem vec postoji!");
  }
  const newcompany = new companyModel({
    unique_name: newCompany.unique_name,
    name: newCompany.name,
    address: newCompany.address,
    employed: newCompany.employed,
  });
  newcompany.save();
  res.send(newcompany);
};

const editCompany = async (req, res) => {
  if (!validationResult(req).isEmpty()) return res.json(validationResult(req));

  const id = req.params.id;
  const company_update = await companyModel.findOneAndUpdate(
    { unique_name: id },
    req.body,
    { new: true }
  );
  if (!company_update) {
    return res.send("Nema takve kompanije");
  }

  res.send(company_update);
};

const deleteCompany = async (req, res) => {
  const id = req.params.id;

  const company_delete = await companyModel.findOneAndDelete({
    unique_name: id,
  });

  res.send({ "Uspjesno ste obrisali kompaniju": company_delete });
};

const getCompany = async (req, res) => {
  const id = req.params.id;

  const company = await companyModel.findOne({ unique_name: id });
  if (!company) {
    res.send("Kompanija ne postoji");
  }
  res.send(company);
};

const getAllCompany = async (req, res) => {
  const companies = await companyModel.find();
  res.send(companies);
};

module.exports = {
  addCompany,
  editCompany,
  deleteCompany,
  getCompany,
  getAllCompany
};
