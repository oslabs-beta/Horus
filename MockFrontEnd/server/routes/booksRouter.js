const express = require('express');
const bookInitiator = require('/Users/PolumboStudio/Documents/GitHub/mockAppWithHorus/bookInitiator.js');
const booksRouter = express.Router();

booksRouter.post('/', bookInitiator.createBook, (req, res) => {
    console.log('create book in Books Router')
    return res.status(200).json(res.locals.book)
})

booksRouter.get('/', bookInitiator.getBooks, (req, res) => {
    console.log('getting books in Books Router')
    return res.status(200).json(res.locals.books)
})

booksRouter.delete('/:bookId', bookInitiator.deleteBook, (req, res) => {
    console.log('Entered deleteBook in booksRouter');
    return res.status(200);
})

module.exports = booksRouter;