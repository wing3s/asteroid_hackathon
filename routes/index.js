var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Escape from Asteroids' });
});

router.get('/beta', function(req, res) {
    res.render('beta', { title: 'Escape from Asteroids' });
});
module.exports = router;
