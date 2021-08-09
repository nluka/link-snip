const express = require('express');
const apiGetRouter = require('./get');
const apiPostRouter = require('./post');
const apiPatchRouter = require('./patch');
const apiDeleteRouter = require('./delete');

const rootRouter = express.Router();

rootRouter.get('/', apiGetRouter);
rootRouter.post('/', apiPostRouter);
rootRouter.patch('/', apiPatchRouter);
rootRouter.delete('/', apiDeleteRouter);

module.exports = rootRouter;
