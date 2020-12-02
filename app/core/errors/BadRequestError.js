const ApplicationError = require('./ApplicationError');

class BadRequestError extends ApplicationError {
  constructor(message) {
    super(message);

    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;

    this.message = 'Bad Request';

    this.status = 400;

    this.code = '400';

    this.seState(message);
  }
}

module.exports = BadRequestError;
