var users = [];

const add_user =  (req, res) => {
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

    if (users.find(u => u.username == user.username)) {
      return res.status(400).send({ error: "Username se vec koristi!" });
    }
    if (user.password.length < 8) {
      return res.status(400).send({ error: "Password must be at least 8 characters long" });
  }
    users.push(user);
    res.send(users)
}

const get_users = (req, res) => {
    res.send(users)
}

const edit_user = (req, res) => {
  const username = req.params.username
  const user_editing = users.filter(u => u.username == username )
  if(user_editing.length == 0){
      return res.status(400).send({error:"User not found."})
  } 
  const update = req.body
  user_editing[0].name = update.name;
  user_editing[0].surename = update.surename
  user_editing[0].role = update.role
  user_editing[0].password = update.password
  user_editing[0].company_id = update.company_id
  res.send(user_editing)
}
const delete_user = (req, res) => {
  const username = req.params.username
  const user_deleting = users.filter(u => u.username == username )
  if(user_deleting.length == 0){
      return res.status(400).send({error:"User not found."})
  } 
  users = users.filter(user => user.username != username)
  res.send(users)
}

module.exports = {add_user, get_users, edit_user, delete_user}