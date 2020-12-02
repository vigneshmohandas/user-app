const JWT = require('jsonwebtoken');
const { AuthenticationError } = require('../core/errors');
const errors = require('../helpers/errorHelper');
const User = require('../schema/userSchema');

const authenticate = async(req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) throw new AuthenticationError(errors.ERROR_UNAUTHORISED);

    const token = bearerToken.replace('Bearer ', '');

    if (!token) throw new AuthenticationError(errors.ERROR_INVALID_TOKEN);

    const secretKey = process.env.JWT_SECRET_KEY;

    const decodedToken = JWT.verify(token, secretKey);

    if (!decodedToken) throw new AuthenticationError(errors.ERROR_INVALID_TOKEN);

    const user = await User.findById(decodedToken.id, { password: 0 });

    // Store it in the req object for further purpose..
    req.local = {
      ...req.local, user, token
    };

    return next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return next(new AuthenticationError(errors.ERROR_EXPIRED_TOKEN));
    }

    if (error.name === 'JsonWebTokenError') {
      return next(new AuthenticationError());
    }

    return next(new AuthenticationError());
  }
};

module.exports = {
  authenticate,
};
