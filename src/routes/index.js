const express = require('express');
const Url = require('../models/Url');

const router = express.Router();

module.exports = router.get('/', async (req, res) => {
  const urls = await Url.find();
  res.render('index.ejs', { urls });
});
