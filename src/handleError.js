/**
 * Middleware that sends error response.
 * @param {HTTP Error} error The error object (from the http-errors package), containing a status and message.
 * @param {HTTP Request} req The request object given by Express.
 * @param {HTTP Response} res The response object given by Express.
 * @param {HTTP Response} res The next middleware function given by Express.
 */
// eslint-disable-next-line no-unused-vars
module.exports = function handleError(error, req, res, next) {
  // TODO: Fix stack trace being shown in response
  const statusCode = error.status || 500;
  const statusMessage = error.message || 'Internal server error.';
  res.status(statusCode).json({
    statusCode: statusCode,
    statusMessage: statusMessage,
  });
};
