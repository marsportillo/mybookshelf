var express = require('express');
var router = express.Router();

let Book = require('../models/book');
let BookController = require('../controller/bookController')

/* GET books listing. */
router.get('/', async (req, res, next) => {
    let books = await BookController.getBooks()
    console.log(books)
    try {
        res.render('books', {
            title: "Mybookshelf | Bookshelf",
            books: books
        })
    } catch (err) {
        res.send(err);
    }
});


router.get('/addBook', async function(req, res, next) {
    let book = await BookController.getBooks()
    return res.render('addBook', {
        title: "Mybookshelf | Add new book",
        book
    });
});

/* GET single book by id. */
router.get('/:id', async function(req, res, next) {
    let bookFound = await BookController.getBook(req.params.id)
    console.log(bookFound)
    try {
        res.render('bookDetail', {
            title: "Mybookshelf | Book Detail",
            book: bookFound
        })
    } catch (err) {
        res.send(err);
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
            res.json({
                message: "Book successfully added!", 
                book 
            });
        }
    });
});
/* UPDATE a book. */
router.post("/:id", async (req, res, next) => {
    let bookFound = await BookController.editBook({_id: req.params.id}, req.body);

    console.log(bookFound)
    try {
        res.render('bookDetail', {
            title: "Mybookshelf | Bookshelf",
            book: bookFound
        })
    } catch (err) {
        res.send(err);
    }
});


/* DELETE new book. */
router.delete('/:id', function(req, res, next) {
    Book.deleteOne({_id : req.params.id}, (err, result) => {
        //Delete one non ritorna l'oggetto.
        res.json({ 
            message: "Book successfully deleted!", 
            result 
        });
    });
});

module.exports = router;