let Book = require('../models/book');

var getBook = async function(bookId) {
    return await Book.findById({_id: bookId}).lean().exec();
}

var getBooks = async function() {
    return Book.find({}).lean().exec();
}

var editBook = async function(bookId, book) {
    console.log("ID: " + bookId)
    console.log("book" + book)
    return await Book.findOneAndUpdate({_id: bookId}, book, {new: true}).lean().exec();
}

module.exports = {
    getBook, 
    getBooks,
    editBook
}