
var env = process.env.NODE_ENV || 'prod'
cfg = require('./config.' + env);


module.exports = cfg;
