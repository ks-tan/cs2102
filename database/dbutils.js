/** Exports */
exports.executeQueriesInOrder = executeQueriesInOrder;


/** Implementation */
require('dotenv').config();

const pg = require('pg');


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
