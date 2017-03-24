
const pg = require('pg');
const express = require('express');
const constants = require('../constants');
const queryExecuter = require('../database/queryExecuter/execute.js');
const Rx = require('rx');
const moment = require('moment');


const router = express.Router();
const connectionString = constants.DB_CONNECTION;


router.get('/', function(req, res) {
  let categoryObs = Rx.Observable.fromPromise(queryExecuter.getCategories());
  let projectsObs = Rx.Observable.fromPromise(queryExecuter.getProjects());
  Rx.Observable.zip(categoryObs, projectsObs).subscribe(
    (results) => {
      // this will only be executed once all the queries are done
      let categories = results[0].rows;
      let projects = results[1].rows;
      res.render('pages/main', {
        categories: categories,
        projects: projects
      });
    },
    (error) => {
      console.log(error);
    }
  );
});

router.get('/projects', function(req, res) {
  var projects = [];
  console.log(req.query);
  var title = req.query.title || '';
  queryExecuter.getProjects(title).then(results => {
    projects = results.rows;
    res.render('pages/search', {
      params: req.query,
      projects : projects
    });
  });
});

router.get('/categories', function(req, res) {
  var promise = queryExecuter.getCategories();
  promise.then(results => {
    return res.json(results.rows);
  });
})

router.get('/projects/add', function(req, res) {
  queryExecuter.getCategories().then( results => {
    res.render('pages/addEditProject', {
      title: 'Add project',
      categories: results.rows,
      project: {},
      formAction: '/projects',
      formMethod: 'post'
    });
  });
});

router.get('/projects/:id', function(req, res) {
  res.render('pages/viewProject');
});

router.get('/projects/:id/edit', function(req, res) {
  // Pass a context to the templating engine
  // so that it knows to render a pre-populated form
  // instead of a blank one.
  let id = parseInt(req.params['id']);
  let projectObs = Rx.Observable.fromPromise(queryExecuter.getProjectById(id));
  let categoryObs = Rx.Observable.fromPromise(queryExecuter.getCategories());
  Rx.Observable.zip(projectObs, categoryObs).subscribe( results => {
    let projects = results[0];
    let categories = results[1].rows;
    if (projects.rowCount == 0) {
      res.status(404).send('No such project');
      return;
    }
    let project = projects.rows[0];
    console.log(project);
    res.render('pages/addEditProject', {
      title: 'Add project',
      categories: categories,
      project: project,
      formAction: '/projects/' + id + '/update',
      formMethod: 'post',
      dateFormat: ( date => moment(date).format('YYYY-MM-DD') )
    });
  });
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
  var promise = queryExecuter.addAccount(username, fullname, description, age, gender, email, country, role);
  promise.then(function(result) {
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
router.post('/projects', function (req, res, next) {
  console.log(req.body);
  var title = req.body.title;
  var category = req.body.category;
  var image_url = (req.body.image_url) ? req.body.image_url : '';
  var description = req.body.description;
  var start_date = req.body.start_date;
  var end_date = req.body.end_date;
  var amount_sought = req.body.amount_sought;
  var owner_account = req.body.owner_account;
  var promise = queryExecuter.addProject(title, category, image_url, description, start_date, end_date, amount_sought, owner_account);
  promise.then(function(result) {
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
router.post('/projects/:id/update', function (req, res, next) {
  var projectId = parseInt(req.params.id);
  var title = req.body.title;
  var category = req.body.category;
  var image_url = (req.body.image_url) ? req.body.image_url : '';
  var description = req.body.description;

  var start_date = req.body.start_date;
  var end_date = req.body.end_date;
  var amount_sought = req.body.amount_sought;
  var owner_account = req.body.owner_account.toLowerCase();

  var promise = queryExecuter.updateProject(projectId, title, category,
    image_url, description, start_date, end_date, amount_sought);
  promise.then(function() {
    res.redirect('/projects/' + projectId); // to project page
  });
});

module.exports = router;
