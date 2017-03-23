var populateAccount = require('./populateAccount');
var populateCategory = require('./populateCategory');
var populateProject = require('./populateProject');
var populateFund = require('./populateFund');


populateAccount()
    .then( () => populateCategory() )
    .then( () => populateProject() )
    .then( () => populateFund() ); 
