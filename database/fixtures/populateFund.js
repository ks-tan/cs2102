const pg = require('pg');
const constants = require('../../constants');

const connectionString = constants.DB_CONNECTION;
const client = new pg.Client(connectionString);

client.connect();

const queryStatement = 
        'INSERT INTO category VALUES(\'Art\', \'This is an arty farty category\');'
    +   'INSERT INTO category VALUES(\'Games\', \'By Gamers, for Gamers\');'
    +   'INSERT INTO category VALUES(\'Music\', \'For your ears only\');'
    +   'INSERT INTO category VALUES(\'Food\', \'Yummy yummy in my tummy\');'
    +   'INSERT INTO category VALUES(\'Others\', \'Full of random stuff\');'
    ;

const query1 = client.query(
    queryStatement
);

query1.on('end', function() {
    console.log('Success - Inserted all sample values into category table');
    client.end(); 
});