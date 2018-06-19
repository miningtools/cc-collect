
var config = require('./config.global');

config.env = 'test';

config.log_level = 'info';  //debug || info || warning ||error
config.log_mode = 'both';    // console || file || both

module.exports = config;
