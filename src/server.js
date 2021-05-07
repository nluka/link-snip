const app = require('./app');
const mongoose = require('mongoose');
const util = require('./scripts/util');

if (!util.isEnvironmentProduction()) {
  require('dotenv').config();
}

/* eslint-disable no-undef */

const PORT = process.env.PORT || 3000;

/**
 * Connects to the MongoDB database, then starts the Express server
 */
(async function () {
  try {
    mongoose.connection.once('open', () => console.log('Database connection open'));
    await mongoose.connect(process.env.DATABASE_URL);
    await app.listen(PORT, () => {
      console.log('Listening...');
    });
  } catch (err) {
    console.error(err);
  }
})();

/* eslint-disable no-undef */
