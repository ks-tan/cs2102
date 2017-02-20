var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('pages/main');
});

router.get('/search', function(req, res) {
  res.render('pages/search');
});

router.get('/addEditProject', function(req, res) {
  res.render('pages/addEditProject');
});

router.get('/viewProject', function(req, res) {
  res.render('pages/viewProject');
});

router.get('/myProjects', function(req, res) {
  res.render('pages/myProjects');
});

module.exports = router;
