const util = require('../scripts/util');
const mongoose = require('mongoose');
const app = require('./app');

if (!util.isEnvironmentProduction()) {
  require('dotenv').config();
}

/* eslint-disable no-undef */

const PORT = process.env.PORT || 3000;

mongoose.connection.once('open', () => console.log('database connection established'));

// Connect to database, then start the Express server
mongoose
  .connect(process.env.DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`url-y is running on port ${PORT}`));
  })
  .catch((err) => {
    console.error(err);
  });

/* eslint-disable no-undef */
