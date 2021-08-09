const isValidHttpUrl = require('./isValidHttpUrl');

module.exports = function pushActualErrors(actual, errors) {
  if (typeof actual !== 'string') {
    errors.push('actual must be a string');
    return;
  }

  actual = actual.trim();

  if (!isValidHttpUrl(actual.trim())) {
    errors.push('actual must be a valid HTTP URL');
  } else if (actual.length > 255) {
    errors.push('actual must not exceed 255 characters');
  }
};
