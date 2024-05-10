const express = require("express");
require("dotenv").config();
const session = require('express-session');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'Internship Walter Code',
  resave: false,
  saveUninitialized: true
}))


const indexRouter = require("./routes/index");
const userRouter = require("./routes/userRoutes");

app.use("/", indexRouter);
app.use("/", userRouter);

const port = process.env.port;

app.listen(port, () => {
  console.log("App slusa na portu: " + port);
});
