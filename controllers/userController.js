const bcrypt = require("bcrypt");

var users = [];

const add_user = (req, res) => {
  let user = req.body;
  if (
    user.name == null ||
    user.name == "" ||
    user.surename == null ||
    user.surename == "" ||
    user.role == null ||
    user.role == "" ||
    user.company_id == null ||
    user.company_id == "" ||
    user.username == null ||
    user.username == "" ||
    user.password == null ||
    user.password == ""
  ) {
    return res.status(400).send({ error: "Molimo vas ispunite sve podatke!" });
  }

  if (users.find((u) => u.username == user.username)) {
    return res.status(400).send({ error: "Username se vec koristi!" });
  }
  if (user.password.length < 8) {
    return res
      .status(400)
      .send({ error: "Lozinka mora biti najmanje 8 karaktera" });
  }

  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      console.error("Greška pri hashiranju lozinke:", err);
      return;
    }
    user.password = hash;
  });

  users.push(user);
  res.send(users);
};

const get_users = (req, res) => {
  res.send(users);
};

const edit_user = (req, res) => {
  const username = req.params.username;
  const index = users.findIndex((u) => u.username === username);
  if (index === -1) {
    return res.status(400).send({ error: "User nije pronadjen." });
  }

  const update = req.body;
  if (update.password.length < 8) {
    return res
      .status(400)
      .send({ error: "Lozinka mora biti najmanje 8 karaktera" });
  }
  users[index] = {
    ...users[index],
    name: update.name,
    surname: update.surname,
    role: update.role,
    password: update.password,
    company_id: update.company_id,
  };

  res.send(users[index]);
};

const delete_user = (req, res) => {
  const username = req.params.username;
  const user_deleting = users.filter((u) => u.username == username);
  if (user_deleting.length == 0) {
    return res.status(400).send({ error: "User nije pronadjen." });
  }
  users = users.filter((user) => user.username != username);
  res.send(users);
};

const get_users_from_company = (req, res) => {
  const company = req.session.user_logged.company_id;
  let users_from_company = users.filter((u) => u.company_id == company);

  res.send(users_from_company);
};

const login_user = (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);

  if (!user) {
    return res.status(401).send("User nije pronadjen.");
  }
  da_li_su_jednake_lozinke = bcrypt.compareSync(password, user.password);
  if (!da_li_su_jednake_lozinke) {
    return res.status(401).send("Lozinka je netacna.");
  }

  user_logged = user;
  req.session.user_logged = user;
  res.send({ "Uspjesno ste se prijavili": user_logged });
};

const logout_user = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).send("Greška prilikom odjave korisnika.");
    } else {
      res.send("Uspješno ste odjavljeni.");
    }
  });
};

module.exports = {
  add_user,
  get_users,
  edit_user,
  delete_user,
  login_user,
  get_users_from_company,
  logout_user,
};
