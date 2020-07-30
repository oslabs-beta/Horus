const bookStub = require("./stubs/booksStub.js");
const bookInitiator = {};

console.log('process.env vars', process.env.function);

bookInitiator.createBook = (req, res, next) => {
  const book = {
    title: req.body.title, 
    author: req.body.author,
    numberOfPages: req.body.numberOfPages,
    publisher: req.body.publisher,
    id: req.body.id
  }
  const callback = (error, data) => {
    console.log('call to callback')
    if (error) console.log('sorry, there was an error', error)
  
    console.log('logging data.names ', data.names)
    console.log('logging favorite books ', data.names[0].favBook)
  }
  bookStub.CreateBook(book, callback).then(data => {
    console.log(`Creating User ${data} in bookInitiator.`)
    res.locals.book = data;
    return next(err);
  });
}

//hard coding id# to test out DeleteBook
const id = {id:100};

const callback = (error, data) => {
  console.log('call to callback')
  if (error) console.log('sorry, there was an error', error)
  else console.log('data coming back to bookInitiator: ', data)
}

const getData = (functionName) => {
  if (functionName === 'CreateBook') return book
  else if (functionName === 'GetBooks') return {}
  else if (functionName === 'DeleteBook') return id;
  else if(functionName === 'GetBookByID') return id;
}
// function main (functionName) { 
//   bookStub[functionName](getData(functionName), callback);
// }
// main(process.env.function);
module.exports = bookInitiator;