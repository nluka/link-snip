const express = require('express');
const database = require('../database');

const router = express.Router();

module.exports = router.get('/', async (req, res) => {
  const urls = await database.urlGetAll();
  res.render('index.ejs', { urls });
});
