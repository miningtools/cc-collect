#!/usr/bin/env node

'use strict';

const Config = require('./config/config');

const Telnet = require('telnet-client')

var winston = require('winston');

const moment = require('moment-timezone');


var winstonTransports = function () {
    var transports = [];
    if (Config.log_mode === 'console')
        transports = [
            new (winston.transports.Console)({
                level: Config.log_level,
            })];
    if (Config.log_mode === 'file')
        transports = [
            new (winston.transports.File)({
                level: Config.log_level,
                filename: Config.log_file,
            })];
    if (Config.log_mode === 'both')
        transports = [
            new (winston.transports.Console)({
                level: Config.log_level,
            }),
            new (winston.transports.File)({
                level: Config.log_level,
                filename: Config.log_file,
            })];
    return transports;
}

const appendTimestamp = winston.format((info, opts) => {
    if (opts.tz)
        info.timestamp = moment().tz(opts.tz).format('YYYY-MM-DD HH:mm:ss');
    return info;
});

var log = winston.createLogger({
    level: Config.log_level,
    format: winston.format.combine(appendTimestamp({ tz: moment.tz.guess() }), winston.format.simple(), winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}` + (info.splat !== undefined ? `${info.splat}` : " "))
    ),
    transports: winstonTransports()
});

log.debug(Config.log_file);
const Influx = require('influx');

const influx = new Influx.InfluxDB({ 
    host: Config.influxdb.db.host,
    port: Config.influxdb.db.port,
    database: Config.influxdb.db.database,
    schema: Config.influxdb.schema

});

var influxWrite = function (schema, host, instance, type, type_instance, value, text) {
    var tags;
    if (type_instance === '') { tags = { host: host, instance: instance, type: type } } else {
        tags = { host: host, instance: instance, type: type, type_instance: type_instance }
    }
    influx.writePoints([
        {
            measurement: schema,
            tags: tags,
            fields: { text: text, value: value },
        }
    ], {
            database: Config.influxdb.db.database
        })
        .catch(error => {
            log.error(`Error saving data to InfluxDB!` + " measurement: " + schema + " host: " + host + " instance: " + instance + " type: " + type + " type_instance:" + type_instance + " value: " + value + " text: " + text)
        });

}

var hostInstanceExists = function (host, instance) {
    influx.query(`select * FROM "summary" where "host"='${host}' and "instance" = '${instance}' limit 1`).then(results => {
        if (results.length === 1) {
            influxWrite("summary", host, instance, 'UPTIME', '', 0, '');
            
        }
    })
}

var influxDbExists = function () {
    influx.getDatabaseNames()
        .then(names => {
            if (!names.includes(Config.influxdb.db.database)) {
                log.warn('db ' + Config.influxdb.db.database + ' not found. create it.')
                return influx.createDatabase(Config.influxdb.db.database);
            }
        })
        .then(() => {
            refreshAllData()
        })
        .catch(error => console.log({ error }));
}
 
var env = '';
if (Config.env !== 'prod') {
    env = ' in ' + Config.env + ' mode';
}
log.info('Starting cc-collect...\r\n');

var writeData = function (schema, host, data) {

    var i = 0;
    var type_instance;
    var POWERSUM = 0;
    data.forEach(row => {
        let el = row.split(';')

        if (el[0] !== '\u0000') {
            el.forEach(item => {
                let it = item.split("=");
                if (Config.apiTICommands.indexOf(schema) > -1) {
                    type_instance = i;
                } else {
                    type_instance = '';
                }
                if (schema === 'threads' && it[0] === 'POWER') {
                    POWERSUM = POWERSUM + ~~it[1];

                }
                if ((~~it[1] === 0 && it[1] != 0) || it[1].indexOf('x') >= 0 || it[1] === '') {
                    influxWrite(schema, host.name, host.port, it[0], type_instance, null, it[1]);
                } else {
                    influxWrite(schema, host.name, host.port, it[0], type_instance, it[1], '');
                }

            });
            i++;
        }
    });
    if (schema === 'threads') {
        influxWrite('summary', host.name, host.port, 'POWERSUM', '', POWERSUM, '');
    }
}

var run = function (host, command) {
    var params = {
        host: host.address,
        port: host.port,
        shellPrompt: '/ # ',
        timeout: 1500,
        negotiationMandatory: false,
        ors: '\r\n',
        waitfor: '\n'
    }

    let connection = new Telnet()

    try {
        connection.connect(params)
            .then(function (prompt) {
                connection.send(command)
                    .then(function (res) {
                        let result = res.split('|');
                        writeData(command, host, result);
                        log.debug('Command "' + command + '" on host "' + host.name + '" success')
                    })
            }, function (error) {
                log.error('promises reject:', error)
            })
        connection.on('error', function (err) {
            log.error('Connection error: ' + params.host + ':' + params.port + ' - ' + err)
            hostInstanceExists(params.host, params.port);
        })
        connection.on('timeout', function (err) {
            log.error('Connection timeout: ' + params.host, ':' + params.port + ' - ' + err)
        })
    } catch (err) {
        log.error('Connection refused: ', err);
    }

}

process.on("uncaughtException", function(err) {
    log.error(err.stack);
});

process.on("SIGUSR1", function() {
    log.info("Reloading...\r\n");
  
});

process.once("SIGTERM", function() {
    log.info("Stopping...\r\n");
});

var refreshAllData = function () {
    Config.hosts.forEach(host => {
        Config.apiCommands.forEach(command => {
            run(host, command);
        });

    });
}
 
log.info('Started cc-collect' + env + '.\r\n');

influxDbExists();

var refresh = setInterval(function () {
    refreshAllData();
}, Config.interval * 1000);

