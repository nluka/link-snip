const express = require('express');

const router = express.Router();

module.exports = router.get('/', (req, res) => {
  res.redirect('https://github.com/nluka/url-y');
});
