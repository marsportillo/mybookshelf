let Book = require('../models/book');

var getBook = async function(bookId) {
    return await Book.findById({_id: bookId}).lean().exec();
}

var getBooks = async function() {
    return Book.find({}).lean().exec();
}

module.exports = {
    getBook, 
    getBooks
}