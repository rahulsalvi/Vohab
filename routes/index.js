var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'vohab.co' });
});

router.get('/dashboard', function(req, res, next) {
  res.render('dashboard', { dashboard: 'DASHBOARD CAT' });
});

module.exports = router;
