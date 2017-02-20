var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('pages/main');
});

router.get('/addProject', function(req, res) {
  res.render('pages/addProject');
});

router.get('/viewProject', function(req, res) {
  res.render('pages/viewProject');
});

router.get('/myProjects', function(req, res) {
  res.render('pages/myProjects');
});

module.exports = router;