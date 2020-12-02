const { NotFoundError } = require('./app/core/errors');

module.exports = (app) => {
  app.use('/', require('./app/modules/init/intiRouter'));
  app.use('/users', require('./app/modules/user/userRouter'));
  app.use('/account', require('./app/modules/account/accountRouter'));

  // this should go at last to catch all undefined routes
  app.use('*', () => {
    throw new NotFoundError();
  });
};
