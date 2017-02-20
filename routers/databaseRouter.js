const pg = require('pg');
const express = require('express');
const constants = require('../constants');
const itemQuery = require('../database/queryStatements/items');

const router = express.Router();
const connectionString = constants.DB_CONNECTION;


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