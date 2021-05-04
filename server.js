const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello');
});

// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000;

app.listen(port);
