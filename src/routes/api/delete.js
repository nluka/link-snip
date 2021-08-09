const express = require('express');
const STATUS_CODES = require('../../utilities/status-codes');
const database = require('../../database');
const { pushShortErrors } = require('../../validators/pushShortErrors');

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
  await pushShortErrors(short, errors, { existenceComparer: false });
}

module.exports = router;
