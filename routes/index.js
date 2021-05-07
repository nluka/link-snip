const express = require('express');
const urlSchema = require('./models/url');

const router = express.Router();

module.exports = router.get('/', async (req, res) => {
  const urls = await urlSchema.find();
  res.json(urls);
});
