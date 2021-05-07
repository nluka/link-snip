module.exports = function isEnvironmentProduction() {
  // eslint-disable-next-line no-undef
  return process.env.NODE_ENV === 'production';
};
