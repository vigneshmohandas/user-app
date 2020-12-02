const { validationResult } = require('express-validator');
const { ValidationError } = require('../core/errors');


const validate = (req) => {
  const errors = validationResult(req);

  if (req.local && req.local.superValidationError) {
    throw req.local.superValidationError;
  }

  if (!errors.isEmpty()) {
    throw new ValidationError(errors.array());
  }
};

module.exports = {
  validate,
};
