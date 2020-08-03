const bookStub = require("./stubs/booksStub.js");
const bookInitiator = {};

console.log('process.env vars', process.env.function);

bookInitiator.createBook = (req, res, next) => {
  const book = {
    title: req.body.title, 
    author: req.body.author,
    numberOfPages: req.body.numberOfPages,
    publisher: req.body.publisher,
    bookId: req.body.bookId
  }
  const callback = (error, data) => {
    console.log('call to callback')
    console.log('BOOK DATA: ', data)
    res.locals.book = data
    if (error) console.log('sorry, there was an error', error)
    return next()
  }
  bookStub.CreateBook(book, callback)
}

bookInitiator.getBooks = (req, res, next) => {
  const callback = (error, data) => {
    console.log('LIST OF BOOKS FROM GET BOOKS: ', data)
    res.locals.books = data
    if (error) console.log('sorry, there was an error', error)
    return next()
  }
  bookStub.GetBooks({}, callback)
}

bookInitiator.deleteBook = (req, res, next) => {
  console.log('entered deleteBook in bookInitiator')
  console.log('REQ.PARAMS.BOOKID: ', req.params.bookId)
  bookId = {bookId: req.params.bookId}
  const callback = (error, data) => {
    console.log('Data coming back from deleteBook? : ', data)
    if (error) console.log('sorry, there was an error', error)
    console.log('DATA IN BOOK INITAITOR: ',data)
    return next()
  }
  bookStub.DeleteBook(bookId, callback)
}

const callback = (error, data) => {
  console.log('call to callback')
  if (error) console.log('sorry, there was an error', error)
  else console.log('data coming back to bookInitiator: ', data)
}

const getData = (functionName) => {
  if (functionName === 'CreateBook') return book
  else if (functionName === 'GetBooks') return {}
  else if (functionName === 'DeleteBook') return bookId;
  else if(functionName === 'GetBookByID') return bookId;
}

module.exports = bookInitiator;