/**
 * @returns true if `NODE_ENV` === `production`, otherwise returns false
 */
module.exports.isEnvironmentProduction = function isEnvironmentProduction() {
  return process.env.NODE_ENV === 'production';
};
