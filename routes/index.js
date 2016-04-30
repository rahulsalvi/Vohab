var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Vohab' });
});

router.get('/dashboard', function(req, res, next) {
  res.render('dashboard', { dashboard: 'DASHBOARD CAT' });
});

router.get('/carousel', function(req, res, next) {
  res.render('carousel', { dashboard: 'CAROUSEL' });
});

module.exports = router;
