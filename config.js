const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.LINK_BAZE;

mongoose
  .connect(mongoURI)
  .then(console.log('connected succesfuly'))
  .catch((err) => console.log(err));

module.exports = { mongoose };
