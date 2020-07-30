const express = require('express');
const bookInitiator = require('/Users/PolumboStudio/Documents/GitHub/mockAppWithHorus/bookInitiator.js');
const booksRouter = express.Router();

booksRouter.post('/', bookInitiator.createBook, (req, res) => {
    console.log('create book in Books Router')
    return res.status(200).json(res.locals.book)
})

bookInitiator.get('/', bookInitiator.getBooks, (req, res) => {
    console.log('getting books in Books Router')
    return res.status(200).json(res.locals.books)
})

module.exports = booksRouter;