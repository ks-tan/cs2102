
const pg = require('pg');
const express = require('express');
const constants = require('../constants');
const itemQuery = require('../database/queryStatements/items');
const QUERY_EXECUTER = require('../database/queryExecuter/execute.js');

const router = express.Router();
const connectionString = constants.DB_CONNECTION;

router.get('/', function(req, res) {
  var categories = [];
  QUERY_EXECUTER.getCategories().then(results => {
    categories = results.rows;
    res.render('pages/main', {
      categories: categories
    });
  });
});

router.get('/projects', function(req, res) {
  var projects = [];
  console.log(req.query);
  var title = req.query.title || '';
  QUERY_EXECUTER.getProjects(title).then(results => {
    projects = results.rows;
    res.render('pages/search', {
      params: req.query,
      projects : projects
    });
  });
});

router.get('/categories', function(req, res) {
  var promise = QUERY_EXECUTER.getCategories();
  promise.then(results => {
    return res.json(results.rows);
  });
})

router.get('/projects/add', function(req, res) {
  res.render('pages/addEditProject');
});

router.get('/projects/:id', function(req, res) {
  res.render('pages/viewProject');
});

router.get('/projects/:id/edit', function(req, res) {
  // Pass a context to the templating engine
  // so that it knows to render a pre-populated form
  // instead of a blank one.
  res.render('pages/addEditProject');
});

router.get('/my-projects', function(req, res) {
  res.render('pages/myProjects');
});

/*  ============================================================
    Create new Account
    @Params
    string            : username
    string            : fullname
    string            : description
    int               : age
    string            : gender (MALE, FEMALE, OTHER)
    string            : email
    string            : country
    string            : role
    ============================================================*/
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


/*  ============================================================
    Create (and edit? TBI?) new Project
    @Params
    string            : title
    string            : category
    string            : image_url
    string            : description
    DATE              : start_date(use new Date())
    DATE              : end_date
    DECIMAL           : amount_sought
    string           : owner_account (must be valid username)
    ============================================================*/
router.post('/project', function (req, res, next) {
  console.log(req.body);
  var title = req.body.title;
  var category = req.body.category;
  var image_url = (req.body.image_url) ? req.body.image_url : '';
  var description = req.body.description;
  var start_date = req.body.start_date;
  var end_date = req.body.end_date;
  var amount_sought = req.body.amount_sought;
  var owner_account = req.body.owner_account;
  var promise = QUERY_EXECUTER.addProject(title, category, image_url, description, start_date, end_date, amount_sought, owner_account);
  promise.then(function() {
    res.redirect('/');  //redirect back to home
  });
});

/*  ============================================================
    Create (and edit? TBI?) new Project
    @Params
    string            : title
    string            : category
    string            : image_url
    string            : description
    DATE              : start_date(use new Date())
    DATE              : end_date
    DECIMAL           : amount_sought
    string            : owner_account (must be valid username) !THIS IS IGNORED SINCE OWNER CANNOT BE CHANGED!
    ============================================================*/
router.post('/project/update', function (req, res, next) {
  var projectId = req.body.id;
  var title = req.body.title;
  var category = req.body.category;
  var image_url = (req.body.image_url) ? req.body.image_url : '';
  var description = req.body.description;

  var start_date = req.body.start_date;
  var end_date = req.body.end_date;
  var amount_sought = req.body.amount_sought;
  var owner_account = req.body.owner_account.toLowerCase();

  var promise = QUERY_EXECUTER.updateProject(projectId, title, category,
    image_url, description, start_date, end_date, amount_sought);
  promise.then(function() {
    res.redirect('/');  //redirect back to home
  });
});

module.exports = router;
