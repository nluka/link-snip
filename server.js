/* eslint-disable no-undef */

const util = require('./util');

if (!util.isEnvironmentProduction()) {
  require('dotenv').parse();
}

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const expressLayouts = require('express-ejs-layouts');
const indexRouter = require('./routes/index');
const createRouter = require('./routes/create');

const app = express();

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dataBase = mongoose.connection;
dataBase.on('error', (error) => console.error(error));
dataBase.once('open', () => console.log('Connected to Mongoose'));

//#region Middlewares
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(expressLayouts);
app.use(express.static('public'));
//#endregion

//#region Routes
app.use('/', indexRouter);
app.use('/create', createRouter);
//#endregion

const port = process.env.PORT || 3000;

app.listen(port);

/* eslint-enable no-undef */
