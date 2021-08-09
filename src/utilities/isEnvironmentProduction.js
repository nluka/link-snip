/**
 * @returns true if `NODE_ENV` === `production`, otherwise returns false
 */
module.exports = function isEnvironmentProduction() {
  return process.env.NODE_ENV === 'production';
};
