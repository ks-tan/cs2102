const pg = require('pg');
const constants = require('../../constants');
const queryStatements = require('../queryStatements/items.js');

const connectionString = constants.DB_CONNECTION;


exports.addAccount = function (username, full_name, description, age,
    gender, email, country, role) {
    console.log('attemping to add account ' + username);

    const client = new pg.Client(connectionString);
    client.connect();
    var query = client.query(queryStatements.ADD_ACCOUNT
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

    const client = new pg.Client(connectionString);
    client.connect();
    var query = client.query(queryStatements.ADD_PROJECT
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

    const client = new pg.Client(connectionString);
    client.connect();
    var query = client.query(queryStatements.UPDATE_PROJECT
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

    const client = new pg.Client(connectionString);
    client.connect();
    client.query(queryStatements.ADD_FUND,
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
    const query = client.query(queryStatements.GET_CATEGORIES,
        function(err) {
            if(err) throw err;
            client.end();
        });

    return query;
}

exports.getProjects = function(title) {
    title = title || '';
    title = '%' + title + '%';
    console.log('attempting to get all projects', title);
    const client = new pg.Client(connectionString);
    client.connect();
    var query = client.query(queryStatements.GET_PROJECTS,
        [title],
        function(err, results) {
            if(err) throw err;
            client.end();
        });
    return query;
}
