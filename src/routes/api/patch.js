const express = require('express');
const database = require('../../database');
const STATUS_CODES = require('../../utilities/status-codes');
const pushActualErrors = require('../../validators/pushActualErrors');
const pushNameErrors = require('../../validators/pushNameErrors');
const { pushShortErrors } = require('../../validators/pushShortErrors');

const router = express.Router();

router.patch('/', async (req, res, next) => {
  const errors = [];
  await pushPatchErrors(req.body.short, req.body.name, req.body.actual, errors);
  if (errors.length > 0) {
    return next({ status: STATUS_CODES.BAD_REQUEST, data: { errors } });
  }

  let patchedUrl;
  try {
    patchedUrl = await database.urlPatch(
      req.body.short,
      req.body.name,
      req.body.actual
    );
  } catch (err) {
    return next({});
  }

  res.status(STATUS_CODES.OK).json(patchedUrl);
});

async function pushPatchErrors(short, name, actual, errors) {
  if (name === undefined && actual === undefined) {
    errors.push('name and or actual must be provided');
    return;
  }

  await pushShortErrors(short, errors, { existenceComparer: false });

  if (name !== undefined) {
    pushNameErrors(name, errors);
  }

  if (actual !== undefined) {
    pushActualErrors(actual, errors);
  }
}

module.exports = router;
