let Book = require('../models/book');
let moment = require('moment'); 
var getBook = async function(bookId) {
    return await Book.findById({_id: bookId}).lean().exec();
}

var getBooks = async function() {
    return await Book.find({}).lean().exec();
}

var editBook = async function(bookId, book) {
    if(book.startedAt) {
        let date = moment(book.startedAt, "DD/MM/YYYY");
        book.startedAt = date.format();
    }
    if(book.endedAt) {
        let date = moment(book.endedAt, "DD/MM/YYYY");
        book.endedAt = date.format();
    }
    return await Book.findOneAndUpdate({_id: bookId}, book, {new: true}).lean().exec();
}

var deleteBook = async function(bookId) {
    let response = await Book.deleteOne({_id: bookId}).lean().exec();
    return await getBooks();
}

var addBook = async function(bookToBeAdded) {
    try {
        console.log(bookToBeAdded);
        var newBook = new Book(bookToBeAdded);
        if(bookToBeAdded.startedAt) {
            newBook.startedAt = moment(bookToBeAdded.endedAt, "DD/MM/YYYY").format();
        }
        if(bookToBeAdded.endedAt) {
            newBook.endedAt = moment(bookToBeAdded.endedAt, "DD/MM/YYYY").format();
        }
        let bookAdded = await newBook.save();
        return bookAdded.toObject()
      } catch (err) {
        console.log('err' + err);
        return {err}
      }
}

module.exports = {
    getBook, 
    getBooks,
    editBook,
    deleteBook,
    addBook
}