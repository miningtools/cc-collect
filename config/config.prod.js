
var config = require('./config.global');

config.env = 'prod';                    // dev || test || prod

config.log_level = 'info';              // error || warn || info || debug || silly
config.log_mode = 'file';               // console || file || both


module.exports = config;
