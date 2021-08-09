const { isEnvironmentProduction } = require('./isEnvironmentProduction');

const DEV_PORT = 3000;
const BASE_URL = isEnvironmentProduction()
  ? 'https://link-snip.herokuapp.com/'
  : `http://localhost:${DEV_PORT}/`;

module.exports.DEV_PORT = DEV_PORT;
module.exports.BASE_URL = BASE_URL;
