const queryBuilder = require('./userQueryBuilder');
const validation = require('../../helpers/validationHelper');
const {setUserCache} = require('../../helpers/cacheHelper');

const addUser = async (req, res, next) => {
  try {
    validation.validate(req);
    const data = await queryBuilder.addUser(req);
    return res.send(data);
  } catch (err) {
    return next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    validation.validate(req);
    const data = await queryBuilder.getUser(req);
    await setUserCache({token: req.local.token, user: req.local.user})
    return res.send(data);
  } catch (err) {
    return next(err);
  }
};

const getUserTokens = async (req, res, next) => {
  try {
    validation.validate(req);
    const data = await queryBuilder.getUserTokens(req);
    return res.send(data);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  addUser,
  getUser,
  getUserTokens
};
