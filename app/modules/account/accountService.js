const queryBuilder = require('./accountQueryBuilder');
const validation = require('../../helpers/validationHelper');

const login = async (req, res, next) => {
  try {
    validation.validate(req);
    const data = await queryBuilder.login(req);
    return res.send(data);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  login,
};
