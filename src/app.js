const express = require('express');
const cors = require('cors');
const expressLayouts = require('express-ejs-layouts');
const indexRouter = require('./routes/index');
const createRouter = require('./routes/create');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(expressLayouts);
app.set('view engine', 'ejs');
// eslint-disable-next-line no-undef
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');

// Routes
app.use('/', indexRouter);
app.use('/create', createRouter);

module.exports = app;
