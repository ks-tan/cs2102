const dbutils = require('../dbutils');


const populateAccount = require('./populateAccount');
const populateCategory = require('./populateCategory');
const populateProject = require('./populateProject');
const populateFund = require('./populateFund');


dbutils.executeQueriesInOrder(
    populateAccount.query,
    populateCategory.query,
    populateProject.query,
    populateFund.query
).then( () => console.log("Install fixtures done!") );
