const express = require('express');
const database = require('../../database');
const STATUS_CODES = require('../../utilities/status-codes');

const router = express.Router();

module.exports = router.get('/:short', async (req, res) => {
  const short = req.params.short;

  const actual = await database.urlGetActualFromShort(short);

  if (actual === null) {
    res.status(STATUS_CODES.NOT_FOUND);
  } else {
    await database.urlIncrementClicks(short);
    res.redirect(actual);
  }
});
