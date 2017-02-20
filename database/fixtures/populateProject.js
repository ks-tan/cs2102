const pg = require('pg');
const constants = require('../../constants');

const connectionString = constants.DB_CONNECTION;
const client = new pg.Client(connectionString);

client.connect();

const queryStatement = 
        'INSERT INTO project VALUES(DEFAULT, \'Journey to the Moon\', \'Art\', NULL, \'Remake of the first ever movie\', \'2017-02-20\', \'2018-02-20\', \'1000.00\', 1);'
    +   'INSERT INTO project VALUES(DEFAULT, \'By Gamers, for Gamers\', \'Games\', NULL, \'OVERTHROW VALVE!!!\', \'2017-12-15\', \'2019-12-15\', \'100000.00\', 4);'
    ;

const query1 = client.query(
    queryStatement
);

query1.on('end', function() {
    console.log('Success - Inserted all sample values into category table');
    client.end(); 
});