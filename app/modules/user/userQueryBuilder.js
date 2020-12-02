const User = require('../../schema/userSchema');
const bcrypt = require('bcryptjs');
const {BadRequestError, ApplicationError} = require('../../core/errors');
const redis = require('redis');
const { promisify } = require('util');

const addUser = async (req) => {
  const user = new User({
    name: req.body.name,
    email:req.body.email,
    password: bcrypt.hashSync(req.body.password, 10)
  })
  return user.save().then((data) => {
    return {
      id: data.id,
      email: data.email,
      name: data.name
    };
  });
};

const getUser = async (req) => {
  if(req.params.userId !== req.local.user.id) throw new ApplicationError('Cannot access other user details');
  return User.findById(req.params.userId, {password:0}).then((user) => {
    if(!user) throw new BadRequestError('User not found')
    return user
  })
}

const getUserTokens = async (req) => {
  if(req.params.userId !== req.local.user.id) throw new ApplicationError('Cannot access other user details');
  const client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);
  const getAsync = promisify(client.get).bind(client);
  const setAsync = promisify(client.set).bind(client);
  const quitAsync = promisify(client.quit).bind(client);

  let userCache = await getAsync(`user-${req.local.user.id}`);

  if(userCache === null) {
    return [];
  }
  userCache = JSON.parse(userCache);
  userCache = userCache.filter((x) => (x.time + (60*process.env.JWT_EXPIRY*1000)) > Date.now());

  return userCache.map((x) => ({
    token: x.token,
    time : new Date(x.time)
  }))
}

module.exports = {
  addUser,
  getUser,
  getUserTokens
};
