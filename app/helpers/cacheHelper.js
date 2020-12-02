const redis = require('redis');
const { promisify } = require('util');

const setUserCache = async(data) => {
  const client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);
  const getAsync = promisify(client.get).bind(client);
  const setAsync = promisify(client.set).bind(client);
  const quitAsync = promisify(client.quit).bind(client);

  let userCache = await getAsync(`user-${data.user.id}`);
  if(userCache ===  null) {
    await setAsync(`user-${data.user.id}`, JSON.stringify([{token: data.token, time: Date.now()}]))
  } else {
    userCache = JSON.parse(userCache);
    userCache = userCache.filter((x) => (x.time + (60*process.env.JWT_EXPIRY*1000)) > Date.now());
    const index = userCache.findIndex((x) =>x.token === data.token)
    if(index>=0) {
      userCache[index] = {token: data.token, time: Date.now()}
    } else {
      userCache.push({token: data.token, time: Date.now()})
    }
    await setAsync(`user-${data.user.id}`, JSON.stringify(userCache));
  }

  await quitAsync();
}

module.exports = {
  setUserCache
}