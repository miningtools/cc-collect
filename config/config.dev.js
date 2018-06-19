
var config = require('./config.global');
 
config.env = 'dev';

config.log_level = 'debug';
config.log_mode = 'console';             // console || file || both 

config.interval = 20;



module.exports = config;
