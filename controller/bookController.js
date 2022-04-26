let Book = require('../models/book');

var getBook = async function(bookId) {
    return await Book.findById({_id: bookId}).lean().exec();
}

var getBooks = async function() {
    return await Book.find({}).lean().exec();
}

var editBook = async function(bookId, book) {
    console.log(book);
    return await Book.findOneAndUpdate({_id: bookId}, book, {new: true}).lean().exec();
}

var deleteBook = async function(bookId) {
    let response = await Book.deleteOne({_id: bookId}).lean().exec();
    return await getBooks();
}

var addBook = async function(bookToBeAdded) {
    try {
        var newBook = new Book(bookToBeAdded);
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