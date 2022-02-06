var express = require('express');
var router = express.Router();

let Book = require('../models/book');


/* GET books listing. */
router.get('/', function(req, res, next) {
    let query = Book.find({});
    query.exec((err, books) => {
        if(err) res.send(err);
        return res.render('books', {
            title: "Mybookshelf | “Build the biggest library in the world, sharing your own”",
            message: "book found",
            books
          });
    });
});


/* GET single book by id. */
router.get('/:id', function(req, res, next) {
    Book.findById({_id: req.params.id}, (err, book) => {
        if(err) res.send(err);
        console.log(book);
        res.json({ 
            message: 'Book found!',
            book 
        });
    });
});
  
/* POST new book. */
router.post('/', function(req, res, next) {
    //Creates a new book
    var newBook = new Book(req.body);
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
router.put("/:id", function(req,res,next) {
    Book.findById({_id: req.params.id}, (err, book) => {
        if(err) res.send(err);
        Object.assign(book, req.body).save((err, book) => {
            if(err) res.send(err);
            res.json({ 
                message: 'Book updated!', 
                book 
            });
        });
    });
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