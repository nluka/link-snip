const express = require('express');
const axios = require('axios').default;
// const Url = require('../models/Url');
const { BASE_URL } = require('../constants');

const router = express.Router();

module.exports = router.post('/', async (req, res) => {
  try {
    await axios.post(BASE_URL + 'api/create/', req.body);
  } catch (error) {
    // eslint-disable-next-line no-undef
    console.error(error);
  }
  res.redirect(BASE_URL);
});
