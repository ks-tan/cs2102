const pg = require('pg');
const constants = require('../../constants');
const QUERY_STATEMENTS = require('../queryStatements/items.js');

const connectionString = constants.DB_CONNECTION;
const client = new pg.Client(connectionString);

exports.addAccount = function (username, full_name, description, age,
    gender, email, country, role) {
    console.log('attemping to add account ' + username);

    client.connect();
    var query = client.query(QUERY_STATEMENTS.ADD_ACCOUNT
        , [username, full_name, description, age, gender, email, country, role],
        function (err, result) {
            console.log("finished query");
            if (err) throw err;
            // just print the result to the console
            console.log(result.rows[0]); // outputs: { name: 'brianc' }
            // disconnect the client
            client.end(function (err) {
                if (err) throw err;
            });
        });
    return query;
}

exports.addProject = function (title, category, image_url, description,
    start_date, end_date, amount_sought, owner_account) {
    console.log('attemping to add project ' + title + " owner " + owner_account);

    client.connect();
    var query = client.query(QUERY_STATEMENTS.ADD_PROJECT
        , [title, category, image_url, description, start_date, end_date, amount_sought, owner_account],
        function (err, result) {
            console.log("finished query");
            if (err) throw err;
            // just print the result to the console
            console.log(result.rows[0]); // outputs: { name: 'brianc' }
            // disconnect the client
            client.end(function (err) {
                if (err) throw err;
            });
        });
    return query;
}

exports.updateProject = function (id, title, category, image_url, description,
    start_date, end_date, amount_sought) {
    console.log('attemping to edit project ' + title);

    client.connect();
    var query = client.query(QUERY_STATEMENTS.UPDATE_PROJECT
        // , [title, category, image_url, description, start_date, end_date, amount_sought, owner_account, id],
        , [title, category, image_url, description, start_date, end_date, amount_sought, id],
        function (err, result) {
            console.log("finished query");
            if (err) throw err;
            // just print the result to the console
            console.log(result.rows[0]); // outputs: { name: 'brianc' }
            // disconnect the client
            client.end(function (err) {
                if (err) throw err;
            });
        });
    return query;
}

exports.addFund = function (projectId, username, amount, date) {
    console.log('attemping to fund to projectId ' + projectId + ' from user ' + username);

    client.connect();
    client.query(QUERY_STATEMENTS.ADD_FUND,
        [projectId, username, amount, date],
        function (err, result) {
            console.log("finished query");
            if (err) throw err;
            client.end(function (err) {
                if (err) throw err;
            });
        }
    );
}

exports.getCategories = function() {
    console.log('attempting to get all available categories');
    const results = [];
    const client = new pg.Client(connectionString);
    client.connect();
    const query = client.query(QUERY_STATEMENTS.GET_CATEGORIES,
        function(err) {
            if(err) throw err;
            client.end();
        });

    return query;
}

exports.getProjects = function(title, categories) {
    title = title || '';
    title = '%' + title + '%';
    var temp = [];
    var params = [title];
    var stmt = QUERY_STATEMENTS.GET_PROJECTS;
    if(categories.length>0) {
        for(var i=2; i<=categories.length+1;i++) {
            temp.push('$'+i);
        }
        params = params.concat(categories);
        var insertIdx = stmt.indexOf('ORDER BY');
        stmt = stmt.slice(0,insertIdx) + 'AND pr.category IN ('+temp.join(',')+') ' + stmt.slice(insertIdx);
    }
    const client = new pg.Client(connectionString);
    client.connect();
    console.log(stmt, params);
    var query = client.query(stmt,
        params,
        function(err, results) {
            if(err) throw err;
            client.end();
        });
    return query;
}
