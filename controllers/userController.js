const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const userModel = require('../models/User');
const companyModel = require('../models/Company');
const jwt = require('jsonwebtoken');

const addUser = async (req, res) => {
  if (!validationResult(req).isEmpty()) return res.json(validationResult(req));

  let user = req.body;
  const company = await companyModel.findOne({ unique_name: user.company_id });
  const userExist = await userModel.findOne({ username: user.username });

  if (company) {
    company.employed += 1;
    await company.save();
  } else {
    return res
      .status(400)
      .json({ status: 400, error: 'Nije pronadjena kompanija!' });
  }
  if (userExist) {
    return res
      .status(400)
      .json({ status: 400, error: 'Korisničko ime se već koristi!' });
  }

  const salt = bcrypt.genSaltSync();
  const savepass = bcrypt.hashSync(user.password, salt);

  const newUser = new userModel({
    username: user.username,
    password: savepass,
    name: user.name,
    surename: user.surename,
    role: user.role,
    company_id: company._id,
  });
  await newUser.save();
  res.send(newUser);
};

const getUsers = async (req, res) => {
  const users_baza = await userModel.find();
  res.send(users_baza);
};

const editUser = async (req, res) => {
  if (!validationResult(req).isEmpty()) return res.json(validationResult(req));

  const username = req.params.username;
  const salt = bcrypt.genSaltSync();
  const savepass = bcrypt.hashSync(req.body.password, salt);

  const updateData = { ...req.body, password: savepass };
  const user = await userModel.findOneAndUpdate(
    { username: username },
    updateData,
    { new: true }
  );
  if (!user) {
    return res.status(400).send({ error: 'User nije pronadjen.' });
  }
  res.send(user);
};

const deleteUser = async (req, res) => {
  const username = req.params.username;
  const user_deleting = await userModel.findOneAndDelete({
    username: username,
  });
  if (!user_deleting) {
    return res.status(400).send({ error: 'User nije pronadjen.' });
  }

  res.send(user_deleting);
};

const userCompany = async (req, res) => {
  const company = req.userData.company_id;
  const users_from_company = await userModel.find({ company_id: company });

  res.send(users_from_company);
};

const getUserUsername = async (req, res) => {
  const username = req.params.username;
  const user = await userModel.findOne({ username: username });
  res.send(user);
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.findOne({ username: username });

  if (!user) {
    return res.status(401).send('User nije pronadjen.');
  }

  const da_li_su_jednake_lozinke = bcrypt.compareSync(password, user.password);
  if (!da_li_su_jednake_lozinke) {
    return res.status(401).send('Lozinka je netacna.');
  }
  const payload = {
    username: user.username,
    id: user._id,
    role: user.role,
    company_id: user.company_id,
    name: user.name,
    surename: user.surename,
  };
  const token = jwt.sign(payload, process.env.TOKEN_SECRET_KEY, {
    expiresIn: '1h',
  });
  req.session.user_logged = token;
  res.send({ token: token });
};

const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).send('Greška prilikom odjave korisnika.');
    } else {
      res.send('Uspješno ste odjavljeni.');
    }
  });
};

module.exports = {
  addUser,
  editUser,
  deleteUser,
  getUserUsername,
  getUsers,
  userCompany,
  loginUser,
  logoutUser,
};
