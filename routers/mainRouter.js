const pg = require('pg');
const express = require('express');
const constants = require('../constants');
const queryExecuter = require('../database/queryExecuter/execute.js');
const Rx = require('rx');
const moment = require('moment');
const capitalize = require('capitalize');


const router = express.Router();

var username = '';
var errorMessage = '';


router.get('/', function(req, res) {
  let categoryObs = Rx.Observable.fromPromise(queryExecuter.getCategories());
  let projectsObs = Rx.Observable.fromPromise(queryExecuter.getFeaturedProjects());
  Rx.Observable.zip(categoryObs, projectsObs).subscribe(
    (results) => {
      // this will only be executed once all the queries are done
      let categories = results[0].rows;
      let projects = results[1].rows;
      res.render('pages/main', {
        username: username,
        categories: categories,
        projects: projects,
        error: errorMessage
      });
      errorMessage = '';
    },
    (error) => {
      console.log(error);
    }
  );
});

router.get('/projects', function(req, res) {
  var projects = [];
  console.log(req.query);
  var title = req.query.title?req.query.title:'';
  var categories = req.query.categories?req.query.categories:[];
  if(typeof(categories)=='string') {
    categories = [categories];
  }
  var params = {
    title: title,
    categories: categories
  };
  queryExecuter.getProjects(title, categories).then(results => {
    projects = results.rows;
    res.render('pages/search', {
      username: username,
      params: params,
      projects : projects,
      error: errorMessage
    });
    errorMessage = '';
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
      username: username,
      title: 'Add project',
      categories: results.rows,
      project: {},
      formAction: '/projects',
      formMethod: 'post',
      error: errorMessage
    });
    errorMessage = '';
  });
});

router.get('/projects/:id', function(req, res) {
  var projectId = req.params.id;
  var promiseGetProject = queryExecuter.getProjectById(projectId);
  promiseGetProject.then(results => {
    var result = results.rows[0];
    res.render('pages/viewProject', {
      projectId: projectId,
      username: username,
      title: result.title,
      description: result.description,
      owner_account: result.owner_account,
      category: result.category,
      start_date: result.start_date,
      end_date: result.end_date,
      days_left: result.days_left,
      backers: result.backers,
      amount_sought: result.amount_sought,
      amount_funded: result.amount_funded,
      //TODO: do this in sql query instead?
      is_funded: parseInt(result.amount_sought) < parseInt(result.amount_funded),
      //TODO: do this in sql query instead?
      percent_funded: parseFloat(parseFloat(result.amount_funded) / parseFloat(result.amount_sought) * 100).toFixed(2),
      owner: result.owner,
      owner_country: result.owner_country,
      owner_description: result.owner_description,
      error: errorMessage
    });
    errorMessage = '';
  });
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
      username: username,
      title: 'Add project',
      categories: categories,
      project: project,
      formAction: '/projects/' + id + '/update',
      formMethod: 'post',
      dateFormat: ( date => moment(date).format('YYYY-MM-DD') ),
      error: errorMessage
    });
    errorMessage = '';
  });
});

router.get('/my-projects', function(req, res) {
  res.render('pages/myProjects', {
    username: username,
    error: errorMessage
  });
  errorMessage = '';
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

router.post('/login', function(req, res, next) {
  var promise = queryExecuter.getAccount(req.body.username);
  promise.then(results => {
    if (results.rows.length > 0) {
      username = results.rows[0].username;
    } else {
      errorMessage = 'Your username is not registered.';
    }
    res.redirect(req.get('referer'));
  });
});

router.post('/logout', function(req, res, next) {
  if (username !== "") username = "";
  res.redirect(req.get('referer'));
});

router.post('/pledge', function(req, res, next) {
  var projectId = req.body.projectId;
  var amount = req.body.amount;
  var date = new Date();
  var promise = queryExecuter.addFund(projectId, username, amount, date);
  promise.then(results => {
    res.redirect(req.get('referer'));
  });
});

router.get('/featured', function(req, res, next) {
  var promise = queryExecuter.getFeaturedProjects();
  promise.then(results => {
    //res.redirect(req.get('referer'));
    //Return the array of results here
    error: errorMessage
  });
  errorMessage = '';
});


/* Statistics Module */

router.get('/reports/funds', (req, res) => {
  let summaryObs = Rx.Observable.fromPromise(queryExecuter.getOverallStatsSummary());
  let contentObs = Rx.Observable.fromPromise(queryExecuter.getOverallStatsContent());
  Rx.Observable.zip(summaryObs, contentObs).subscribe(results => {
    let summary = results[0];
    let content = results[1];
    res.render('stats/index.ejs', {
      username: username,
      reportDescription: 'Overall statistics of IndieStarter funding.',
      reportTitle: 'Funds Report',
      summary: summary,
      content: content,
      capitalize: capitalize,
      error: errorMessage
    });
    errorMessage = '';
  });
});

router.get('/reports/projects', (req, res) => {
  let summaryObs = Rx.Observable.fromPromise(queryExecuter.getProjectStatsSummary());
  let contentObs = Rx.Observable.fromPromise(queryExecuter.getProjectStatsContent());
  Rx.Observable.zip(summaryObs, contentObs).subscribe(results => {
    let summary = results[0];
    let content = results[1];
    res.render('stats/index.ejs', {
      username: username,
      reportDescription: 'Status of all projects in IndieStarter.',
      reportTitle: 'Projects Report',
      summary: summary,
      content: content,
      capitalize: capitalize,
      error: errorMessage
    });
    errorMessage = '';
  });
});


module.exports = router;
