const express = require('express');
const database = require('../../database');
const STATUS_CODES = require("nluka-http-response-status-codes");

const router = express.Router();

router.get('/', async (req, res) => {
  const urls = await database.urlGetAll();
  res.status(STATUS_CODES.OK).json(urls);
});

module.exports = router;
