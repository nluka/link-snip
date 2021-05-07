const express = require('express');
const mongoose = require('mongoose');
const urlSchema = require('./models/url');
const cors = require('cors');
const app = express();

mongoose.connect('mongodb://localhost/db', {
  // TODO: fix connection error
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// eslint-disable-next-line no-unused-vars
app.get('/', async (req, res) => {
  const urls = await urlSchema.find();
  console.log(urls);
});

app.post('/create', async (req, res) => {
  const requestBody = req.body;

  // TODO: check if shortUrl already exists and return error if it does

  await urlSchema.create({
    full: requestBody.fullUrl,
    short: requestBody.shortUrl
  });

  res.redirect('/');
});

// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000;

app.listen(port);
