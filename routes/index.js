var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  return res.render('index', {
    title: "Mybookshelf | “Build the biggest library in the world, sharing your own”"
  });
});

module.exports = router;
