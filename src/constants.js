const { isEnvironmentProduction } = require('./util');

const DEV_PORT = 3000;
const BASE_URL = isEnvironmentProduction()
  ? 'https://url-y.herokuapp.com/'
  : `http://localhost:${DEV_PORT}/`;

module.exports.DEV_PORT = DEV_PORT;
module.exports.BASE_URL = BASE_URL;
