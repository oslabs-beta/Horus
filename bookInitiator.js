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

//hard coding id# to test out DeleteBook
const bookId = {bookId:100};

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
// function main (functionName) { 
//   bookStub[functionName](getData(functionName), callback);
// }
// main(process.env.function);
module.exports = bookInitiator;