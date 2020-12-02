const init = async (req, res, next) => {
  try {
    const response = {
      api: 'user-app-api',
      version: process.env.VERSION,
      date: new Date().getTime(),
    };
    return res.send(response);
  } catch (e) {
    return next(e);
  }
};

module.exports = {
  init,
};
