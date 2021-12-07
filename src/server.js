const app = require('./app');
const isEnvironmentProduction = require("./utility/isEnvironmentProduction");

if (!isEnvironmentProduction()) {
  require('dotenv').config();
}

function start() {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`link-snip is listening on port ${PORT}`));
}

start();
