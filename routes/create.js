const express = require('express');
const urlSchema = require('./models/url');

const router = express.Router();

module.exports = router.post('/create', async (req, res) => {
  const requestBody = req.body;

  // TODO: check if shortUrl already exists and return error if it does

  await urlSchema.create({
    full: requestBody.fullUrl,
    short: requestBody.shortUrl,
  });

  res.redirect('/');
});
