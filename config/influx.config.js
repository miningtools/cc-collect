
const Influx = require('influx');

var influx={};

influx.db = {
	host:'localhost',
	port:'8086',
	database:'cc-collect'
}

influx.schema = 
	[
        {
            measurement: 'summary',
            fields: { text: Influx.FieldType.STRING, value: Influx.FieldType.FLOAT },
            tags: ['host', 'instance', 'type']
        },
        {
            measurement: 'pool',
            fields: { text: Influx.FieldType.STRING, value: Influx.FieldType.FLOAT },
            tags: ['host', 'instance', 'type']
        },
        {
            measurement: 'threads',
            fields: { text: Influx.FieldType.STRING, value: Influx.FieldType.FLOAT },
            tags: ['host', 'instance', 'type', 'type_instance']
        },

    	]

module.exports = influx;
