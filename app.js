/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

if (process.env.ENV === 'Test') {
  console.log('This is a test');
  // eslint-disable-next-line no-unused-vars
  const db = mongoose.connect('mongodb://localhost/bookAPI_Test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} else {
  console.log('This is for real');
  // eslint-disable-next-line no-unused-vars
  const db = mongoose.connect('mongodb://localhost/bookAPI-prod', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

const port = process.env.PORT || 3000;

const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('welcome to my Nodemon API.');
});

app.server = app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});

module.exports = app;
