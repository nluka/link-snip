const express = require('express');
// const expressLayouts = require('express-ejs-layouts');
const cors = require('cors');
const handleError = require('./middleware/handleError');

// const indexRouter = require('./routes/index');
// const editRouter = require('./routes/edit/edit');
// const shortUrlRouter = require('./routes/short/shortUrl');
const apiRootRouter = require('./routes/api/root');

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

app.use(handleError);

module.exports = app;
