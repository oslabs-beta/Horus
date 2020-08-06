const express = require('express');
const booksClient = require('../../../books/booksClient.js');

const booksRouter = express.Router();

booksRouter.post('/', booksClient.createBook, (req, res) => {
    return res.status(200).json(res.locals.book)
});

booksRouter.get('/', booksClient.getBooks, (req, res) => {
    return res.status(200).json(res.locals.books)
});

booksRouter.delete('/:bookId', booksClient.deleteBook, (req, res) => {
    return res.status(200);
});

module.exports = booksRouter;
