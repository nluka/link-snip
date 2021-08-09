const express = require('express');
// const expressLayouts = require('express-ejs-layouts');
const cors = require('cors');
const handleError = require('./middleware/handleError');

// const indexRouter = require('./routes/index');
// const editRouter = require('./routes/edit/edit');
// const shortUrlRouter = require('./routes/short/shortUrl');
const apiRootRouter = require('./routes/api/root');
const apiGetRouter = require('./routes/api/get');
const apiCreateRouter = require('./routes/api/create');
const apiDeleteRouter = require('./routes/api/delete');
const apiPatchRouter = require('./routes/api/patch');

const app = express();

// Settings
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
// app.use('/', indexRouter);
// app.use('/edit/', editRouter);
// app.use('/short/', shortUrlRouter);
app.use('/api/', apiRootRouter);
app.use('/api/get', apiGetRouter);
app.use('/api/create', apiCreateRouter);
app.use('/api/delete', apiDeleteRouter);
app.use('/api/patch', apiPatchRouter);

app.use(handleError);

module.exports = app;
