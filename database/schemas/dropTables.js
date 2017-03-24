require('dotenv').config();



const constants = require('../../constants');
const dbutils = require('../dbutils');


const accountQuery = 'DROP TABLE account;';
const categoryQuery = 'DROP TABLE category;';
const projectQuery = 'DROP TABLE project;';
const fundsQuery = 'DROP TABLE funds;';


dbutils.executeQueriesInOrder(fundsQuery, projectQuery, categoryQuery, accountQuery)
    .then( () => console.log("Drop tables done!") );
