const express = require('express');
const Url = require('../../models/Url');
const createError = require('http-errors');
const statusCode = require('../../status-code');

const router = express.Router();

module.exports = router.patch('/', async (req, res, next) => {
  if (req.body.shortUrl === undefined) {
    return next(createError(statusCode.UNPROCESSABLE_ENTITY, 'shortUrl is required.'));
  }

  let url = await Url.findOne({ short: req.body.shortUrl });

  if (url === null) {
    return next(createError(statusCode.UNPROCESSABLE_ENTITY, 'shortUrl does not exist.'));
  }
  if (req.body.newShortUrl === undefined && req.body.newFullUrl === undefined) {
    return next(
      createError(statusCode.BAD_REQUEST, 'Neither newShortUrl nor newFullUrl were provided, at least 1 is required.')
    );
  }

  if (req.body.newShortUrl !== undefined) {
    url.short = req.body.newShortUrl;
  }
  if (req.body.newFullUrl !== undefined) {
    url.full = req.body.newFullUrl;
  }
  // if (req.body.newShortUrl !== undefined || req.body.newFullUrl !== undefined) {
  //   url.clicks = 0;
  // }

  await url.save();

  res.status(statusCode.OK).json({
    full: url.full,
    short: url.short,
    clicks: url.clicks,
  });
});
