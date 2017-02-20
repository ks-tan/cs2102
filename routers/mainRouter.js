
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

router.get('/projects', function(req, res) {
  res.render('pages/search');
});

router.get('/projects/add', function(req, res) {
  res.render('pages/addEditProject');
});

router.get('/projects/:id', function(req, res) {
  res.render('pages/viewProject');
});

router.get('/my-projects', function(req, res) {
  res.render('pages/myProjects');
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

module.exports = router;