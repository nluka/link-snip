const express = require('express');
const { doesShortExist } = require('../../database');
const database = require('../../database');
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

  const result = await database.query(
    'insert into urls (name, actual, short, clicks) values ($1, $2, $3, $4) returning *;',
    [req.body.name, req.body.actual, req.body.short, 0]
  );

  const { name, actual, short, clicks } = result.rows[0];

  res.status(STATUS_CODES.CREATED).json({
    name,
    actual,
    short,
    clicks,
  });
});

async function pushCreateErrors(name, actual, short, errors) {
  if (typeof name !== 'string') {
    errors.push('name must be a string');
  }
  if (typeof actual !== 'string') {
    errors.push('actual must be a string');
  }
  if (typeof short !== 'string') {
    errors.push('short must be a string');
  } else if (await doesShortExist(short)) {
    errors.push('short already exists');
  }
}

module.exports = router;
