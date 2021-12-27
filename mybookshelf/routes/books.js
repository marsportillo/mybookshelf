var express = require('express');
var router = express.Router();

/* GET books listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET single book by id. */
router.get('/:id', function(req, res, next) {
    res.send('respond with a resource');
});
  
/* POST new book. */
router.post('/', function(req, res, next) {
    res.send('Book added');
});

/* PATCH new book. */
router.patch('/', function(req, res, next) {
    res.send('Book edited');
});

/* DELETE new book. */
router.delete('/', function(req, res, next) {
    res.send('Book deleted');
});

module.exports = router;