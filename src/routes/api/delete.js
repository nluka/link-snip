const express = require('express');
const { doesShortExist } = require('../../database');
const STATUS_CODES = require('../../utilities/status-codes');
const database = require('../../database');

const router = express.Router();

router.delete('/', async (req, res, next) => {
  const errors = [];
  await pushDeleteErrors(req.body.short, errors);
  if (errors.length > 0) {
    return next({ status: STATUS_CODES.BAD_REQUEST, data: { errors } });
  }

  const result = await database.query(
    'delete from urls where (short = $1) returning *;',
    [req.body.short]
  );

  const { name, actual, short, clicks } = result.rows[0];

  res.status(STATUS_CODES.OK).json({
    name,
    actual,
    short,
    clicks,
  });
});

async function pushDeleteErrors(short, errors) {
  if (typeof short !== 'string') {
    errors.push('short must be a string');
  } else if (!(await doesShortExist(short))) {
    errors.push("short doesn't exist");
  }
}

module.exports = router;
