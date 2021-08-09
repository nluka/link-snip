const { DEV_PORT } = require('./utilities/constants');
const app = require('./app');
const isEnvironmentProduction = require('./utilities/isEnvironmentProduction');

if (!isEnvironmentProduction()) {
  require('dotenv').config();
}

const PORT = process.env.PORT || DEV_PORT;

app.listen(PORT, () => console.log(`link-snip is running on port ${PORT}`));
