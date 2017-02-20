
const pg = require('pg');
const express = require('express');
const constants = require('../constants');
const itemQuery = require('../database/queryStatements/items');
const QUERY_EXECUTER = require('../database/queryExecuter/execute.js');

const router = express.Router();
const connectionString = constants.DB_CONNECTION;

router.get('/', function(req, res) {
  res.render('pages/main');
});

router.post('/account', function (req, res, next) {
  
  var username = req.body.username;
  var fullname = req.body.fullname;
  var description = (req.body.description) ? req.body.description : '';
  var age = req.body.age;
  var gender = req.body.gender;
  var email = req.body.email;
  var country = (req.body.country) ? req.body.country : '';
  var role = req.body.role;
  var promise = QUERY_EXECUTER.addAccount(username, fullname, description, age, gender, email, country, role);
  promise.then(function() {
    res.redirect('/');  //redirect back to home
  });
});

/*
  EVERYTHING BELOW HERE IS DUMMY TO BE DELETED
*/

router.get('/items', function (req, res, next) {
	submitItemQuery(req, res, itemQuery.GET_ALL);
});


router.post('/insertItem', function (req, res, next) {
  submitItemQuery(req, res, itemQuery.INSERT);
});



function submitItemQuery(req, res, queryString) {
  const results = [];

  // Get a Postgres client from the connection pool
  pg.connect(connectionString, function (err, client, done) {

    // Handle connection errors    
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }

    // Submit sql query
    switch (queryString) {

    	case itemQuery.INSERT:
  			const data = {text: req.body.text};
    		query = client.query(itemQuery.INSERT,[data.text]);
    		break;

    	case itemQuery.GET_ALL:
    		query = client.query(itemQuery.GET_ALL);
    		break;

    	default:
    		query = client.query(queryString);
    }

    // Stream results back one row at a time
    query.on('row', function (row) {
      results.push(row);
    });

    // After all data is returned, close connection and return results
    query.on('end', function () {
      done();
      console.log(queryString);
      return res.json(results);
    });

  });

}

module.exports = router;