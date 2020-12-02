class ValidationError extends Error {
  constructor(errors) {
    super();
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;

    this.message = 'Validation Error';

    this.status = 422;

    this.code = '422';

    this.errors = errors;
  }
}

module.exports = ValidationError;
