const ApplicationError = require('./ApplicationError');

class NotFoundError extends ApplicationError {
  constructor(message) {
    super(message);

    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;

    this.message = 'Not Found';

    this.status = 404;

    this.code = '404';
  }
}

module.exports = NotFoundError;
