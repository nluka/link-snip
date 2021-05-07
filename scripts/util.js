/**
 * Returns true if Node environment is production, otherwise returns false
 */
module.exports.isEnvironmentProduction = function isEnvironmentProduction() {
  // eslint-disable-next-line no-undef
  return process.env.NODE_ENV === 'production';
};
