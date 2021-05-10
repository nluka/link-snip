const express = require('express');
const Url = require('../../models/Url');
const createError = require('http-errors');
const statusCode = require('../../status-code');

const router = express.Router();

module.exports = router.delete('/', async (req, res, next) => {
  if (req.body.shortUrl === undefined) {
    return next(createError(statusCode.UNPROCESSABLE_ENTITY, 'shortUrl is required.'));
  }

  const url = await Url.findOne({ short: req.body.shortUrl });

  if (url === null) {
    return next(createError(statusCode.UNPROCESSABLE_ENTITY, 'shortUrl does not exist.'));
  }

  await url.deleteOne();

  res.status(statusCode.OK).json({
    full: url.full,
    short: url.short,
    clicks: url.clicks,
  });
});
