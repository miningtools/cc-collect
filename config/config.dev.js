
var config = require('./config.global');

config.env = 'dev';                     // dev || test || prod

config.log_level = 'debug';             // error || warn || info || debug || silly
config.log_mode = 'console';            // console || file || both

config.interval = 20;                   // refresh interval in sec


module.exports = config;
