var express = require('express');
var router = express.Router();

let Book = require('../models/book');
let BookController = require('../controller/bookController')


/* GET books listing. */
router.get('/', async (req, res, next) => {
    try {
        res.send({
            book: await BookController.getBooks()
        })
    } catch (err) {
        next(err);
    }
});

router.get('/addBook', function(req, res, next) {
    return res.render('addBook', {
        title: "Mybookshelf | Add new book"
    });
});


/* GET single book by id. */
router.get('/:id', async function(req, res, next) {
    try {
        console.log(req.params.id)
        res.send({
            book: await BookController.getBook(req.params.id)
        })
    } catch (err) {
        next(err);
    }
});
  
/* POST new book. */
router.post('/', function(req, res, next) {
    //Creates a new book
    console.log(req.body)
    var newBook = new Book(req.body);
    console.log(newBook);
    //Save it into the DB.
    console.log(req.body)
    newBook.save((err,book) => {
        if(err) {
            res.send(err);
        }
        else { //If no errors, send it back to the client
            res.json({book });
        }
    });
});
/* UPDATE a book. */
router.post("/:id", async (req, res, next) => {
    try {
        res.send({
            book: await BookController.editBook(req.params.id, req.body)
        })
    } catch (err) {
        next(err);
    }
});


/* DELETE new book. */
router.delete("/:id", async (req, res, next) => {
    try {
        res.send({
            book: await BookController.deleteBook(req.params.id)
        })
    } catch (err) {
        next(err);
    }
});

module.exports = router;