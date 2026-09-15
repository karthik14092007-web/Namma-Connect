// server/src/middleware/errorHandler.js
const { error } = require('../utils/apiResponse');

function errorHandler(err, req, res, next) {
  console.error('[Error] Unhandled error in request:', err);

  if (err.name === 'UnauthorizedError') {
    return error(res, 'Invalid authentication token', 'UNAUTHORIZED', 401);
  }

  if (err.name === 'ZodError') {
    return error(res, 'Validation error', 'VALIDATION_ERROR', 422, err.format());
  }

  // Safe error message for clients in production
  const message = process.env.NODE_ENV === 'production'
    ? 'Internal Server Error'
    : err.message || 'An unexpected error occurred';

  return error(res, message, 'INTERNAL_SERVER_ERROR', err.statusCode || 500);
}

module.exports = errorHandler;
