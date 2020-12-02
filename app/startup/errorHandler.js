const httpStatus = require('http-status-codes');
const { ApplicationError, ValidationError } = require('../core/errors');

module.exports = (app) => {
  // error handler
  app.use((err, req, res, next) => {
    if (err instanceof ValidationError) {
      return res.status(httpStatus.UNPROCESSABLE_ENTITY).send({
        errors: err.errors,
      });
    }
    if (err instanceof ApplicationError) {
      return res.status(err.status).send({
        error: {
          message: err.message,
          code: err.code,
        },
      });
    }
    if (err instanceof SyntaxError) {
      return res.status(httpStatus.BAD_REQUEST).send({
        error: {
          message: 'Bad Request',
          code: 400,
        },
      });
    }
    return res.status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({
        error: {
          message: err.message,
          code: err.code,
        },
      });
  });
};
