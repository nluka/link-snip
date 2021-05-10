const express = require('express');
const cors = require('cors');
const expressLayouts = require('express-ejs-layouts');
const handleError = require('./handleError');
const apiIndexRouter = require('./routes/api/index');
const apiCreateRouter = require('./routes/api/create');
const apiDeleteRouter = require('./routes/api/delete');
const apiPatchRouter = require('./routes/api/patch');

const app = express();

// Settings
app.set('view engine', 'ejs');
// eslint-disable-next-line no-undef
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(expressLayouts);
app.use(handleError);

// Routes
app.use('/api/', apiIndexRouter);
app.use('/api/create', apiCreateRouter);
app.use('/api/delete', apiDeleteRouter);
app.use('/api/patch', apiPatchRouter);

module.exports = app;
