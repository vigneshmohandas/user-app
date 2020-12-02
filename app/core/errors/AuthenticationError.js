const ApplicationError = require('./ApplicationError');

class AuthenticationError extends ApplicationError {
  constructor(message) {
    super(message);

    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;

    this.message = 'Unauthorized';

    this.status = 401;

    this.code = '401';

    this.seState(message);
  }
}

module.exports = AuthenticationError;
