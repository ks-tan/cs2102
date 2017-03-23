const pg = require('pg');
const constants = require('../../constants');


const connectionString = constants.DB_CONNECTION;


const accountQuery = 'DROP TABLE account;';
const categoryQuery = 'DROP TABLE category;';
const projectQuery = 'DROP TABLE project;';
const fundsQuery = 'DROP TABLE funds;';


function run() {
    const client = new pg.Client(connectionString);
    client.connect();
    return client.query(fundsQuery)
        .then( () => client.query(projectQuery) )
        .then( () => client.query(categoryQuery) )
        .then( () => client.query(accountQuery) )
        .then( () => client.end() );
}


run();
