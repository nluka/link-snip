const express = require('express');
const Url = require('../../models/Url');

const router = express.Router();

module.exports = router.get('/', async (req, res) => {
  const urls = await Url.find();
  const responseJson = [];
  urls.forEach((url) => {
    responseJson.push({
      full: url.full,
      short: url.short,
      clicks: url.clicks,
    });
  });
  res.json(responseJson);
});
