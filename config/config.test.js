
var config = require('./config.global');

config.env = 'test';                     // dev || test || prod

config.log_level = 'debug';             // error || warn || info || debug || silly
config.log_mode = 'both';            // console || file || both


module.exports = config;
