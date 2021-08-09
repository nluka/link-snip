/**
 * Middleware that sends error response to client.
 * @param {HTTP Error} err Object containing `status` and `data`.
 * @param {HTTP Request} req The request object given by Express.
 * @param {HTTP Response} res The response object given by Express.
 * @param {HTTP Response} res The next middleware given by Express.
 */
// eslint-disable-next-line no-unused-vars
module.exports = function handleError(err, req, res, next) {
  res.status(err.status || 500).json(err.data || 'Internal server error.');
};
