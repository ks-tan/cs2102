require('dotenv').config();

const pg = require('pg');
const constants = require('../../constants');
const dbutils = require('../dbutils');


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
        'category VARCHAR(64) REFERENCES category(name) ON DELETE SET NULL,' +
        'image_url VARCHAR (2048),' +
        'description VARCHAR(1024),' +
        'start_date DATE NOT NULL,' +
        'end_date DATE NOT NULL,' +
        'amount_sought DECIMAL CHECK(amount_sought > 0),' +
        'owner_account INTEGER REFERENCES account(id) ON DELETE SET NULL' +
    ');';
const fundsQuery = 
    'CREATE TABLE funds (' +
        'id SERIAL PRIMARY KEY,' +
        'project SERIAL REFERENCES project(id) ON DELETE SET NULL,' +
        'account SERIAL REFERENCES account(id) ON DELETE SET NULL,' +
        'amount DECIMAL CHECK(amount > 0),' +
        'time DATE NOT NULL' +
    ');';


dbutils.executeQueriesInOrder(categoryQuery, accountQuery, projectQuery, fundsQuery)
    .then( () => console.log("Make tables done!") );
