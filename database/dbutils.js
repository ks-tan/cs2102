/** Exports */
exports.executeQueriesInOrder = executeQueriesInOrder;


/** Implementation */
require('dotenv').config();

const pg = require('pg');


/**
 * Executes the given query strings in order and returns a promise.
 * Note that this function is only fit for use in utility scripts,
 * such as to make tables, drop tables and install fixtures.
 * 
 * It is not fit for usage in application. See queryExecuter/execute.js
 * instead for usage in application.
 * 
 * @param {*} queries : one or more queries to execute. 
 */
function executeQueriesInOrder(...queries) {
    const pool = new pg.Pool();
    if (queries.length < 1) return;
    let promise = pool.query(queries[0]);
    for (let i = 0; i < queries.length; i++) {
        if (i > 0) {
            promise = promise.then( () => pool.query(queries[i]) );
        }
        let summary = queries[i].substring(0, 20);
        promise = promise.then( result => {
            console.log("Query %d: SUCCESS (%s...)", i, summary);
        }).catch( e => {
            console.error("Query %d: FAILED (%s...)", i, summary);
            console.error("Reason: %s %s", e.name, e.message);
        });
    }
    promise = promise.then( () => pool.end() );
    return promise;
};
