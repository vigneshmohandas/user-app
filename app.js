const express = require('express');

const app = express();

require('./app/startup/common')(app);
require('./app/startup/dotenv')();
require('./app/startup/database');

require('./router')(app);

// This must be registered last
require('./app/startup/errorHandler')(app);

module.exports = app;
