const pg = require('pg');
const constants = require('../../constants');
const QUERY_STATEMENTS = require('../queryStatements/items.js');

const connectionString = constants.DB_CONNECTION;
const client = new pg.Client(connectionString);

exports.addAccount = function(username, full_name, description, age,
    gender, email, country, role) {
        console.log('attemping to add account ' + username);

        client.connect();
        client.query(QUERY_STATEMENTS.ADD_ACCOUNT
            , [username, full_name, description, age, gender, email, country, role], 
            function (err, result) {
                console.log ("finished query");
                if (err) throw err;
                // just print the result to the console
                console.log(result.rows[0]); // outputs: { name: 'brianc' }
                // disconnect the client
                client.end(function (err) {
                    if (err) throw err;
                });
            });
}

exports.addProject = function(title, category, image_url, description,
    start_date, end_date, amount_sought, owner_account) {
        console.log('attemping to add project ' + title);

        client.connect();
        client.query(QUERY_STATEMENTS.ADD_PROJECT
            , [title, category, image_url, description, start_date, end_date, amount_sought, owner_account], 
            function (err, result) {
                console.log ("finished query");
                if (err) throw err;
                // just print the result to the console
                console.log(result.rows[0]); // outputs: { name: 'brianc' }
                // disconnect the client
                client.end(function (err) {
                    if (err) throw err;
                });
            });
}

exports.addFund = function(projectId, username, amount, date) {
    console.log('attemping to fund to projectId ' + projectId + ' from user ' + username);
    
    client.connect();
    client.query(QUERY_STATEMENTS.ADD_FUND, 
        [projectId, username, amount, date], 
        function (err, result) {
            console.log ("finished query");
            if (err) throw err;
            client.end(function (err) {
                if (err) throw err;
            });
        }
    );
}