let Book = require('../models/book');

exports.getBook = async function(bookId) {
    coonsole.log("ECCO L'ID: " + bookId)
    let book =  await Book.findById({_id: bookId});
    console.log("The book is here: " + book)
    return book
}

exports.getBooks = async function() {
    let books =  await Book.find({}).exec();
    return books
};