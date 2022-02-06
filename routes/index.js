var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  return res.render('index', {
    title: "Mybookshelf | “Build the biggest library in the world, sharing your own”"
  });
});

router.post('/login', function(req, res, next) {
  return res.render('home', {
    title: "Mybookshelf | Home"
  });
});

router.get('/home', function(req, res, next) {
  return res.render('home', {
    title: "Mybookshelf | Home"
  });
});

module.exports = router;
