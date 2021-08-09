const express = require('express');
const database = require('../../database');
const STATUS_CODES = require('../../utilities/status-codes');

const router = express.Router();

router.patch('/', async (req, res, next) => {
  const errors = [];
  await pushPatchErrors(
    req.body.short,
    req.body.newName,
    req.body.newActual,
    errors
  );
  if (errors.length > 0) {
    return next({ status: STATUS_CODES.BAD_REQUEST, data: { errors } });
  }

  let patchedUrl;
  try {
    patchedUrl = await database.urlPatch(
      req.body.short,
      req.body.newName,
      req.body.newActual
    );
  } catch (err) {
    return next({});
  }

  res.status(STATUS_CODES.OK).json(patchedUrl);
});

async function pushPatchErrors(short, newName, newActual, errors) {
  if (typeof short !== 'string') {
    errors.push('short must be a string');
  } else if (!(await database.urlDoesShortExist(short))) {
    errors.push('short already exists');
  }

  if (newName === undefined && newActual === undefined) {
    errors.push('at least one of newName or newActual must be provided');
    return;
  }

  if (newName !== undefined && typeof newName !== 'string') {
    errors.push('newName must be a string');
  }
  if (newActual !== undefined && typeof newActual !== 'string') {
    errors.push('newActual must be a string');
  }
}

module.exports = router;
