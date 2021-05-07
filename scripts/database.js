const util = require('./util');
const mongoose = require('mongoose');

if (!util.isEnvironmentProduction()) {
  require('dotenv').config();
}

/* eslint-disable no-undef */

/**
 * Connects to the MongoDB database via mongoose
 */
module.exports.connect = async function connect() {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

/**
 * Closes to the MongoDB database via mongoose
 */
module.exports.close = async function close() {
  await mongoose.connection.close();
};
