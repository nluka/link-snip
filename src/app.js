const express = require('express');
const cors = require('cors');
const handleError = require('./handleError');

const indexRouter = require('./routes/index');
const shortUrlRouter = require('./routes/short/shortUrl');
const apiRootRouter = require('./routes/api/root');
const apiGetRouter = require('./routes/api/get');
const apiCreateRouter = require('./routes/api/create');
const apiDeleteRouter = require('./routes/api/delete');
const apiPatchRouter = require('./routes/api/patch');

const app = express();

// Settings
app.set('view engine', 'ejs');
// eslint-disable-next-line no-undef
app.set('views', __dirname + '/views');

// Middlewares
app.use(cors());
app.use(express.json());
// eslint-disable-next-line no-undef
app.use(express.static(__dirname + '/public'));
app.use(handleError);

// Routes
app.use('/', indexRouter);
// app.use('/', apiRootRouter);
app.use('/short/', shortUrlRouter);
app.use('/api/', apiRootRouter);
app.use('/api/get', apiGetRouter);
app.use('/api/create', apiCreateRouter);
app.use('/api/delete', apiDeleteRouter);
app.use('/api/patch', apiPatchRouter);

module.exports = app;
