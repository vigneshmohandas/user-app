class ApplicationError extends Error {
  constructor(message) {
    super();
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;

    this.message = message || 'Something went wrong. Please try again.';

    this.status = 500;

    this.code = '0';

    this.seState(message);
  }

  seState(args) {
    if (args === 'undefined') return;
    if (typeof args === 'string') this.message = args;
    if (typeof args === 'object') {
      if (Array.isArray(args)) {
        [this.message, this.code] = args;
      } else {
        this.message = args.message;
        this.code = args.code;
      }
    }
  }
}

module.exports = ApplicationError;
