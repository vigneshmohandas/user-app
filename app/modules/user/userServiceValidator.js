const { body, param } = require('express-validator');
const { ApplicationError } = require('../../core/errors');
const User = require('../../schema/userSchema');

const validate = (method) => {
  switch (method) {
    case 'addUser':
      return [
        body('name').exists().not().isEmpty()
          .isString(),
        body('email').exists().not().isEmpty()
          .isString().isEmail().custom((value) => {
            return User.count({email: value}).then((count) => {
              if(count) return Promise.reject('User with email ID already exists');
              return Promise.resolve();
            })
          }),
        body('password').exists().not().isEmpty()
          .isString(),
      ];
    
      case 'getUser':
        return [
          param('userId').exists().not().isEmpty(),
        ];
    default:
      throw new ApplicationError();
  }
};


module.exports = {
  validate,
};
