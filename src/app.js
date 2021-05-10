const express = require('express');
const cors = require('cors');
const expressLayouts = require('express-ejs-layouts');
const handleError = require('./handleError');
const indexRouter = require('./routes/index');
const createRouter = require('./routes/create');
const deleteRouter = require('./routes/delete');

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
app.use('/', indexRouter);
app.use('/create', createRouter);
app.use('/delete', deleteRouter);

module.exports = app;
