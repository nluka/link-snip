const Url = require('./models/Url');

/**
 * @returns true if NODE_ENV is `production`, otherwise returns false
 */
module.exports.isEnvironmentProduction = function isEnvironmentProduction() {
  // eslint-disable-next-line no-undef
  return process.env.NODE_ENV === 'production';
};

/**
 * @param {String} shortUrl
 * @returns true if any documents in database have key `short` set to value `shortUrl`, otherwise returns false
 */
module.exports.doesShortUrlExist = async function doesShortUrlExist(shortUrl) {
  return (await Url.findOne({ short: shortUrl })) !== null;
};
