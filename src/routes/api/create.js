const express = require('express');
const Url = require('../../models/Url');
const createError = require('http-errors');
const statusCode = require('../../status-code');
const { doesShortUrlExist } = require('../../util');

const router = express.Router();

module.exports = router.post('/', async (req, res, next) => {
  if (req.body.name === undefined) {
    return next(
      createError(statusCode.UNPROCESSABLE_ENTITY, 'name is required.')
    );
  }
  if (req.body.fullUrl === undefined) {
    return next(
      createError(statusCode.UNPROCESSABLE_ENTITY, 'fullUrl is required.')
    );
  }
  if (req.body.shortUrl === undefined) {
    return next(
      createError(statusCode.UNPROCESSABLE_ENTITY, 'shortUrl is required.')
    );
  }
  if (await doesShortUrlExist(req.body.shortUrl)) {
    return next(createError(statusCode.CONFLICT, 'shortUrl already exists.'));
  }

  const newUrl = new Url({
    name: req.body.name,
    full: req.body.fullUrl,
    short: req.body.shortUrl,
  });

  await newUrl.save();

  res.status(statusCode.CREATED).json({
    name: newUrl.name,
    shortUrl: newUrl.short,
    fullUrl: newUrl.full,
    clicks: newUrl.clicks,
  });
});
