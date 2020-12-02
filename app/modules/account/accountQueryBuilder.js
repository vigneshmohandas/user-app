const User = require('../../schema/userSchema');
const { BadRequestError } = require('../../core/errors');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const redis = require("redis");
const {setUserCache} = require('../../helpers/cacheHelper');

const client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);

const login = async (req) => {
  const user = await User.findOne({
    email: req.body.email
  });
  if(!user) {
    throw new BadRequestError('Invalid credentials');
  }

  if(!bcrypt.compareSync(req.body.password, user.password)) {
    throw new BadRequestError('Invalid credentials');
  }

  const token = JWT.sign({
    id: user.id,
    email: user.email,
  }, process.env.JWT_SECRET_KEY, { expiresIn: 60 * process.env.JWT_EXPIRY });
  await setUserCache({token, user});
  // const getAsync = promisify(client.get).bind(client);
  // const setAsync = promisify(client.set).bind(client);
  // const quitAsync = promisify(client.quit).bind(client);

  // let userCache = await getAsync(`user-${user.id}`);
  // if(userCache ===  null) {
  //   await setAsync(`user-${user.id}`, JSON.stringify([{token: token, time: Date.now()}]))
  // }
  // userCache = JSON.parse(userCache);
  // const index = userCache.find((x) =>x.token === req.headers.authorization)
  // if(index>=0) {
  //   userCache[index] = {token: token, time: Date.now()}
  // } else {
  //   userCache.push({token, time: Date.now()})
  // }
  // await setAsync(`user-${user.id}`, JSON.stringify(userCache));
  // await quitAsync();
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    token: token,
    expiresIn: 60 * process.env.JWT_EXPIRY
  };
};

module.exports = {
  login,
};
