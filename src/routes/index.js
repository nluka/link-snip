const { default: axios } = require('axios');
const express = require('express');
const { BASE_URL } = require('../constants');
const Url = require('../models/Url');

const router = express.Router();

module.exports = router.get('/', async (req, res) => {
  const urls = await Url.find();
  res.render('index.ejs', { urls });
});

module.exports = router.post('/', async (req, res) => {
  try {
    await axios.post(BASE_URL + 'api/create/', req.body);
  } catch (error) {
    // eslint-disable-next-line no-undef
    console.error(error);
  }
  res.redirect(BASE_URL);
});
