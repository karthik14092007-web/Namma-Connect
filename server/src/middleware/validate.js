// server/src/middleware/validate.js
// Zod request validation middleware
const { error } = require('../utils/apiResponse');

function validateBody(schema) {
  return (req, res, next) => {
    try {
      const parsed = schema.parse(req.body);
      req.body = parsed;
      next();
    } catch (err) {
      if (err.errors) {
        const fields = {};
        err.errors.forEach(e => {
          const path = e.path.join('.');
          fields[path] = e.message;
        });
        return error(res, 'Validation error: Invalid request body', 'VALIDATION_ERROR', 422, fields);
      }
      return error(res, err.message, 'VALIDATION_ERROR', 422);
    }
  };
}

function validateQuery(schema) {
  return (req, res, next) => {
    try {
      const parsed = schema.parse(req.query);
      req.query = parsed;
      next();
    } catch (err) {
      return error(res, 'Invalid query parameters', 'QUERY_VALIDATION_ERROR', 400);
    }
  };
}

module.exports = {
  validateBody,
  validateQuery
};
