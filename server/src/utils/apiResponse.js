// server/src/utils/apiResponse.js
// Standard API response formatter compliant with spec

function success(res, data = {}, statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    data
  });
}

function error(res, message = 'An error occurred', code = 'INTERNAL_ERROR', statusCode = 500, fields = null) {
  const payload = {
    success: false,
    error: {
      code,
      message
    }
  };

  if (fields && Object.keys(fields).length > 0) {
    payload.error.fields = fields;
  }

  return res.status(statusCode).json(payload);
}

module.exports = {
  success,
  error
};
