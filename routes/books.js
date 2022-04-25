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
    return res.render('addBook', {
        title: "Mybookshelf | Add new book"
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
router.post('/', async function(req, res, next) {
    let bookAdded = await BookController.addBook(req.body);
    console.log("Book added: " +  bookAdded)
    try {
        res.render('bookDetail', {
            title: "Mybookshelf | Bookshelf",
            book: bookAdded,
            message: "Book added!"
        })
    } catch (err) {
        res.send(err);
    }
});

/* UPDATE a book. */
router.post("/:id", async (req, res, next) => {
    let bookFound = await BookController.editBook({_id: req.params.id}, req.body);

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
router.post('/delete/:id',async function(req, res, next) {
    let books = await BookController.deleteBook(req.params.id)
    
    try {
        res.render('books', {
            title: "Mybookshelf | Bookshelf",
            books: books,
            message: "Book deleted successfuly"
        })
    } catch (err) {
        res.send(err);
    }
});

module.exports = router;