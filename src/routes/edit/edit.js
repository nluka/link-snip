const express = require('express');
const Url = require('../../models/Url');

const router = express.Router();

module.exports = router.get('/:shortUrl', async (req, res) => {
  const urlToEdit = await Url.findOne({ short: req.params.shortUrl });
  res.render('edit.ejs', { urlToEdit });
});
