var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('pages/main');
});

router.get('/search', function(req, res) {
  res.render('pages/search');
});

module.exports = router;
