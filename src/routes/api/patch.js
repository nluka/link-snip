const express = require('express');
const Url = require('../../models/Url');
const createError = require('http-errors');
const statusCode = require('../../status-code');
const { doesShortUrlExist } = require('../../util');

const router = express.Router();

module.exports = router.patch('/', async (req, res, next) => {
  if (req.body.shortUrl === undefined) {
    return next(createError(statusCode.UNPROCESSABLE_ENTITY, 'shortUrl is required.'));
  }

  let url = await Url.findOne({ short: req.body.shortUrl });

  if (url === null) {
    return next(createError(statusCode.UNPROCESSABLE_ENTITY, 'shortUrl does not exist.'));
  }
  if (req.body.newName === undefined && req.body.newShortUrl === undefined && req.body.newFullUrl === undefined) {
    return next(
      createError(
        statusCode.BAD_REQUEST,
        'No new values for newName, newShortUrl or newFullUrl were provided. At least 1 new value is required.'
      )
    );
  }
  if (req.body.newShortUrl !== undefined && (await doesShortUrlExist(req.body.shortUrl))) {
    return next(createError(statusCode.CONFLICT, 'shortUrl already exists.'));
  }

  if (req.body.newName !== undefined) {
    url.name = req.body.newName;
  }
  if (req.body.newShortUrl !== undefined) {
    url.short = req.body.newShortUrl;
  }
  if (req.body.newFullUrl !== undefined) {
    url.full = req.body.newFullUrl;
  }

  await url.save();

  res.status(statusCode.OK).json({
    name: url.name,
    full: url.full,
    short: url.short,
    clicks: url.clicks,
  });
});
