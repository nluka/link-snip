const express = require('express');
const Url = require('../models/Url');
const statusCode = require('../status-code');

const router = express.Router();

module.exports = router.get('/:shortUrl', async (req, res) => {
  const url = await Url.findOne({ short: req.params.shortUrl });
  if (url === null) {
    res.status(statusCode.NOT_FOUND);
  } else {
    res.redirect(url.full);
  }
});
