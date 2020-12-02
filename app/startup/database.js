
const mongoose = require('mongoose');
let config = require('../../config/credentials');

var authentication = (config.DB_USER && config.DB_PASS) ? `${config.DB_USER}:${config.DB_PASS}@` : "";
var connectionString = `mongodb+srv://${authentication}${config.DB_HOST}/${config.DB_NAME}?${config.DB_OPTIONS}`;
console.log(connectionString)
mongoose.connect(connectionString);