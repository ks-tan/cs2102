const pg = require('pg');
const constants = require('../../constants');

const connectionString = constants.DB_CONNECTION;
const client = new pg.Client(connectionString);

client.connect();

const query = client.query(
	'CREATE TABLE items(' +
		'id SERIAL PRIMARY KEY,' +
		'text VARCHAR(40) not null)'
);

query.on('end', function() {
	console.log('CREATE TABLE items');
	client.end(); 
});