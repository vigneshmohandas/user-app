const { body } = require('express-validator');
const { ApplicationError } = require('../../core/errors');

const validate = (method) => {
  switch (method) {
    case 'login':
      return [
        body('email').exists().not().isEmpty()
          .isString(),
        body('password').exists().not().isEmpty()
          .isString(),
      ];

    default:
      throw new ApplicationError();
  }
};


module.exports = {
  validate,
};
