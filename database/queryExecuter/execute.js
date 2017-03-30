require('dotenv').config();

const pg = require('pg');
const constants = require('../../constants');
const queryStatements = require('../queryStatements/items.js');
const pool = new pg.Pool();


/* Reusable functions */


/**
 * Execute a query with the given arguments, and returns a promise.
 * The promise will contain the results. Use it like this:
 *
 *    executeAndLog(query, args).then( (results) => doSomething(results) );
 *
 * @param {*} query : The query string to execute.
 * @param {*} args : Optional. Arguments for the query.
 */
function executeAndLog(query, args) {
    let summary = query.substring(0, 20);
    console.log("%s...: EXECUTING", summary);
    let promise = pool.query(query, args).then( result => {
        console.log("%s...: SUCCESS. Returned %d rows.", summary, result.rowCount);
        return result;
    }).catch( e => {
        console.log("%s...: ERROR. Reason: %s %s", summary, e.name, e.message);
    });
    return promise;
}


/* Convenience functions */


exports.addAccount = function addAccount(username, full_name, description, age,
    gender, email, country, role) {

    console.log('Attemping to add account ' + username);
    return executeAndLog(queryStatements.ADD_ACCOUNT, [
        username, full_name, description, age, gender, email, country, role
    ]);
}


exports.addProject = function (title, category, image_url, description,
    start_date, end_date, amount_sought, owner_account) {

    console.log('attemping to add project ' + title + " owner " + owner_account);
    return executeAndLog(queryStatements.ADD_PROJECT, [
        title, category, image_url, description, start_date, end_date, amount_sought, owner_account
    ]);
}


exports.updateProject = function (id, title, category, image_url, description,
    start_date, end_date, amount_sought) {

    console.log('attemping to edit project ' + title);
    return executeAndLog(queryStatements.UPDATE_PROJECT, [
        title, category, image_url, description, start_date, end_date, amount_sought, id
    ]);
}

exports.addFund = function (projectId, username, amount, date) {
    console.log('attemping to fund to projectId ' + projectId + ' from user ' + username);
    return executeAndLog(queryStatements.ADD_FUND, [
        projectId, username, amount, date
    ]);
}

exports.getCategories = function() {
    console.log('attempting to get all available categories');
    return executeAndLog(queryStatements.GET_CATEGORIES);
}

exports.getAccount = function(username) {
    username = username || '';
    console.log('attempting to get account based on username');
    return executeAndLog(queryStatements.GET_ACCOUNT, [username]);
}

exports.getProjects = function(title, categories) {
    title = title || '';
    title = '%' + title + '%';
    var temp = [];
    var params = [title];
    var stmt = queryStatements.GET_PROJECTS;
    if(categories!==undefined && categories.length>0) {
        for(var i=2; i<=categories.length+1;i++) {
            temp.push('$'+i);
        }
        params = params.concat(categories);
        var insertIdx = stmt.indexOf('ORDER BY');
        stmt = stmt.slice(0,insertIdx) + 'AND pr.category IN ('+temp.join(',')+') ' + stmt.slice(insertIdx);
    }
    console.log('attempting to get all projects', params);
    return executeAndLog(stmt, params);
}

exports.getProjectById = function (id) {
    return executeAndLog(queryStatements.GET_PROJECT_BY_ID, [id]);
}
