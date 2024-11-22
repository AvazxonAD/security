const ErrorResponse = require('../utils/errorResponse')
const police = () => {
  try {
    return (req, res, next) => {
      if (req.user.region) {
        throw new ErrorResponse('Access denied: You do not have permission to perform this action', 403)
      }
      next();
    };
  } catch (error) {
    throw new ErrorResponse(error, error.statusCode)
  }
};

module.exports = { police }