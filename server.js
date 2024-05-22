const express = require('express');
require('dotenv').config();
const session = require('express-session');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('./config');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Internship - Notes docs',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3000/',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'Notes-Internship',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Postavite na true ako koristite HTTPS
      maxAge: 3600000, // Trajanje sesije u milisekundama (u ovom primjeru 1 sat)
    },
  })
);
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

const swaggerSpec = swaggerJSDoc(options);

app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerSpec));

const userRouter = require('./routes/userRoutes');
const noteRouter = require('./routes/noteRoutes');
const companyRouter = require('./routes/companyRoutes');

app.use('/', userRouter);
app.use('/', noteRouter);
app.use('/', companyRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('App slusa na portu: ' + port);
});
