const express = require('express');
const database = require('../../database');

const router = express.Router();

module.exports = router.get('/:short', async (req, res) => {
  const url = await database.urlGetFromShort(req.params.short);
  res.render('edit.ejs', { url });
});
