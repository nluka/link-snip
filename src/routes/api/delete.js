const express = require('express');
const STATUS_CODES = require('../../utilities/status-codes');
const database = require('../../database');

const router = express.Router();

router.delete('/', async (req, res, next) => {
  const errors = [];
  await pushDeleteErrors(req.body.short, errors);
  if (errors.length > 0) {
    return next({ status: STATUS_CODES.BAD_REQUEST, data: { errors } });
  }

  const deletedUrl = await database.urlDelete(req.body.short);

  res.status(STATUS_CODES.OK).json(deletedUrl);
});

async function pushDeleteErrors(short, errors) {
  if (typeof short !== 'string') {
    errors.push('short must be a string');
  } else if (!(await database.urlDoesShortExist(short))) {
    errors.push("short doesn't exist");
  }
}

module.exports = router;
