const pg = require('pg');
const constants = require('../../constants');

const connectionString = constants.DB_CONNECTION;
const client = new pg.Client(connectionString);

client.connect();

const accountQuery = 
    'CREATE TABLE account (' +
        'id SERIAL PRIMARY KEY,' +
        'username VARCHAR(32) UNIQUE NOT NULL,' +
        'full_name VARCHAR(256) NOT NULL,' +
        'description VARCHAR(1024),' +
        'age INT CHECK(age>=0),' +
        'gender VARCHAR(6) CHECK(gender = \'MALE\' OR gender = \'FEMALE\' OR gender = \'OTHER\'),' +
        'email VARCHAR(256),' +
        'country VARCHAR(64),' +
        'role VARCHAR(5) CHECK(role = \'ADMIN\' OR role = \'USER\')' +
    ');';
const categoryQuery = 
    'CREATE TABLE category (' +
        'name VARCHAR(64) PRIMARY KEY,' +
        'description VARCHAR(1024)' +
    ');';
const projectQuery = 
    'CREATE TABLE project (' +
        'id SERIAL PRIMARY KEY,' +
        'title VARCHAR(256) NOT NULL,' +
        'category VARCHAR(64) REFERENCES category(name),' +
        'image_url VARCHAR (2048),' +
        'description VARCHAR(1024),' +
        'start_date DATE NOT NULL,' +
        'end_date DATE NOT NULL,' +
        'amount_sought DECIMAL CHECK(amount_sought > 0),' +
        'owner_account SERIAL REFERENCES account(id)' +
    ');';
const fundsQuery = 
    'CREATE TABLE funds (' +
        'id SERIAL PRIMARY KEY,' +
        'project SERIAL REFERENCES project(id),' +
        'account SERIAL REFERENCES account(id),' +
        'amount DECIMAL CHECK(amount > 0),' +
        'time DATE NOT NULL' +
    ');';

const query1 = client.query(
    accountQuery
);

query1.on('end', function() {
	console.log('Success - CREATE TABLE account');
    var query2 = client.query(categoryQuery);
    query2.on('end', function() {
	    console.log('Success - CREATE TABLE category');
        var query3 = client.query(projectQuery);
        query3.on('end', function() {
            console.log('Success - CREATE TABLE project');
            var query4 = client.query(fundsQuery);
            query4.on('end', function() {
	            console.log('Success - CREATE TABLE fund');
                client.end(); 
            });
        });
    });
});