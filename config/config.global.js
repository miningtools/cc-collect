
var config = module.exports = {};
var hosts = require('./hosts.config');
var influxdb = require('./influx.config');
var daemon = require('./daemon.config.js');

config.daemon = daemon;

config.hosts = hosts;

config.influxdb = influxdb;

config.log_level = 'info';                                          // error || warn || info || debug || silly
config.log_mode = 'console';                                        // console || file || both
config.log_file = (__dirname + '/../log/cc-collect.log');           // path to log file

config.interval = 60;                                               // refresh interval in sec

config.apiCommands = ['summary', 'pool', 'threads'];                // threads, pool, histo, hwinfo, meminfo, scanlog
config.apiTICommands = ['threads'];
