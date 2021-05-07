const express = require('express');
const Url = require('../models/Url');

const router = express.Router();

module.exports = router.post('/', async (req, res) => {
  // TODO: check if shortUrl already exists and return error if it does

  // eslint-disable-next-line
  console.log(req.body.fullUrl, req.body.shortUrl);

  const newUrl = new Url({
    full: req.body.fullUrl,
    short: req.body.shortUrl,
  });

  await newUrl.save();

  res.redirect('/');
});
