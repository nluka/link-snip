const express = require('express');
const database = require('../../database');
const isValidHttpUrl = require('../../utilities/isValidHttpUrl');
const STATUS_CODES = require('../../utilities/status-codes');

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
  if (typeof name !== 'string') {
    errors.push('name must be a string');
  }
  if (typeof actual !== 'string') {
    errors.push('actual must be a string');
  } else if (!isValidHttpUrl(actual)) {
    errors.push('actual must be a valid HTTP URL');
  }
  if (typeof short !== 'string') {
    errors.push('short must be a string');
  } else if (await database.urlDoesShortExist(short)) {
    errors.push('short already exists');
  }
}

module.exports = router;
