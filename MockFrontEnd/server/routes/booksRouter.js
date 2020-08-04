const express = require('express');
const bookInitiator = require('../../../bookInitiator')
const booksRouter = express.Router();

booksRouter.post('/', bookInitiator.createBook, (req, res) => {
    return res.status(200).json(res.locals.book)
})

booksRouter.get('/', bookInitiator.getBooks, (req, res) => {
    return res.status(200).json(res.locals.books)
})

booksRouter.delete('/:bookId', bookInitiator.deleteBook, (req, res) => {
    return res.status(200);
})

module.exports = booksRouter;