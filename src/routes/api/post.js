const express = require('express');
const database = require('../../database');
const STATUS_CODES = require("nluka-http-response-status-codes");
const pushNameErrors = require('../../validators/pushNameErrors');
const pushActualErrors = require('../../validators/pushActualErrors');
const { pushShortErrors } = require('../../validators/pushShortErrors');

const router = express.Router();

router.post('/', async (req, res, next) => {
  const errors = [];
  await pushCreateErrors(
    req.body.name,
    req.body.actual,
    req.body.short,
    errors
  );
  if (errors.length > 0) {
    return next({ status: STATUS_CODES.BAD_REQUEST, data: { errors } });
  }

  const createdUrl = await database.urlCreate(
    req.body.name,
    req.body.actual,
    req.body.short
  );

  res.status(STATUS_CODES.CREATED).json(createdUrl);
});

async function pushCreateErrors(name, actual, short, errors) {
  pushNameErrors(name, errors);
  pushActualErrors(actual, errors);
  await pushShortErrors(short, errors);
}

module.exports = router;
